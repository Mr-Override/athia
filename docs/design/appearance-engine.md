# Athia Appearance Engine

> **Status:** Proposed design — not implemented.

## Overview

The Appearance Engine is the theming and customization system for Athia Desktop. It manages visual appearance through design tokens, themes, and declarative configuration. The engine ensures consistent visual styling across all desktop components while providing extensive customization options.

## Architecture

```
┌─────────────────────────────────────┐
│         Theme Configuration          │
│  ┌──────────┐ ┌──────────────────┐  │
│  │ Official │ │ User-Created     │  │
│  │ Themes   │ │ Themes           │  │
│  └──────────┘ └──────────────────┘  │
├─────────────────────────────────────┤
│         Appearance Engine            │
│  ┌──────────┐ ┌────────┐ ┌────────┐│
│  │ Design   │ │Theme   │ │Animation││
│  │ Tokens   │ │Resolver│ │ Config ││
│  └──────────┘ └────────┘ └────────┘│
├─────────────────────────────────────┤
│         Desktop Components           │
│  ┌──────────┐ ┌────────┐ ┌────────┐│
│  │  Panel   │ │Windows │ │ Dialogs││
│  └──────────┘ └────────┘ └────────┘│
└─────────────────────────────────────┘
```

## Design Tokens

Design tokens are the foundation of the Appearance Engine. They are shared design variables that define the visual language of the desktop.

### Token Categories

- **Colors** — Background, surface, accent, text, and semantic colors
- **Spacing** — Consistent spacing values (4px, 8px, 12px, 16px, 24px, 32px, etc.)
- **Typography** — Font families, sizes, weights, and line heights
- **Effects** — Shadows, blur, and transparency values
- **Radius** — Border radius values for rounded corners
- **Duration** — Animation timing values

### Token Structure

Tokens are organized in a hierarchical structure:

```
athia/
  colors/
    background/
      primary
      secondary
      surface
    accent/
      primary
      secondary
    text/
      primary
      secondary
      disabled
  spacing/
    xs
    sm
    md
    lg
    xl
  typography/
    font-family
    font-size/
      caption
      body
      heading
    font-weight/
      regular
      medium
      bold
  effects/
    shadow/
      sm
      md
      lg
    blur/
      sm
      md
```

### Token Usage

Components reference tokens by name, not by value. This allows themes to change values without modifying component code.

## Theme System

### Theme Structure

Themes are declarative configuration files that override design token values:

```
theme/
  name
  version
  author
  tokens/
    colors/
      background/
        primary: "#1a1a2e"
        secondary: "#16213e"
      accent/
        primary: "#4a90d9"
    typography/
      font-family: "Inter"
  preview.png
```

### Theme Format

Themes use a declarative, versioned format:

- **Name** — Unique theme identifier
- **Version** — Theme version for compatibility
- **Author** — Theme author attribution
- **Tokens** — Token overrides
- **Preview** — Optional preview image

### Official Theme Families

Athia ships with four official theme families:

#### Midnight

A dark theme with deep navy and charcoal backgrounds, blue accents, and subtle glass effects. The default theme.

- **Background** — Dark navy (#0d1117)
- **Surface** — Charcoal (#161b22)
- **Accent** — Blue (#58a6ff)
- **Text** — Light gray (#c9d1d9)

#### Daylight

A light theme with clean white backgrounds, blue accents, and soft shadows.

- **Background** — White (#ffffff)
- **Surface** — Light gray (#f6f8fa)
- **Accent** — Blue (#0969da)
- **Text** — Dark gray (#24292f)

#### Monochrome

A high-contrast monochrome theme with black and white colors and minimal effects.

- **Background** — Black (#000000)
- **Surface** — Dark gray (#1a1a1a)
- **Accent** — White (#ffffff)
- **Text** — White (#ffffff)

#### Aurora

A vibrant theme with gradient backgrounds, colorful accents, and dynamic effects.

- **Background** — Gradient (purple to blue)
- **Surface** — Semi-transparent dark
- **Accent** — Gradient (pink to orange)
- **Text** — White (#ffffff)

### Theme Resolution

The Appearance Engine resolves themes by:

1. Loading the base token set
2. Applying theme overrides
3. Merging with user customizations
4. Distributing resolved tokens to components

## Customization

### User Customizations

Users can customize themes without creating full themes:

- **Accent color** — Change the accent color independently
- **Font** — Change the font family
- **Font size** — Adjust font scaling
- **Animation speed** — Adjust animation duration
- **Effects** — Enable/disable shadows, blur, and transparency

### Custom Themes

Users can create custom themes by:

1. Copying an existing theme as a starting point
2. Modifying token values
3. Installing the theme via the Appearance Engine

## Animation System

### Animation Configuration

Animations are configured through design tokens:

- **Duration** — Base animation duration
- **Easing** — Animation easing curves
- **Enabled** — Global animation enable/disable

### Animation Types

- **Enter/exit** — Window open/close animations
- **Transition** — State change animations
- **Hover** — Interactive hover animations
- **Scroll** — Scroll-based animations

### Reduced Motion

The Appearance Engine respects prefers-reduced-motion:

- **Disabled animations** — Animations are disabled when reduced motion is preferred
- **Instant transitions** — State changes occur instantly
- **Configuration** — Users can manually enable reduced motion

## Related Documentation

- **[desktop-design.md](desktop-design.md)** — Desktop design document
- **[appearance-engine ADR](../decisions/ADR-005-appearance-engine.md)** — Appearance Engine decision
