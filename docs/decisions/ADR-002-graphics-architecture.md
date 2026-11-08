# ADR-002: Graphics Architecture

## Status

**Proposed**

## Context

Athia needs a graphics subsystem that provides display output, compositing, and hardware acceleration. The graphics architecture must support the desktop environment while maintaining security and modularity.

## Decision

The graphics subsystem is organized into three layers:

1. **Graphics Service** — A user-space system service that manages GPU access and framebuffer output.
2. **Display Server** — Manages display outputs and communicates with clients via the Athia Display Protocol (ADP).
3. **Compositor** — Combines window surfaces into the final display output.

All graphics components run in user space. The kernel does not contain graphics code.

## Alternatives Considered

- **Kernel-mode graphics** — Graphics drivers in kernel space. Rejected because it increases the kernel attack surface.
- **Direct GPU access** — Applications access the GPU directly. Rejected because it compromises security and isolation.
- **Existing protocol (Wayland)** — Using Wayland as the display protocol. Rejected because Athia is an independent OS and should have its own protocol tailored to its architecture.

## Consequences

### Positive

- **Security** — Graphics runs in user space with capability-based access.
- **Modularity** — Graphics components can be updated independently.
- **Independence** — Athia does not depend on external graphics protocols.

### Negative

- **Implementation effort** — ADP must be implemented from scratch.
- **Ecosystem** — No existing client libraries for ADP.

## Open Questions

- What graphics API should be used for hardware acceleration (Vulkan, Metal, custom)?
- How should multi-GPU configurations be handled?
