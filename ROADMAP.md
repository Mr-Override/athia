# Athia Roadmap

> **Status:** All milestones below are **planned**. No milestones have been completed. This roadmap represents the intended development trajectory and may evolve based on community input and technical discoveries.

## Phases

Athia's development is organized into six major phases. Each phase builds on the previous one and has measurable goals that define when it is complete.

---

## Phase 1: Genesis — Bootable Kernel Foundation

**Goal:** A minimal kernel that can boot on x86_64 hardware and establish the foundation for all subsequent development.

### Milestones

- [ ] **M1.1: Kernel skeleton**
  - Define kernel entry point and boot sequence
  - Implement basic GDT/IDT setup
  - Establish kernel memory layout
  - **Measurable:** Kernel binary loads and reaches a known-good state in QEMU

- [ ] **M1.2: Memory management foundation**
  - Implement physical memory allocator
  - Implement virtual memory with page tables
  - Establish kernel heap
  - **Measurable:** Kernel can allocate and free memory without corruption

- [ ] **M1.3: Basic hardware abstraction**
  - Implement serial output for debugging
  - Implement basic timer interrupt handling
  - Establish interrupt descriptor table
  - **Measurable:** Kernel can print to serial console and handle timer interrupts

- [ ] **M1.4: Build system**
  - Establish Cargo workspace structure for kernel crate
  - Implement cross-compilation toolchain configuration
  - Create kernel binary packaging
  - **Measurable:** `cargo build` produces a bootable kernel binary

---

## Phase 2: Core — Kernel Functionality and Isolation

**Goal:** A functional microkernel with process isolation, IPC, and scheduling.

### Milestones

- [ ] **M2.1: Process management**
  - Implement process creation and termination
  - Establish isolated address spaces
  - Implement process capability system
  - **Measurable:** Kernel can create multiple isolated processes

- [ ] **M2.2: Inter-Process Communication**
  - Implement message passing between processes
  - Establish capability-based IPC routing
  - Implement synchronous and asynchronous message patterns
  - **Measurable:** Two processes can exchange messages via IPC

- [ ] **M2.3: Scheduler**
  - Implement priority-based preemptive scheduling
  - Support multiple process priorities
  - Implement context switching
  - **Measurable:** Multiple processes run concurrently without manual yielding

- [ ] **M2.4: Capability-based security**
  - Implement capability objects and rights
  - Establish capability delegation and revocation
  - Implement sandbox enforcement
  - **Measurable:** Processes are restricted to their granted capabilities

---

## Phase 3: Systems — Essential Hardware and System Services

**Goal:** Functional system services that provide filesystem, networking, device management, and graphics.

### Milestones

- [ ] **M3.1: Filesystem service**
  - Implement basic filesystem service
  - Support at least one filesystem format (e.g., ext4 or FAT)
  - Provide file read/write operations via IPC
  - **Measurable:** A user-space process can read and write files

- [ ] **M3.2: Device service**
  - Implement device enumeration
  - Support keyboard and mouse input
  - Support basic display output
  - **Measurable:** Keyboard input is delivered to user-space processes

- [ ] **M3.3: Networking service**
  - Implement network interface management
  - Support basic TCP/IP stack
  - Provide network access via IPC
  - **Measurable:** A user-space process can send and receive network packets

- [ ] **M3.4: Graphics service**
  - Implement basic framebuffer output
  - Support hardware-accelerated rendering where available
  - Establish display protocol foundation
  - **Measurable:** Graphics output is rendered to the display

---

## Phase 4: Desktop — Graphical Environment

**Goal:** A usable graphical desktop environment with window management, theming, and user interaction.

### Milestones

- [ ] **M4.1: Window manager**
  - Implement window creation, resizing, and movement
  - Support window stacking and focus management
  - Implement basic window decorations
  - **Measurable:** Multiple application windows can be managed simultaneously

- [ ] **M4.2: Athia Shell**
  - Implement desktop panel (dock or taskbar)
  - Implement application launcher
  - Implement system tray
  - **Measurable:** User can launch applications and manage windows via the shell

- [ ] **M4.3: Appearance Engine**
  - Implement theme system with design tokens
  - Support the four official theme families (Midnight, Daylight, Monochrome, Aurora)
  - Implement customization framework
  - **Measurable:** User can switch between themes and see visual changes

- [ ] **M4.4: Traffic Control**
  - Implement application search
  - Implement file search
  - Implement system settings access
  - **Measurable:** User can search for and launch applications via Traffic Control

- [ ] **M4.5: System settings**
  - Implement display settings
  - Implement network settings
  - Implement appearance settings
  - **Measurable:** User can configure system settings through the GUI

---

## Phase 5: Ecosystem — Package Management, Applications, and Developer Tools

**Goal:** A functional ecosystem that supports application distribution, development, and community contributions.

### Milestones

- [ ] **M5.1: Athia Packages**
  - Implement package format and metadata
  - Implement package repository infrastructure
  - Implement package installation and update
  - **Measurable:** User can install and update packages from a repository

- [ ] **M5.2: Athia SDK**
  - Implement application API framework
  - Provide UI toolkit
  - Provide documentation and examples
  - **Measurable:** A developer can build and run a simple application using the SDK

- [ ] **M5.3: Athia Studio**
  - Implement code editor with syntax highlighting
  - Implement build integration
  - Implement debugging support
  - **Measurable:** A developer can write, build, and debug an application in Athia Studio

- [ ] **M5.4: Extension system**
  - Implement Athia Extension Host
  - Implement sandbox-first extension model
  - Support WebAssembly/WASI extensions
  - **Measurable:** Extensions can be installed and run in a sandboxed environment

- [ ] **M5.5: Core applications**
  - Implement file manager
  - Implement text editor
  - Implement web browser
  - **Measurable:** Core applications are available and functional

---

## Phase 6: Stable — Daily-Driver Quality

**Goal:** An operating system that is stable, secure, and usable as a primary operating system.

### Milestones

- [ ] **M6.1: Stability**
  - Achieve system uptime targets
  - Implement crash recovery and diagnostics
  - Establish continuous integration and testing
  - **Measurable:** System passes extended stability testing without crashes

- [ ] **M6.2: Security hardening**
  - Complete security audit
  - Implement Athia Sentinel security management
  - Establish responsible disclosure process
  - **Measurable:** System passes independent security review

- [ ] **M6.3: Hardware support**
  - Support common hardware configurations
  - Implement driver framework
  - Establish hardware compatibility testing
  - **Measurable:** System boots and operates on a defined set of hardware configurations

- [ ] **M6.4: Documentation**
  - Complete user documentation
  - Complete developer documentation
  - Establish documentation contribution process
  - **Measurable:** Documentation covers all user-facing features and developer APIs

- [ ] **M6.5: Community readiness**
  - Establish governance structure
  - Establish release process
  - Establish community support channels
  - **Measurable:** Community can independently contribute, review, and release updates

---

## Timeline

No fixed timeline has been established. Development velocity depends on community participation, available resources, and technical complexity. Milestones will be updated as progress is made.

## How to Track Progress

Progress on each milestone will be tracked in the project's issue tracker. Each milestone corresponds to one or more issues that document the specific tasks required for completion.

## Contributing to the Roadmap

The roadmap is a living document. Community members are encouraged to:

- Discuss milestone priorities in the project's governance channels
- Propose additional milestones or modifications
- Volunteer to work on specific milestones
- Provide feedback on milestone definitions and measurability

See [GOVERNANCE.md](GOVERNANCE.md) for information on how roadmap decisions are made.
