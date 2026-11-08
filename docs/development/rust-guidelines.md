# Athia Rust Guidelines

> **Status:** Proposed guidelines — not yet enforced. These guidelines will apply when Rust code is written for Athia.

## Overview

Athia is written primarily in Rust. These guidelines define the coding standards and best practices for Rust code in the project.

## Edition and Toolchain

- **Edition** — Use Rust 2024 edition
- **MSRV** — Minimum Supported Rust Version is documented in `Cargo.toml`
- **Toolchain** — Use the Rust toolchain specified in `rust-toolchain.toml`

## Code Style

### Formatting

- **rustfmt** — All code is formatted with `rustfmt`
- **Configuration** — Project-specific rustfmt configuration is in `.rustfmt.toml`
- **CI check** — Formatting is checked in continuous integration

### Linting

- **Clippy** — All Clippy warnings are addressed
- **Configuration** — Project-specific Clippy configuration is in `.clippy.toml`
- **CI check** — Clippy is run in continuous integration

### Naming

- **snake_case** — Functions, variables, and modules use `snake_case`
- **PascalCase** — Types, traits, and modules use `PascalCase`
- **SCREAMING_SNAKE_CASE** — Constants use `SCREAMING_SNAKE_CASE`
- **Clear names** — Names are clear and descriptive

## Safety

### Safe Rust

- **Prefer safe Rust** — Use safe Rust whenever possible
- **Unsafe justification** — Every `unsafe` block must have a documented safety invariant
- **Unsafe encapsulation** — Unsafe code is encapsulated in safe abstractions where possible
- **Unsafe review** — Unsafe code requires additional review

### Error Handling

- **Result and Option** — Use `Result` and `Option` for error handling
- **No panics** — Avoid panics in library code
- **Error types** — Define explicit error types for public APIs
- **Thiserror** — Use `thiserror` for error type definitions

## Concurrency

### Thread Safety

- **Send and Sync** — Types are `Send` and `Sync` where appropriate
- **No data races** — The borrow checker ensures thread safety
- **Atomic operations** — Use atomic operations for shared state
- **Channels** — Use channels for communication between threads

### Async

- **Async runtime** — Use the async runtime specified by the component
- **No blocking** — Async code does not block the async runtime
- **Timeout** — Async operations have configurable timeouts

## Documentation

### KDoc Comments

- **Public APIs** — All public functions, types, and modules have KDoc comments
- **Examples** — KDoc comments include examples where helpful
- **Safety** — KDoc comments document safety invariants for unsafe code

### Module Documentation

- **Module purpose** — Each module has a documentation comment describing its purpose
- **Re-exports** — Re-exports are documented

## Testing

### Unit Tests

- **Inline tests** — Unit tests are inline with the code they test
- **Test modules** — Test modules are named `mod tests`
- **Test coverage** — All public functions have unit tests

### Integration Tests

- **Integration test directory** — Integration tests are in the `tests/` directory
- **Test scenarios** — Integration tests test scenarios, not individual functions

### Property-Based Testing

- **Proptest** — Use `proptest` for property-based testing
- **Invariants** — Property-based tests verify invariants

## Dependencies

### Minimal Dependencies

- **Few dependencies** — Dependencies are minimized
- **Well-maintained** — Dependencies are well-maintained and widely used
- **No unmaintained** — Unmaintained dependencies are not used

### Workspace Dependencies

- **Workspace inheritance** — Dependencies are inherited from the workspace where possible
- **Version pinning** — Dependency versions are pinned in the workspace

## Performance

### Measurement

- **Benchmark** — Performance-critical code has benchmarks
- **Criterion** — Use `criterion` for benchmarking
- **Measure first** — Optimizations are based on measurements

### Optimization

- **No premature optimization** — Code is not optimized until measurements justify it
- **Zero-cost abstractions** — Zero-cost abstractions are preferred
- **Efficient algorithms** — Efficient algorithms and data structures are used

## Related Documentation

- **[development-principles.md](development-principles.md)** — Development principles
- **[testing-strategy.md](testing-strategy.md)** — Testing strategy
