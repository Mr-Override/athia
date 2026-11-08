# Athia Window Manager

> **Status:** Proposed design — not implemented.

## Overview

The Athia Window Manager is a modular component of the desktop environment that handles window placement, stacking, focus management, and decorations. It supports multiple window management styles: tiling, floating, and hybrid.

## Architecture

```
┌─────────────────────────────────────┐
│         Window Manager               │
│  ┌─────────────────────────────────┐│
│  │       Layout Engine             ││
│  │  ┌────────┐ ┌────────┐ ┌──────┐││
│  │  │ Tiling │ │Floating│ │Hybrid│││
│  │  └────────┘ └────────┘ └──────┘││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │       Focus Manager             ││
│  │  ┌────────┐ ┌────────────────┐ ││
│  │  │ Click  │ │ Keyboard       │ ││
│  │  │ Focus  │ │ Navigation     │ ││
│  │  └────────┘ └────────────────┘ ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │       Decoration Renderer       ││
│  │  ┌────────┐ ┌────────┐ ┌──────┐││
│  │  │ Title  │ │Buttons │ │Hints │││
│  │  └────────┘ └────────┘ └──────┘││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Layout Modes

### Tiling Mode

In tiling mode, windows are automatically arranged to fill the available screen space:

- **Master-stack layout** — A master area on one side, stack area on the other
- **Binary tree layout** — Windows are split recursively
- **Monocle layout** — One window at a time fills the screen
- **Automatic resizing** — Windows resize when new windows are opened or closed

### Floating Mode

In floating mode, windows are placed and sized manually:

- **Manual placement** — Users drag windows to position them
- **Manual resizing** — Users drag window edges to resize
- **Snap to edges** — Windows snap to screen edges for easy arrangement
- **No automatic arrangement** — Windows do not move automatically

### Hybrid Mode

Hybrid mode combines tiling and floating:

- **Tiled by default** — New windows are tiled automatically
- **Floating override** — Specific windows can be set to float
- **Temporary floating** — Windows can be temporarily floated and returned to tiling
- **Application-specific rules** — Different applications can have different default behaviors

## Focus Management

### Focus Policies

- **Click to focus** — Click a window to give it focus
- **Focus follows mouse** — Window under the mouse receives focus
- **Manual focus** — Focus is changed only by keyboard shortcuts

### Focus Tracking

- **Active window** — The window that receives input
- **Focus history** — Recent focus order for cycling
- **Focus stealing prevention** — Applications cannot steal focus without user action

### Keyboard Navigation

- **Alt+Tab** — Cycle between windows
- **Alt+`** — Cycle within the same application
- **Super+Arrow** — Move focus between tiled windows
- **Super+Number** — Switch to workspace by number

## Window Decorations

### Decoration Components

- **Title bar** — Displays window title and application icon
- **Buttons** — Minimize, maximize, and close buttons
- **Window hints** — Visual indicators for window state (fullscreen, maximized, etc.)

### Decoration Styling

Decorations are styled by the Appearance Engine:

- **Theme-aware** — Decorations follow the current theme
- **Design tokens** — Decoration colors and sizes use design tokens
- **Customizable** — Users can customize decoration appearance

## Window Operations

### Basic Operations

- **Move** — Drag window title bar to move
- **Resize** — Drag window edges or corners to resize
- **Minimize** — Hide window from view
- **Maximize** — Expand window to fill screen
- **Fullscreen** — Expand window to fill screen without decorations
- **Close** — Close the window

### Keyboard Shortcuts

- **Super+Drag** — Move window
- **Super+Shift+Drag** — Resize window
- **Super+Up** — Maximize window
- **Super+Down** — Restore window
- **Super+Q** — Close window
- **Super+Space** — Toggle fullscreen

## Workspaces

### Workspace Management

- **Multiple workspaces** — Users can create multiple virtual workspaces
- **Workspace switching** — Switch between workspaces via keyboard or panel
- **Workspace indicators** — Visual indicators for active workspace
- **Application assignment** — Applications can be assigned to specific workspaces

## Related Documentation

- **[window-manager ADR](../decisions/ADR-004-window-management.md)** — Window management decision
- **[desktop-design.md](desktop-design.md)** — Desktop design document
