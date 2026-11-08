# Athia Kernel

> **Status:** Proposed design — not implemented.

## Overview

The Athia kernel is the core of the operating system. It is designed as a microkernel, providing only the minimal set of services required to coordinate the system. All other functionality runs in user-space services.

## Design Philosophy

The kernel follows these principles:

- **Minimalism** — Only essential functionality resides in kernel space. Everything else is a user-space service.
- **Safety** — Written in Rust with memory safety guarantees. Unsafe code is minimized and carefully audited.
- **Modularity** — Kernel components are modular and independently testable.
- **Performance** — Kernel operations are optimized for low latency and high throughput.
- **Security** — The kernel enforces capability-based security and process isolation.

## Kernel Responsibilities

The kernel is responsible for:

1. **Memory management** — Physical and virtual memory allocation, page tables, and memory protection.
2. **Scheduling** — Process scheduling, context switching, and interrupt handling.
3. **Inter-Process Communication** — Message passing between processes and services.
4. **Hardware abstraction** — Providing a unified interface to hardware resources.

## What the Kernel Does Not Do

The kernel deliberately does not include:

- Filesystem implementations
- Network protocol stacks
- Device drivers
- Graphics rendering
- User-space libraries

These are all implemented as user-space services that communicate with the kernel and each other via IPC.

## Memory Management

The kernel manages memory through a capability-based system:

- **Physical memory** — Tracked and allocated by the kernel. Processes cannot access physical memory directly.
- **Virtual memory** — Each process has its own virtual address space. The kernel maps virtual pages to physical pages.
- **Memory capabilities** — Processes receive explicit capabilities that define what memory regions they can access and with what permissions.
- **Page tables** — The kernel maintains page tables for each process and updates them when memory mappings change.

## Scheduling

The kernel implements a priority-based preemptive scheduler:

- **Process states** — Processes can be running, ready, blocked, or terminated.
- **Priority levels** — Processes are assigned priorities that determine scheduling order.
- **Preemption** — Higher-priority processes can preempt lower-priority ones.
- **Real-time support** — Configurable real-time scheduling classes for latency-sensitive tasks.
- **Fairness** — The scheduler ensures fair CPU time distribution among processes of equal priority.

## Interrupt Handling

The kernel handles hardware interrupts:

- **Interrupt Descriptor Table** — Defines interrupt handlers for each interrupt vector.
- **Interrupt priorities** — Interrupts are prioritized to ensure critical interrupts are handled first.
- **Interrupt delegation** — Interrupts can be delegated to user-space device services.

## Boot Process

The kernel is the first software to run at boot:

1. **Bootloader** — Loads the kernel into memory and transfers control.
2. **Kernel entry** — The kernel initializes its data structures and begins execution.
3. **Memory setup** — Physical and virtual memory management is established.
4. **Interrupt setup** — The interrupt descriptor table is configured.
5. **Scheduler start** — The scheduler begins running processes.
6. **Service initialization** — Essential system services are started.

## Target Architectures

The initial target architecture is x86_64. Support for additional architectures (ARM64, RISC-V) is planned for future development.

## Related Documentation

- **[microkernel.md](microkernel.md)** — Detailed microkernel architecture
- **[ipc.md](ipc.md)** — Inter-Process Communication design
- **[security.md](security.md)** — Security architecture
