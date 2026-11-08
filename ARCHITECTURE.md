# Athia Architecture

> **Status:** Proposed architecture — no components are implemented. This document describes the intended design of the Athia operating system.

## Overview

Athia is designed as an independent, Rust-first, microkernel-based operating system. The architecture follows the principle of minimalism at the kernel level and modularity at the user-space level. Only essential functionality resides in kernel space; everything else runs as isolated user-space services.

The architecture is organized into four layers:

1. **Hardware** — Physical and virtual hardware resources.
2. **Athia Core (Microkernel)** — Memory management, scheduling, IPC, and hardware abstraction.
3. **System Services** — Filesystem, networking, device management, graphics, and security services.
4. **User Space** — Desktop environment, applications, and developer tools.

```
┌─────────────────────────────────────────────────────────┐
│                   User Space                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Desktop  │ │ Apps     │ │ Tools    │ │ SDK      │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
├─────────────────────────────────────────────────────────┤
│                 System Services                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Filesys  │ │ Network  │ │ Graphics │ │ Devices  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
├─────────────────────────────────────────────────────────┤
│                  Athia Core                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ Memory   │ │ Schedule │ │    IPC   │ │   HVA    │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
├─────────────────────────────────────────────────────────┤
│                   Hardware                              │
└─────────────────────────────────────────────────────────┘
```

## Athia Core

Athia Core is the microkernel at the heart of the operating system. It provides only the minimal set of services required to coordinate the system, deliberately keeping the kernel surface area small to reduce attack surface and increase reliability.

### Memory Management

The kernel manages physical and virtual memory through a capability-based system. Each process receives explicit memory capabilities that define what regions it can access and with what permissions. The kernel enforces these capabilities at the hardware level using memory protection units.

Key design goals:
- **Capability-based access** — No implicit global memory access.
- **Fine-grained permissions** — Read, write, execute, and map permissions are independently grantable.
- **Memory accounting** — Each process and service tracks its memory usage for resource management.
- **Safe allocation** — Rust's ownership model is used throughout to prevent use-after-free, double-free, and other memory safety issues.

### Scheduling

Athia uses a priority-based preemptive scheduler with support for real-time priorities. The scheduler is designed to be fair, responsive, and energy-aware.

Key design goals:
- **Preemptive multitasking** — No process can monopolize the CPU.
- **Priority inheritance** — Priority inheritance protocols prevent priority inversion.
- **Real-time support** — Configurable real-time scheduling classes for latency-sensitive tasks.
- **Energy awareness** — The scheduler considers power consumption when making scheduling decisions on battery-powered devices.

### Inter-Process Communication (IPC)

IPC is the primary mechanism by which system services and applications interact. Athia's IPC system is designed to be fast, type-safe, and secure.

Key design goals:
- **Message passing** — All IPC is message-based, with no shared memory by default.
- **Capability-based routing** — Messages can only be sent to endpoints for which the sender holds a capability.
- **Type safety** — Message types are defined in interface description files and compiled into type-safe Rust code.
- **Synchronous and asynchronous** — Both blocking and non-blocking message patterns are supported.
- **Performance** — Zero-copy message passing where possible to minimize overhead.

### Hardware Virtual Address (HVA)

The Hardware Virtual Address layer provides a unified abstraction over hardware resources. Device drivers interact with hardware through this layer, which handles memory-mapped I/O, interrupt handling, and device enumeration.

Key design goals:
- **Abstraction** — Hardware-specific details are hidden behind stable interfaces.
- **Safety** — Hardware access is mediated through the kernel to prevent unauthorized access.
- **Extensibility** — New hardware can be supported by adding drivers without modifying the kernel.

## Capability-Based Security

Security in Athia is built on a capability-based model. Rather than relying on global identifiers (like Unix UIDs and GIDs) and discretionary access controls, Athia uses capabilities — unforgeable tokens that grant specific rights to specific resources.

### Capability Model

- **Capabilities are objects** — Each capability is a first-class object that can be passed between processes via IPC.
- **Capabilities are bounded** — A capability grants no more rights than the holder possesses. Rights can be further restricted when delegating.
- **Capabilities are revocable** — The kernel can revoke capabilities, immediately removing access.
- **No global namespace** — There is no global lookup of resources. Access is possible only through held capabilities.

### Process Isolation

Every process in Athia runs in its own isolated address space with explicit capabilities. A process cannot access another process's memory, files, or devices unless explicitly granted a capability.

### Sandbox-First Design

Applications run in sandboxes by default. The sandbox defines the minimum set of capabilities required for the application to function. Additional capabilities must be explicitly requested and granted by the user.

## System Services

System services run in user space as isolated processes. Each service is responsible for a specific domain and communicates with other services and applications via IPC.

### Filesystem Service

The filesystem service manages storage, file operations, and namespace management. It supports multiple filesystem formats and provides a unified interface to applications.

Planned features:
- Journaling filesystem support
- Network filesystem support
- Encrypted storage
- Snapshot and rollback capabilities

### Networking Service

The networking service manages network interfaces, protocols, and connections. It provides a secure networking stack with capability-based access control.

Planned features:
- TCP/IP stack
- DNS resolution
- Firewall and packet filtering
- VPN support
- Offline-first operation

### Device Service

The device service manages hardware devices, including input devices, storage devices, and peripherals. It handles device enumeration, driver loading, and resource allocation.

Planned features:
- Hot-plug support
- Driver sandboxing
- Power management
- Device capability delegation

### Graphics Service

The graphics service manages display output, compositing, and hardware acceleration. It provides the foundation for the Athia Desktop environment.

Planned features:
- Hardware-accelerated rendering
- Multiple display support
- Compositor integration
- Athia Display Protocol (ADP)

## User-Space Architecture

User space contains the desktop environment, applications, and developer tools. All user-space components communicate with system services via IPC and are subject to the same capability-based security model.

### Athia Desktop

The desktop environment provides the graphical user interface, including the window manager, panel, application launcher, and system settings. It is built on the Appearance Engine for theming and customization.

See [docs/architecture/desktop.md](docs/architecture/desktop.md) for detailed desktop architecture.

### Applications

Applications are built using the Athia SDK, which provides APIs for UI, networking, storage, and system integration. Applications run in sandboxes with explicit capabilities.

### Athia Studio

Athia Studio is the planned integrated development environment for building Athia applications. It provides editing, debugging, profiling, and deployment tools.

## Boot Architecture

The boot process is designed to be simple, secure, and recoverable:

1. **Bootloader** — Loads the kernel and initial ramdisk.
2. **Kernel initialization** — Sets up memory management, scheduling, and hardware abstraction.
3. **Service initialization** — Starts essential system services in dependency order.
4. **User session** — Launches the desktop environment and user session.

Each stage is independently verifiable and recoverable. If a service fails to start, the system can continue with degraded functionality rather than failing entirely.

## Rust-First Design

Athia is written primarily in Rust. The choice of Rust is fundamental to the architecture:

- **Memory safety** — No buffer overflows, use-after-free, or data races at the language level.
- **Concurrency safety** — The borrow checker ensures thread-safe concurrent code.
- **Zero-cost abstractions** — High-level abstractions without runtime overhead.
- **No garbage collector** — Deterministic resource management suitable for systems programming.
- **Strong type system** — Compile-time verification of invariants and protocols.

## Status

This architecture is **proposed** and has not been implemented. All components described above represent design intentions, not working code. The architecture may evolve as development progresses and community feedback is incorporated.

For architectural decisions and their rationale, see the [Architecture Decision Records](docs/decisions/).
