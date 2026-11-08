/**
 * Architecture gate (CI "architecture"). Encodes principles 3, 4, 15, 18, 19 as import rules.
 * apps/api/src/modules/<m>/{http,application,domain,infrastructure}, definition.ts, index.ts
 */
const MODULE = "^apps/api/src/modules/([^/]+)/";

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "Cycles make modules impossible to reason about (principle 18).",
      from: {},
      to: { circular: true },
    },
    {
      name: "module-public-interface-only",
      severity: "error",
      comment: "A module may import another module only through its index.ts (principle 3).",
      from: { path: MODULE },
      to: {
        path: MODULE,
        pathNot: [`${MODULE.replace("([^/]+)", "$1")}`, "^apps/api/src/modules/[^/]+/index\\.ts$"],
      },
    },
    {
      name: "domain-is-pure",
      severity: "error",
      comment:
        "domain = clean TypeScript: no SDKs, no frameworks, no outer layers (principles 3, 18, 20).",
      from: { path: `${MODULE}domain/` },
      to: {
        path: [
          `${MODULE}(application|infrastructure|http)/`,
          "^apps/api/src/shared/infrastructure/",
        ],
      },
    },
    {
      name: "domain-no-npm-sdk",
      severity: "error",
      comment:
        "No third-party runtime package inside domain, except zod at boundaries is NOT allowed here either.",
      from: { path: `${MODULE}domain/` },
      to: { dependencyTypes: ["npm", "npm-dev", "npm-peer", "npm-optional"] },
    },
    {
      name: "application-not-to-outer",
      severity: "error",
      comment:
        "Use cases depend on domain and ports, never on http or infrastructure (domain ← application ← infrastructure).",
      from: { path: `${MODULE}application/` },
      to: { path: `${MODULE}(infrastructure|http)/` },
    },
    {
      name: "infrastructure-not-to-http",
      severity: "error",
      from: { path: `${MODULE}infrastructure/` },
      to: { path: `${MODULE}http/` },
    },
    {
      name: "firestore-only-in-infrastructure",
      severity: "error",
      comment:
        "Firestore is reached only from infrastructure repositories via the Admin SDK (principle 4).",
      from: { path: "^apps/api/src", pathNot: ["/infrastructure/", "\\.test\\.ts$"] },
      to: { path: "node_modules/(firebase-admin|@google-cloud/firestore)" },
    },
    {
      name: "clients-never-import-backend-sdk",
      severity: "error",
      comment:
        "Web/packages must not bundle server SDKs or secrets handling (principles 2, 4, 15).",
      from: { path: "^(apps/web|packages)/" },
      to: { path: "node_modules/(firebase-admin|@google-cloud)" },
    },
    {
      name: "clients-do-not-import-api",
      severity: "error",
      comment: "Clients depend on the generated contract, not on backend code (principle 1).",
      from: { path: "^(apps/web|packages)/" },
      to: { path: "^apps/api/" },
    },
    {
      name: "packages-do-not-import-apps",
      severity: "error",
      from: { path: "^packages/" },
      to: { path: "^apps/" },
    },
    {
      name: "web-features-not-import-app-routes",
      severity: "error",
      comment: "app/ only wires; features/<name> is reusable on mobile (FE base).",
      from: { path: "^apps/web/features/" },
      to: { path: "^apps/web/app/" },
    },
  ],
  options: {
    tsConfig: { fileName: "tsconfig.base.json" },
    doNotFollow: { path: "node_modules" },
    exclude: { path: ["\\.next/", "dist/", "generated/"] },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
      mainFields: ["module", "main", "types"],
    },
  },
};
