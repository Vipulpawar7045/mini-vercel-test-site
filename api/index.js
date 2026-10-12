// Mini-Vercel serverless function fixture.
//
// This is the smallest thing that proves the Phase 6 pipeline end-to-end on real AWS:
// the deployer detects the `api/` directory, zips it, creates a Lambda named
// `mv-<projectId>` (or `mv-<projectId>-<branchSlug>` for previews), wires a public
// Function URL, and returns that URL on the deployment record.
//
// Handler is `index.handler` (matches LAMBDA_HANDLER / application.yml). No dependencies,
// so the deployer's `npm install --omit=dev` step is skipped (no package.json present) and
// the first real-AWS run has zero moving parts.
exports.handler = async (event) => {
  const method = event?.requestContext?.http?.method ?? "GET";
  const path = event?.rawPath ?? "/";

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      message: "Hello from Mini-Vercel on AWS Lambda 🚀",
      method,
      path,
      // Which branch/env deployed this — set as a Lambda env var later if you want.
      env: process.env.MV_ENV ?? "production",
    }),
  };
};
