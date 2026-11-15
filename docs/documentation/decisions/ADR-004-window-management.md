# ADR-004: Window Management

## Status

**Proposed**

## Context

Athia needs a window manager that handles window placement, stacking, focus, and decorations. Users have different preferences for window management: some prefer automatic tiling, others prefer manual floating, and some want a combination.

## Decision

Athia uses a **modular window manager** that supports multiple window management styles:

1. **Tiling** — Automatic window arrangement
2. **Floating** — Traditional manual window placement
3. **Hybrid** — Combination of tiling and floating

The window manager is a separate component from the display server and compositor. It communicates with the compositor via IPC to request window layout changes.

## Alternatives Considered

- **Single-mode window manager** — Only tiling or only floating. Rejected because users have different preferences.
- **Compositor-integrated window management** — Window management built into the compositor. Rejected because it reduces modularity.
- **Multiple window managers** — Users choose one window manager at install time. Rejected because users should be able to switch modes dynamically.

## Consequences

### Positive

- **Flexibility** — Users can choose their preferred window management style.
- **Modularity** — Window management is separate from compositing.
- **Dynamic switching** — Users can switch modes without restarting.

### Negative

- **Complexity** — Supporting multiple modes increases implementation complexity.
- **Consistency** — Different modes may have different keyboard shortcuts and behaviors.

## Open Questions

- What is the default window management mode?
- How should application-specific window rules be handled?
