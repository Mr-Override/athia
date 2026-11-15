# Athia Microkernel Architecture

> **Status:** Proposed design — not implemented.

## Overview

Athia uses a microkernel architecture where the kernel provides only the minimal set of services required to coordinate the system. This approach maximizes reliability, security, and modularity by keeping the kernel surface area small and running all other functionality in isolated user-space services.

## Microkernel Principles

### Minimal Kernel

The microkernel contains only:

- Memory management
- Thread/process scheduling
- Inter-process communication (IPC)
- Hardware abstraction layer

Everything else — filesystems, networking, device drivers, graphics, and user interfaces — runs in user space.

### Isolation

Each component runs in its own address space with explicit capabilities. A failure in one component does not compromise the entire system.

### Capability-Based Access

Access to resources is controlled by capabilities — unforgeable tokens that grant specific rights. There is no global namespace; access is possible only through held capabilities.

## Memory Management Architecture

### Physical Memory

The kernel maintains a physical memory map that tracks all available memory regions. Physical pages are allocated and freed through the kernel's memory allocator.

### Virtual Memory

Each process has its own virtual address space. The kernel manages page tables and handles page faults. Virtual-to-physical mappings are controlled by memory capabilities.

### Memory Capabilities

Memory capabilities define:

- **Base address** — The starting virtual address of the region
- **Size** — The number of bytes in the region
- **Permissions** — Read, write, execute, and map permissions
- **Transferability** — Whether the capability can be delegated to other processes

### Memory Mapping

Processes can map memory regions with specific permissions. The kernel enforces these permissions at the hardware level using memory protection units.

## Scheduling Architecture

### Process Model

A process is an isolated execution context with:

- A virtual address space
- A set of capabilities
- One or more threads
- A priority level

### Thread Scheduling

Threads are the unit of scheduling. The scheduler selects which thread to run on each CPU core based on priority, readiness, and fairness.

### Scheduling Classes

The scheduler supports multiple scheduling classes:

- **Normal** — Standard processes with fair-share scheduling
- **Real-time** — Latency-sensitive processes with guaranteed response times
- **Idle** — Low-priority background tasks

### Context Switching

Context switching is performed by the kernel when:

- A thread blocks on IPC
- A higher-priority thread becomes ready
- A timer interrupt occurs
- A thread voluntarily yields

## Hardware Abstraction Architecture

### Hardware Virtual Address (HVA)

The HVA layer provides a unified abstraction over hardware resources:

- **Memory-mapped I/O** — Device registers are accessed through memory mappings
- **Interrupt handling** — Interrupts are routed to the appropriate handlers
- **Device enumeration** — Devices are discovered and registered

### Device Drivers

Device drivers run in user space as isolated services. They communicate with hardware through the HVA layer and with other services via IPC.

### Driver Sandboxing

Device drivers run in sandboxes with explicit capabilities. They can only access the hardware resources they are authorized to use.

## Comparison with Monolithic Kernels

| Aspect | Monolithic Kernel | Athia Microkernel |
|--------|------------------|-------------------|
| Kernel size | Large (filesystems, networking, drivers) | Small (memory, scheduling, IPC, HVA) |
| Failure isolation | Limited — kernel panic affects everything | Strong — user-space failures are isolated |
| Security | Discretionary access control | Capability-based security |
| Modularity | Loadable modules | Independent user-space services |
| Development | Kernel-space programming required | User-space services can use standard libraries |
| Performance | Fast intra-kernel calls | IPC overhead between services |

## Trade-offs

### Advantages

- **Reliability** — User-space failures cannot crash the kernel
- **Security** — Smaller kernel attack surface, capability-based access
- **Modularity** — Services can be updated independently
- **Maintainability** — Smaller kernel is easier to understand and verify

### Disadvantages

- **IPC overhead** — Communication between services requires message passing
- **Complexity** — More processes and services to coordinate
- **Performance** — IPC is slower than direct function calls

These trade-offs are accepted because reliability, security, and modularity are prioritized over raw performance. Performance is addressed through optimized IPC and zero-copy message passing where possible.

## Related Documentation

- **[kernel.md](kernel.md)** — Kernel overview
- **[ipc.md](ipc.md)** — Inter-Process Communication design
- **[security.md](security.md)** — Security architecture
