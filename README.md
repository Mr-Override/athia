# Athia

> **Your machine. Your rules.**

An independent, open-source operating system built from the ground up in Rust.

**⚠️ Early-stage project — Athia is not ready for daily use. This repository contains architectural documentation and project scaffolding. No functional operating system code has been implemented yet.**

## What is Athia?

Athia is a completely independent, open-source operating system being built from scratch, primarily in Rust. It has its own microkernel, system services, desktop environment, application framework, package manager, and developer ecosystem.

Athia is **not**:

- A Linux distribution
- A Linux-based operating system
- A customized version of an existing operating system
- A proprietary product
- A cloud-dependent operating system

## Philosophy

Athia is built around nine founding principles:

1. **User sovereignty** — You own and control your computer.
2. **Security first** — Security is a foundational architectural requirement, not an afterthought.
3. **Open source** — Development, documentation, and decision-making are transparent.
4. **Offline first** — The OS remains fully functional without internet connectivity.
5. **User-controlled updates** — Updates are never silently forced upon users.
6. **Privacy** — No mandatory accounts, telemetry, or cloud dependency.
7. **Extensibility** — Users have extensive control over their operating environment.
8. **Longevity** — Users can maintain their systems over time.
9. **Community ownership** — Athia is governed transparently and developed collaboratively.

> Built for the people who use it, owned by the people who build it, and controlled by the people who run it.

## Architecture

Athia uses an **independent microkernel architecture** written primarily in Rust. The core kernel provides only essential services — memory management, scheduling, and inter-process communication — while all other functionality runs in isolated user-space services.

Key architectural components:

- **Athia Core** — The microkernel handling memory, scheduling, IPC, and hardware abstraction.
- **System Services** — Filesystem, networking, device management, and graphics running as isolated user-space services.
- **Athia Desktop** — A modern, customizable desktop environment with dock, taskbar, animations, and the Appearance Engine.
- **Traffic Control** — A universal command center for application search, file search, system settings, commands, automation, and security management.
- **Athia Studio** — A planned integrated development environment for building Athia applications.
- **Athia Packages** — A planned package management system for distributing and updating software.
- **Athia Sentinel** — A planned security management system.

For detailed architecture, see [ARCHITECTURE.md](ARCHITECTURE.md) and the [architecture documentation](docs/architecture/).

## Current Status

Athia is in the **pre-development documentation phase**. The repository currently contains:

- Project vision and philosophy documents
- Architectural design documentation
- Proposed design decisions and rationale
- A static project website
- A Cargo workspace manifest ready for future Rust crates

**No operating system code has been implemented.** All architectural descriptions represent planned or proposed designs, not working implementations.

## Project Roadmap

Athia's development is organized into six phases:

1. **Genesis** — Bootable kernel foundation
2. **Core** — Kernel functionality and process isolation
3. **Systems** — Essential hardware and system services
4. **Desktop** — Graphical environment and user interface
5. **Ecosystem** — Package management, applications, and developer tools
6. **Stable** — Daily-driver quality

See [ROADMAP.md](ROADMAP.md) for detailed milestones.

## Repository Structure

```
athia/
├── Cargo.toml              # Workspace manifest (no members yet)
├── README.md               # This file
├── ATHIA_MANIFESTO.md      # Founding manifesto
├── ARCHITECTURE.md         # Overall OS architecture
├── ROADMAP.md              # Phased development roadmap
├── CONTRIBUTING.md         # How to contribute
├── CODE_OF_CONDUCT.md      # Community code of conduct
├── SECURITY.md             # Security disclosure policy
├── GOVERNANCE.md           # Proposed governance structure
├── CHANGELOG.md            # Version history
├── SUPPORT.md              # Where to get help
├── AUTHORS.md              # Contributor attribution
└── docs/                   # Documentation + Static project website (GitHub Pages)
│   ├── architecture/       # Architecture deep-dives
│   ├── design/             # Design documents and principles
│   ├── development/        # Development guidelines
│   ├── decisions/          # Architecture Decision Records
│   ├── community/          # Community resources
│   ├── index.html          # Website homepage
│   └── assets/             # Website CSS, JS, images
```

## License

Athia's licensing model has not yet been formally selected. The project is evaluating options including **GPL-3.0-or-later** for copyleft protection and **Apache-2.0** for permissive licensing. A final decision will be made through community discussion and documented in [GOVERNANCE.md](GOVERNANCE.md).

Until a license is chosen, all contributions are held in trust and may be released under the license ultimately selected by the project.

## Contributing

We welcome contributors of all experience levels. You don't need to be a systems programmer to help — documentation, design, testing, architecture discussion, and community building are all valuable contributions.

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get involved.

## Website

The Athia project website is available in the `docs/` directory. To view it locally, open `docs/index.html` in a web browser. The site is configured for GitHub Pages deployment from the `docs/` folder.

> **Note:** The public website URL is not yet configured. A placeholder is used until hosting is established.

## Getting in Touch

See [SUPPORT.md](SUPPORT.md) for information on communication channels and community resources.

## Security

If you discover a security vulnerability, please follow the responsible disclosure process described in [SECURITY.md](SECURITY.md).