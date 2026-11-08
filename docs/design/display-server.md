# Athia Display Server & Compositor

> **Status:** Proposed design — not implemented.

## Overview

The Athia Display Server manages display outputs and provides the foundation for graphical output. It works with the Compositor to combine window surfaces into the final display image. Communication between clients and the display server uses the Athia Display Protocol (ADP).

## Architecture

```
┌─────────────────────────────────────┐
│         Application Clients          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │ App 1   │ │ App 2   │ │ App 3   ││
│  └────┬────┘ └────┬────┘ └────┬────┘│
│       │    ADP    │    ADP    │ ADP │
├───────┼───────────┼───────────┼─────┤
│       ▼           ▼           ▼     │
│  ┌──────────────────────────────┐   │
│  │     Compositor               │   │
│  │  ┌────────┐ ┌─────────────┐ │   │
│  │  │ Blend  │ │ Effects     │ │   │
│  │  │ Windows│ │ (shadows,  │ │   │
│  │  │        │ │  blur)      │ │   │
│  │  └────────┘ └─────────────┘ │   │
│  └──────────────┬───────────────┘   │
│                 ▼                   │
│  ┌──────────────────────────────┐   │
│  │   Display Server             │   │
│  │  ┌────────┐ ┌─────────────┐ │   │
│  │  │ Output │ │ Hotplug     │ │   │
│  │  │ Mgmt   │ │ Handling    │ │   │
│  │  └────────┘ └─────────────┘ │   │
│  └──────────────┬───────────────┘   │
│                 ▼                   │
│  ┌──────────────────────────────┐   │
│  │   Graphics Service           │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

## Athia Display Protocol (ADP)

### Overview

ADP is the display protocol used by Athia for communication between the compositor and clients. It is designed to be simple, efficient, and secure.

### Protocol Features

- **Surface management** — Creating, updating, and destroying rendering surfaces
- **Buffer sharing** — Efficient buffer sharing between clients and the compositor
- **Event handling** — Delivering input events to the appropriate surfaces
- **Capability-based** — Clients receive only the capabilities they need

### Surface Lifecycle

1. **Create** — Client creates a surface with the compositor
2. **Attach** — Client attaches a buffer to the surface
3. **Commit** — Client commits the buffer for display
4. **Update** — Client updates the buffer with new content
5. **Destroy** — Client destroys the surface when done

### Buffer Sharing

ADP supports efficient buffer sharing:

- **DMA-BUF** — Shared buffer objects for zero-copy transfers
- **Capability-based access** — Buffers are accessed through capabilities
- **Format negotiation** — Clients and compositor negotiate buffer formats

## Compositor

### Overview

The compositor combines window surfaces into the final display output. It handles blending, effects, and animations.

### Compositing Pipeline

1. **Surface collection** — Collect all visible surfaces
2. **Sorting** — Sort surfaces by z-order
3. **Blending** — Blend surfaces with transparency
4. **Effects** — Apply shadows, blur, and other effects
5. **Animation** — Apply animation transforms
6. **Output** — Send the final frame to the display

### Effects

- **Shadows** — Drop shadows under windows
- **Blur** — Background blur for translucent surfaces
- **Transparency** — Alpha blending for transparent windows
- **Animations** — Smooth window animations and transitions

### Hardware Acceleration

The compositor supports hardware-accelerated compositing:

- **GPU rendering** — Compositing performed on the GPU
- **Vulkan/Metal** — Graphics API for GPU rendering
- **Fallback** — Software compositing when GPU is unavailable

## Display Server

### Output Management

The display server manages display outputs:

- **Multiple displays** — Support for multiple connected displays
- **Resolution** — Configurable resolution per display
- **Refresh rate** — Configurable refresh rate per display
- **Orientation** — Configurable display orientation

### Hotplug Handling

The display server handles display connection and disconnection:

- **Detection** — Detect when displays are connected or disconnected
- **Configuration** — Automatically configure new displays
- **Notification** — Notify the desktop environment of display changes

### Mode Setting

The display server configures display modes:

- **Resolution** — Set the display resolution
- **Refresh rate** — Set the display refresh rate
- **Scaling** — Set display scaling for HiDPI displays

## Security

- **Client isolation** — Clients cannot access other clients' surfaces
- **Capability-based** — Clients receive only the capabilities they need
- **Buffer isolation** — Clients cannot access other clients' buffers

## Related Documentation

- **[graphics.md](../architecture/graphics.md)** — Graphics architecture
- **[display-protocol ADR](../decisions/ADR-003-display-protocol.md)** — Display protocol decision
