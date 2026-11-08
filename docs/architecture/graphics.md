# Athia Graphics Architecture

> **Status:** Proposed design — not implemented.

## Overview

The graphics subsystem in Athia provides display output, compositing, and hardware acceleration. It is designed to be modular, performant, and secure, with a clear separation between the display server, compositor, and application rendering.

## Architecture

```
┌─────────────────────────────────────────┐
│         Application Windows              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ App 1   │ │ App 2   │ │ App 3   │  │
│  └────┬────┘ └────┬────┘ └────┬────┘  │
├───────┼───────────┼───────────┼────────┤
│       │   ADP     │   ADP     │   ADP  │
│       ▼           ▼           ▼        │
│  ┌──────────────────────────────┐      │
│  │     Compositor               │      │
│  │  ┌────────┐ ┌─────────────┐ │      │
│  │  │ Blend  │ │ Effects     │ │      │
│  │  │ Windows│ │ (shadows,  │ │      │
│  │  │        │ │  blur)      │ │      │
│  │  └────────┘ └─────────────┘ │      │
│  └──────────────┬───────────────┘      │
│                 ▼                      │
│  ┌──────────────────────────────┐      │
│  │   Display Server             │      │
│  │  ┌────────┐ ┌─────────────┐ │      │
│  │  │ Output │ │ Hotplug     │ │      │
│  │  │ Mgmt   │ │ Handling    │ │      │
│  │  └────────┘ └─────────────┘ │      │
│  └──────────────┬───────────────┘      │
│                 ▼                      │
│  ┌──────────────────────────────┐      │
│  │   Graphics Service           │      │
│  │  ┌────────┐ ┌─────────────┐ │      │
│  │  │ GPU    │ │ Framebuffer │ │      │
│  │  │ Access │ │             │ │      │
│  │  └────────┘ └─────────────┘ │      │
│  └──────────────────────────────┘      │
└─────────────────────────────────────────┘
```

## Components

### Graphics Service

The graphics service is a user-space system service that manages GPU access and framebuffer output. It provides:

- **GPU access** — Capability-based access to GPU resources
- **Framebuffer management** — Direct framebuffer output for basic display
- **Hardware acceleration** — GPU-accelerated rendering where available
- **Driver management** — Loading and managing graphics drivers

### Display Server

The display server manages display outputs and communicates with clients via the Athia Display Protocol (ADP):

- **Output management** — Managing multiple displays and resolutions
- **Hotplug handling** — Detecting and responding to display connection/disconnection
- **Mode setting** — Configuring display modes (resolution, refresh rate)
- **ADP implementation** — Providing the ADP interface for clients

### Athia Display Protocol (ADP)

ADP is the display protocol used by Athia for communication between the compositor and clients:

- **Surface management** — Creating, updating, and destroying rendering surfaces
- **Event handling** — Delivering input events to the appropriate surfaces
- **Buffer sharing** — Efficient buffer sharing between clients and the compositor
- **Capability-based** — Clients receive only the capabilities they need

### Compositor

The compositor combines window surfaces into the final display output:

- **Window blending** — Compositing multiple window surfaces with transparency
- **Effects** — Shadows, blur, and other visual effects
- **Animation** — Smooth window animations and transitions
- **Hardware acceleration** — GPU-accelerated compositing

## Rendering Pipeline

1. **Application rendering** — Applications render their content to ADP surfaces
2. **Buffer submission** — Applications submit rendered buffers to the compositor
3. **Compositing** — The compositor blends all surfaces into a final frame
4. **Display output** — The final frame is sent to the display via the graphics service

## Security

- **GPU sandboxing** — Applications access GPU resources through capabilities
- **Buffer isolation** — Applications cannot access other applications' buffers
- **Driver isolation** — Graphics drivers run in isolated sandboxes

## Related Documentation

- **[display-server.md](../design/display-server.md)** — Display server design
- **[graphics ADR](../decisions/ADR-002-graphics-architecture.md)** — Graphics architecture decision
