# ADR-007: Extension Security

## Status

**Proposed**

## Context

Athia Desktop supports extensions that allow users to customize and extend the desktop environment. Extensions run with access to desktop APIs and must be secured to prevent them from compromising system security or stability.

## Decision

Athia uses a **sandbox-first extension model** with the following characteristics:

1. **Process isolation** — Extensions run in separate, isolated processes.
2. **Capability-based access** — Extensions can only access resources they are explicitly authorized to use.
3. **WebAssembly/WASI** — Extensions are proposed to run as WebAssembly modules with WASI for safe, portable execution.
4. **Explicit capability declaration** — Extensions declare required capabilities in their manifest.
5. **User approval** — Users approve extension capabilities during installation.

## Alternatives Considered

- **Native extensions** — Extensions compiled as native code. Rejected because native code is harder to sandbox securely.
- **JavaScript extensions** — Extensions written in JavaScript. Rejected because JavaScript runtimes are large and complex.
- **No sandboxing** — Extensions run with full desktop access. Rejected because it compromises security.

## Consequences

### Positive

- **Security** — Extensions are sandboxed and cannot compromise the system.
- **Portability** — WebAssembly extensions run on any platform with a WASM runtime.
- **Safety** — WebAssembly provides memory safety by design.

### Negative

- **Performance** — WebAssembly has some overhead compared to native code.
- **API limitations** — Extensions can only use the APIs exposed by the extension host.
- **Implementation effort** — The WebAssembly runtime and extension host must be implemented.

## Open Questions

- What APIs should be exposed to extensions?
- How should extension updates be handled?
