# ADR-003: Display Protocol

## Status

**Proposed**

## Context

Athia needs a display protocol for communication between the compositor and client applications. The protocol must support surface management, buffer sharing, input event delivery, and capability-based security.

## Decision

Athia uses the **Athia Display Protocol (ADP)**, a custom display protocol designed specifically for Athia's architecture. ADP is built on the following principles:

1. **Capability-based** — Clients receive only the capabilities they need.
2. **Simple** — The protocol is minimal and easy to implement.
3. **Efficient** — Buffer sharing minimizes data copying.
4. **Secure** — Client isolation is enforced at the protocol level.

## Alternatives Considered

- **Wayland** — A mature display protocol with broad support. Rejected because Athia is an independent OS and ADP can be tailored to Athia's capability-based security model.
- **X11** — A legacy display protocol. Rejected because it is complex, insecure, and outdated.
- **Mir** — A display protocol designed for Ubuntu. Rejected because it is tied to the Ubuntu ecosystem.

## Consequences

### Positive

- **Tailored design** — ADP is designed specifically for Athia's architecture.
- **Security** — Capability-based security is built into the protocol.
- **Simplicity** — ADP is simpler than Wayland or X11.

### Negative

- **Implementation effort** — ADP must be implemented from scratch.
- **No existing clients** — Applications must be written to use ADP.
- **Learning curve** — Developers must learn a new protocol.

## Open Questions

- Should ADP be compatible with Wayland for easier application porting?
- What buffer sharing mechanism should ADP use (DMA-BUF, custom)?
