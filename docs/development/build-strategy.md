# Athia Build Strategy

> **Status:** Proposed strategy — not yet implemented. This document describes the intended build approach for Athia.

## Overview

The build strategy defines how Athia is compiled, linked, and packaged. It covers cross-compilation, workspace organization, and build tooling.

## Workspace Organization

### Cargo Workspace

Athia uses a Cargo workspace to organize the codebase:

```
athia/
├── Cargo.toml          # Workspace manifest
├── kernel/             # Athia Core microkernel
│   └── Cargo.toml
├── services/           # System services
│   ├── filesystem/
│   ├── networking/
│   ├── devices/
│   └── graphics/
├── desktop/            # Desktop environment
│   ├── shell/
│   ├── window-manager/
│   ├── appearance-engine/
│   └── extension-host/
├── applications/       # User-space applications
├── sdk/                # Athia SDK
└── tools/              # Build and development tools
```

### Workspace Members

- **kernel/** — The microkernel crate
- **services/** — System service crates
- **desktop/** — Desktop environment crates
- **applications/** — Application crates
- **sdk/** — SDK crates
- **tools/** — Build and development tool crates

## Cross-Compilation

### Target Platforms

- **x86_64** — Primary target platform
- **aarch64** — Secondary target platform (planned)
- **riscv64** — Future target platform (planned)

### Cross-Compilation Toolchain

- **rustup** — Rust toolchain management
- **cross** — Cross-compilation tool
- **Custom linker** — Custom linker for kernel builds

### Build Configuration

- **Target specifications** — Custom target specification files for each platform
- **Build scripts** — Build scripts for kernel and service packaging
- **Environment variables** — Build configuration via environment variables

## Build Process

### Kernel Build

1. **Compile** — Kernel code is compiled for the target platform
2. **Link** — Kernel code is linked with a custom linker script
3. **Package** — Kernel binary is packaged for boot

### Service Build

1. **Compile** — Service code is compiled for the target platform
2. **Link** — Service code is linked with the Athia runtime
3. **Package** — Service binaries are packaged for deployment

### Desktop Build

1. **Compile** — Desktop code is compiled for the target platform
2. **Link** — Desktop code is linked with the Athia runtime
3. **Package** — Desktop binaries are packaged for deployment

## Build Tools

### Cargo

- **cargo build** — Standard build command
- **cargo test** — Standard test command
- **cargo clippy** — Linting
- **cargo fmt** — Formatting

### Custom Tools

- **athia-build** — Custom build tool for kernel and service packaging
- **athia-image** — Tool for creating bootable system images
- **athia-qemu** — Tool for running Athia in QEMU

## Continuous Integration

### Build Matrix

- **Platforms** — Build for all supported platforms
- **Rust versions** — Build with MSRV and latest stable Rust
- **Features** — Build with and without optional features

### CI Pipeline

1. **Checkout** — Code is checked out
2. **Build** — Code is built for all platforms
3. **Test** — Tests are run
4. **Lint** — Code is linted
5. **Format** — Code formatting is checked
6. **Package** — Artifacts are packaged

## Related Documentation

- **[rust-guidelines.md](rust-guidelines.md)** — Rust coding standards
- **[testing-strategy.md](testing-strategy.md)** — Testing strategy
