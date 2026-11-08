# ADR-005: Appearance Engine

## Status

**Proposed**

## Context

Athia Desktop needs a theming and customization system that allows users to change the visual appearance of the desktop environment. The system must support multiple themes, design tokens, and user customization while maintaining consistency across all desktop components.

## Decision

Athia uses an **Appearance Engine** that manages theming through:

1. **Design tokens** — Shared design variables for colors, spacing, typography, and effects.
2. **Declarative themes** — Theme configuration via declarative, versioned files.
3. **Four official theme families** — Midnight, Daylight, Monochrome, and Aurora.
4. **User customization** — Users can customize themes without creating full themes.

All desktop components reference design tokens, not hardcoded values. This allows themes to change appearance without modifying component code.

## Alternatives Considered

- **CSS-based theming** — Using CSS for theming. Rejected because Athia Desktop is not web-based and CSS adds unnecessary complexity.
- **Hardcoded themes** — Each theme is hardcoded into components. Rejected because it makes customization difficult.
- **External theme format (GTK)** — Using GTK's theme format. Rejected because Athia is independent and should have its own theme system.

## Consequences

### Positive

- **Consistency** — Design tokens ensure consistent styling across components.
- **Customization** — Users can easily customize the appearance.
- **Extensibility** — New themes can be added without modifying components.

### Negative

- **Implementation effort** — The Appearance Engine must be implemented from scratch.
- **Token management** — Design tokens must be carefully managed to avoid conflicts.

## Open Questions

- What format should theme configuration files use (TOML, JSON, YAML)?
- How should theme previews be generated?
