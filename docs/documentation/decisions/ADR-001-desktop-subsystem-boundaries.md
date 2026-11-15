# ADR-001: Desktop Subsystem Boundaries

## Status

**Proposed**

## Context

The Athia desktop environment is a large subsystem with many components: window management, theming, display output, extensions, and user interaction. Without clear boundaries, the desktop subsystem could become tightly coupled with system services and the kernel, reducing modularity and increasing complexity.

## Decision

The desktop subsystem is bounded by the following interfaces:

1. **Graphics Service** — The desktop communicates with the graphics service via IPC for display output and hardware acceleration.
2. **Device Service** — The desktop communicates with the device service via IPC for input events (keyboard, mouse, touch).
3. **Filesystem Service** — The desktop communicates with the filesystem service via IPC for file operations.
4. **Networking Service** — The desktop communicates with the networking service via IPC for network access (optional).

The desktop subsystem does not communicate directly with the kernel. All kernel interactions are mediated through system services.

## Alternatives Considered

- **Direct kernel access** — The desktop could access the kernel directly for graphics and input. This was rejected because it violates the microkernel principle and increases the attack surface.
- **Monolithic desktop** — All desktop components could be in a single process. This was rejected because it reduces modularity and reliability.
- **Shared memory** — The desktop could use shared memory for communication with system services. This was rejected because capability-based IPC provides better security.

## Consequences

### Positive

- **Modularity** — Desktop components can be developed and updated independently.
- **Security** — The desktop runs in user space with explicit capabilities.
- **Reliability** — Desktop failures do not affect the kernel or other system services.

### Negative

- **IPC overhead** — Communication with system services requires message passing.
- **Complexity** — More processes and services to coordinate.

## Open Questions

- How should the desktop handle system service failures?
- What is the appropriate level of desktop component isolation?
