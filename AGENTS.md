# AGENTS.md

## Development OS
- Windows 10/11 is used for development. All tools/commands issued should run on Windows.

## Build & Run Commands
- **Full stack (Run):** `dotnet apphost.cs` from root (uses Aspire orchestration)
- **Frontend only:** `npm run dev` in `frontend/`
- **Backend only (Build):** `dotnet build` from root (uses bobrossify.slnx)
- **Backend only (Run):** `dotnet run` in `webapi/`
- **Type check frontend:** `npm run typecheck` in `frontend/`
- **Build frontend:** `npm run build` in `frontend/`
- **Build backend:** `dotnet build` in `webapi/`

## Code Style - TypeScript/React (frontend/)
- Use `import type { }` for type-only imports; named imports before local imports
- 2-space indent, double quotes, semicolons, trailing commas
- Function components: `export default function Name()`, named exports for `meta`/`loader`
- Strict TypeScript; interfaces in PascalCase; nullable fields use `| null`
- Error handling: use `isRouteErrorResponse()`, show details only in DEV mode

## Code Style - C# (webapi/)
- File-scoped namespaces, 4-space indent, nullable reference types enabled
- PascalCase for public members; `required` modifier for non-nullable properties
- Minimal API pattern with extension methods for endpoint grouping
- Return `Results.Ok()`, `Results.NotFound()`, `Results.Created()` for HTTP responses
- Async/await for all async operations; pattern matching with `is` keyword
