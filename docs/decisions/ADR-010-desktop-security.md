# ADR-010: Desktop Security

## Status

**Proposed**

## Context

The Athia Desktop environment runs with elevated privileges compared to regular applications, as it manages windows, input devices, and display output. The desktop must be secured to prevent malicious applications or extensions from compromising the system.

## Decision

The desktop security model follows these principles:

1. **Process isolation** — Desktop components run as isolated processes with explicit capabilities.
2. **Input mediation** — Input events are mediated by the device service; applications cannot capture input globally without user consent.
3. **Window isolation** — Applications cannot read or inject input into other applications' windows.
4. **Extension sandboxing** — Extensions run in isolated sandboxes with explicit capabilities (see ADR-007).
5. **Capability minimization** — Each desktop component receives only the capabilities it needs.

## Alternatives Considered

- **Single desktop process** — All desktop components in one process. Rejected because a compromise would affect the entire desktop.
- **Application input capture** — Applications can capture global input. Rejected because it compromises security and user control.
- **No extension sandboxing** — Extensions run with full desktop access. Rejected because it compromises security.

## Consequences

### Positive

- **Security** — Desktop components are isolated and cannot compromise each other.
- **User control** — Users control which applications can capture input.
- **Extension safety** — Extensions are sandboxed and cannot compromise the system.

### Negative

- **Complexity** — Security adds complexity to the desktop architecture.
- **Performance** — Input mediation adds overhead.
- **Implementation effort** — Security features require additional development.

## Open Questions

- How should screen sharing and recording be handled securely?
- What capabilities should the window manager have?
