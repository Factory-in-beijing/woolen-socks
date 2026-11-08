import { describe, expect, it } from "vitest";
import { findBreakingChanges, type OpenApiDoc } from "./additive.ts";

const base = (): OpenApiDoc => ({
  paths: {
    "/v1/items": {
      get: {
        parameters: [{ name: "limit", in: "query", required: false }],
        responses: { "200": { description: "ok" }, default: { description: "err" } },
      },
      post: {
        parameters: [{ $ref: "#/components/parameters/IdempotencyKey" }],
        responses: { "201": { description: "created" } },
      },
    },
  },
  components: {
    parameters: { IdempotencyKey: { name: "Idempotency-Key", in: "header", required: true } },
    schemas: {
      Item: {
        type: "object",
        required: ["id"],
        properties: { id: { type: "string" }, kind: { type: "string", enum: ["a", "b"] } },
      },
    },
  },
});

const clone = (d: OpenApiDoc): OpenApiDoc => structuredClone(d);

// Checked accessors keep the tests free of non-null assertions.
function must<T>(value: T | undefined, what: string): T {
  if (value === undefined) throw new Error(`fixture is missing ${what}`);
  return value;
}
const getOp = (d: OpenApiDoc) => must(d.paths["/v1/items"]?.["get"], "GET /v1/items");
const item = (d: OpenApiDoc) => must(d.components?.schemas?.["Item"], "schema Item");
const itemProps = (d: OpenApiDoc) => must(item(d).properties, "Item.properties");

describe("additive-only API changes (principle 1)", () => {
  it("accepts identical documents and pure additions", () => {
    const next = clone(base());
    next.paths["/v1/other"] = { get: { responses: { "200": { description: "ok" } } } };
    must(getOp(next).responses, "responses")["404"] = { description: "nf" };
    itemProps(next)["extra"] = { type: "string" };
    must(itemProps(next)["kind"]?.enum, "kind.enum").push("c");
    must(getOp(next).parameters, "parameters").push({ name: "q", in: "query", required: false });
    expect(findBreakingChanges(base(), next)).toEqual([]);
  });

  it("rejects removed paths and operations", () => {
    const noPost = clone(base());
    delete must(noPost.paths["/v1/items"], "path")["post"];
    expect(findBreakingChanges(base(), noPost)).toContain("removed operation POST /v1/items");
    const noPath = clone(base());
    delete noPath.paths["/v1/items"];
    expect(findBreakingChanges(base(), noPath).join()).toContain("removed path /v1/items");
  });

  it("rejects removed responses and removed or newly required parameters", () => {
    const a = clone(base());
    delete must(getOp(a).responses, "responses")["200"];
    expect(findBreakingChanges(base(), a)).toContain("removed response 200 of GET /v1/items");
    const b = clone(base());
    getOp(b).parameters = [];
    expect(findBreakingChanges(base(), b)).toContain(
      "removed parameter query:limit of GET /v1/items",
    );
    const c = clone(base());
    must(getOp(c).parameters, "parameters").push({ name: "tenant", in: "query", required: true });
    expect(findBreakingChanges(base(), c)).toContain(
      "new required parameter query:tenant on GET /v1/items",
    );
  });

  it("rejects removed properties, changed types, removed enum values and new required properties", () => {
    const a = clone(base());
    delete itemProps(a)["kind"];
    expect(findBreakingChanges(base(), a)).toContain("removed property Item.kind");
    const b = clone(base());
    itemProps(b)["id"] = { type: "integer" };
    expect(findBreakingChanges(base(), b)).toContain("changed type of Item.id: string → integer");
    const c = clone(base());
    must(itemProps(c)["kind"], "kind").enum = ["a"];
    expect(findBreakingChanges(base(), c)).toContain("removed enum value Item.kind: b");
    const d = clone(base());
    must(item(d).required, "required").push("kind");
    expect(findBreakingChanges(base(), d)).toContain("new required property Item.kind");
    const e = clone(base());
    delete must(e.components?.schemas, "schemas")["Item"];
    expect(findBreakingChanges(base(), e)).toContain("removed schema Item");
  });
});
