# Athia Extension System

> **Status:** Proposed design — not implemented.

## Overview

The Athia Extension System allows users to extend the desktop environment with custom functionality. Extensions run in isolated sandboxes with explicit capabilities, ensuring that they cannot compromise system security or stability.

## Architecture

```
┌─────────────────────────────────────┐
│         Athia Extension Host         │
│  ┌─────────────────────────────────┐│
│  │       Extension Manager         ││
│  │  ┌────────┐ ┌────────┐ ┌──────┐││
│  │  │ Install│ │ Update │ │Remove│││
│  │  └────────┘ └────────┘ └──────┘││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │       Sandbox Runtime           ││
│  │  ┌────────┐ ┌────────┐ ┌──────┐││
│  │  │ WASM   │ │ Capability│ │API │││
│  │  │ Engine │ │ Enforcement│ │   │││
│  │  └────────┘ └────────┘ └──────┘││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │       Extension API             ││
│  │  ┌────────┐ ┌────────┐ ┌──────┐││
│  │  │ Panel  │ │ Window │ │System│││
│  │  │ API    │ │ API    │ │ API  │││
│  │  └────────┘ └────────┘ └──────┘││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

## Sandbox-First Model

### Overview

Extensions run in isolated sandboxes by default. The sandbox defines the minimum set of capabilities required for the extension to function.

### Sandbox Features

- **Process isolation** — Extensions run in separate processes
- **Memory isolation** — Extensions cannot access other processes' memory
- **Capability-based access** — Extensions can only access resources they are authorized to use
- **Resource limits** — Extensions have CPU and memory limits

### WebAssembly/WASI

WebAssembly (WASM) with WebAssembly System Interface (WASI) is the proposed extension technology:

- **Safety** — WebAssembly provides memory safety by design
- **Portability** — WebAssembly runs on any platform with a WASM runtime
- **Performance** — WebAssembly near-native performance
- **Sandboxing** — WebAssembly is sandboxed by default

## Extension API

### Panel API

Extensions can add widgets to the panel:

- **Widget creation** — Create custom panel widgets
- **Widget styling** — Style widgets with design tokens
- **Widget events** — Handle user interactions

### Window API

Extensions can interact with windows:

- **Window information** — Query window properties
- **Window control** — Move, resize, and focus windows (with capability)
- **Window events** — Listen for window state changes

### System API

Extensions can interact with system services:

- **System information** — Query system status (CPU, memory, etc.)
- **Notifications** — Display system notifications
- **Settings** — Read and write system settings (with capability)

## Extension Lifecycle

### Installation

1. **Download** — Extension package is downloaded from a repository
2. **Validation** — Extension manifest is validated
3. **Sandbox setup** — Extension sandbox is configured
4. **Installation** — Extension files are installed
5. **Activation** — Extension is activated and starts running

### Update

1. **Check for updates** — Extension manager checks for available updates
2. **Download** — Updated extension package is downloaded
3. **Validation** — Updated extension manifest is validated
4. **Backup** — Current extension state is backed up
5. **Update** — Extension is updated
6. **Restart** — Extension is restarted with the new version

### Removal

1. **Deactivation** — Extension is deactivated
2. **Cleanup** — Extension resources are cleaned up
3. **Removal** — Extension files are removed
4. **State restoration** — Any modified settings are restored

## Extension Manifest

Extensions include a manifest file that describes the extension:

```
name: "Example Extension"
version: "1.0.0"
author: "Example Author"
description: "An example extension"
capabilities:
  - panel.widget
  - system.notification
api_version: "1.0"
entry_point: "extension.wasm"
```

## Security

### Capability Enforcement

Extensions can only perform actions for which they have capabilities:

- **Explicit declaration** — Capabilities are declared in the manifest
- **User approval** — Users approve capabilities during installation
- **Runtime enforcement** — Capabilities are enforced at runtime

### Code Review

Extensions submitted to the repository undergo review:

- **Manifest validation** — Manifest is validated for correctness
- **Code review** — Extension code is reviewed for security issues
- **Sandbox testing** — Extension is tested in the sandbox

## Related Documentation

- **[extension-security ADR](../decisions/ADR-007-extension-security.md)** — Extension security decision
- **[desktop-design.md](desktop-design.md)** — Desktop design document
