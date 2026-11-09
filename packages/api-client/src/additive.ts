/**
 * Detects non-additive OpenAPI changes (principle 1: "API changes only by addition"; Ops rule 1: OpenAPI diff gate).
 * Deliberately conservative and small: it covers paths, operations, responses, parameters and schema shape.
 * New enum values are allowed because clients must treat unknown enum values safely (FE base: definition-dependent).
 */
type Param = { name?: string; in?: string; required?: boolean; $ref?: string };
type Schema = {
  type?: string;
  enum?: unknown[];
  required?: string[];
  properties?: Record<string, Schema>;
  $ref?: string;
};
type Operation = { parameters?: Param[]; responses?: Record<string, unknown> };

export interface OpenApiDoc {
  paths: Record<string, Record<string, Operation>>;
  components?: { parameters?: Record<string, Param>; schemas?: Record<string, Schema> };
}

const METHODS = ["get", "put", "post", "delete", "patch", "options", "head"] as const;

function resolveParam(doc: OpenApiDoc, p: Param): Param {
  if (!p.$ref) return p;
  const name = p.$ref.split("/").pop() ?? "";
  return doc.components?.parameters?.[name] ?? p;
}

const paramKey = (p: Param): string => `${p.in ?? "?"}:${p.name ?? "?"}`;

function paramMap(doc: OpenApiDoc, op: Operation): Map<string, Param> {
  return new Map(
    (op.parameters ?? []).map((raw) => resolveParam(doc, raw)).map((p) => [paramKey(p), p]),
  );
}

export function findBreakingChanges(before: OpenApiDoc, after: OpenApiDoc): string[] {
  const problems: string[] = [];

  for (const [path, oldItem] of Object.entries(before.paths ?? {})) {
    const newItem = after.paths?.[path];
    if (!newItem) {
      problems.push(`removed path ${path}`);
      continue;
    }
    for (const method of METHODS) {
      const oldOp = oldItem[method];
      if (!oldOp) continue;
      const label = `${method.toUpperCase()} ${path}`;
      const newOp = newItem[method];
      if (!newOp) {
        problems.push(`removed operation ${label}`);
        continue;
      }
      for (const code of Object.keys(oldOp.responses ?? {})) {
        if (!(code in (newOp.responses ?? {})))
          problems.push(`removed response ${code} of ${label}`);
      }
      const oldParams = paramMap(before, oldOp);
      const newParams = paramMap(after, newOp);
      for (const key of oldParams.keys()) {
        if (!newParams.has(key)) problems.push(`removed parameter ${key} of ${label}`);
      }
      for (const [key, p] of newParams) {
        if (p.required && !oldParams.get(key)?.required)
          problems.push(`new required parameter ${key} on ${label}`);
      }
    }
  }

  const oldSchemas = before.components?.schemas ?? {};
  const newSchemas = after.components?.schemas ?? {};
  for (const [name, oldSchema] of Object.entries(oldSchemas)) {
    const newSchema = newSchemas[name];
    if (!newSchema) {
      problems.push(`removed schema ${name}`);
      continue;
    }
    compareSchema(name, oldSchema, newSchema, problems);
  }
  return problems;
}

function compareSchema(where: string, a: Schema, b: Schema, problems: string[]): void {
  if (a.type !== undefined && b.type !== a.type) {
    problems.push(`changed type of ${where}: ${a.type} → ${String(b.type)}`);
    return;
  }
  for (const value of a.enum ?? []) {
    if (!(b.enum ?? []).includes(value))
      problems.push(`removed enum value ${where}: ${String(value)}`);
  }
  const oldRequired = new Set(a.required ?? []);
  for (const prop of b.required ?? []) {
    if (!oldRequired.has(prop)) problems.push(`new required property ${where}.${prop}`);
  }
  for (const [prop, oldProp] of Object.entries(a.properties ?? {})) {
    const newProp = b.properties?.[prop];
    if (!newProp) {
      problems.push(`removed property ${where}.${prop}`);
      continue;
    }
    compareSchema(`${where}.${prop}`, oldProp, newProp, problems);
  }
}
