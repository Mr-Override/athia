# ADR-008: Application SDK

## Status

**Proposed**

## Context

Athia needs a Software Development Kit (SDK) that allows developers to build applications for the Athia operating system. The SDK must provide APIs for UI, networking, storage, and system integration.

## Decision

Athia provides an **Athia SDK** with the following characteristics:

1. **Rust-first** — The SDK is written in Rust and provides idiomatic Rust APIs.
2. **UI toolkit** — A UI toolkit for building graphical applications.
3. **System APIs** — APIs for networking, storage, and system integration.
4. **Sandbox-aware** — Applications are built with sandbox capabilities in mind.
5. **Documentation** — Comprehensive documentation and examples.

The SDK is organized as a set of Rust crates that applications depend on.

## Alternatives Considered

- **GTK** — Using GTK as the UI toolkit. Rejected because Athia is independent and should have its own UI toolkit.
- **Qt** — Using Qt as the UI toolkit. Rejected because Qt is C++-first and adds complexity.
- **Web technologies** — Using HTML/CSS/JavaScript for UI. Rejected because it adds a browser dependency and reduces performance.

## Consequences

### Positive

- **Rust idioms** — The SDK provides idiomatic Rust APIs.
- **Independence** — Athia does not depend on external UI toolkits.
- **Safety** — Rust provides memory safety for application development.

### Negative

- **Implementation effort** — The SDK and UI toolkit must be implemented from scratch.
- **Learning curve** — Developers must learn a new SDK.
- **Ecosystem** — No existing libraries or widgets.

## Open Questions

- What rendering backend should the UI toolkit use (direct ADP, Vulkan, software)?
- Should the SDK support languages other than Rust?
