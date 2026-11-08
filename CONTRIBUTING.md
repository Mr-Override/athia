# Contributing to Athia

Thank you for your interest in contributing to Athia. This document explains how you can participate in the project, regardless of your experience level.

## Getting Started

### You Don't Need to Be a Systems Programmer

Athia needs many kinds of contributors. While kernel development is part of the project, it is not the only part. Documentation, design, testing, architecture discussion, community building, and project management are all essential contributions.

### Finding Areas to Contribute

- **Documentation** — Writing, editing, and improving project documentation is always welcome.
- **Design** — Visual design, UX design, and design system contributions help shape the user experience.
- **Architecture** — Discussing and refining architectural decisions ensures the system is well-designed.
- **Testing** — Designing test strategies, writing test plans, and validating implementations.
- **Community** — Answering questions, reviewing contributions, and helping new contributors.
- **Rust development** — Writing, reviewing, and improving Rust code for all components.

## Documentation Contributions

Documentation is one of the most valuable ways to contribute, especially in the early stages of the project.

### What You Can Do

- Improve existing documentation for clarity, accuracy, and completeness
- Write new documentation for under-documented areas
- Translate documentation into other languages
- Create diagrams and visual aids
- Review documentation for consistency and tone

### Documentation Guidelines

- Write clearly and concisely
- Use consistent terminology
- Distinguish between planned, in development, and implemented features
- Include examples where helpful
- Link to related documentation

## Architecture Discussions

Architecture discussions are critical to ensuring Athia is well-designed. You can participate by:

- Reading and reviewing Architecture Decision Records (ADRs) in [docs/decisions/](docs/decisions/)
- Proposing new architectural considerations
- Discussing trade-offs and alternatives
- Providing feedback on design documents

All architecture discussions are public and documented. See [GOVERNANCE.md](GOVERNANCE.md) for how decisions are made.

## Issue Reporting

If you find a problem with the documentation, website, or any aspect of the project:

1. Check existing issues to see if the problem has already been reported
2. Create a new issue with a clear description
3. Include steps to reproduce, if applicable
4. Suggest a solution, if you have one

## Pull Request Expectations

When submitting a pull request:

1. **Describe the change** — Explain what you are changing and why
2. **Reference related issues** — Link to any relevant issues or discussions
3. **Follow project conventions** — Match the existing style, tone, and structure
4. **Keep changes focused** — One pull request should address one coherent change
5. **Be responsive** — Respond to review feedback in a timely manner

## Code Review Philosophy

Code reviews in Athia are collaborative and constructive:

- **Review the code, not the person** — Feedback is about the change, not the contributor
- **Explain your reasoning** — Don't just say something is wrong; explain why
- **Be specific** — Point to exact lines and suggest concrete improvements
- **Be kind** — Assume good faith and remember that everyone is learning
- **Be thorough** — Check for correctness, style, security, and maintainability

## Rust Coding Standards

When Rust code is contributed, it should follow these guidelines:

- **Follow Rust idioms** — Use idiomatic Rust patterns and conventions
- **Write safe code** — Prefer safe Rust; use `unsafe` only when necessary and well-documented
- **Document public APIs** — Include KDoc comments for public functions, types, and modules
- **Handle errors properly** — Use `Result` and `Option` appropriately; avoid panics in library code
- **Write tests** — Include unit tests for new functionality
- **Format code** — Use `rustfmt` with project configuration
- **Clippy clean** — Address all Clippy warnings

See [docs/development/rust-guidelines.md](docs/development/rust-guidelines.md) for detailed Rust guidelines.

## Testing Expectations

All code contributions should include appropriate tests:

- **Unit tests** — Test individual functions and modules
- **Integration tests** — Test interactions between components
- **Property-based tests** — Where applicable, test invariants and properties
- **Benchmark tests** — For performance-critical code, include benchmarks

See [docs/development/testing-strategy.md](docs/development/testing-strategy.md) for the testing strategy.

## Respectful Collaboration

Athia is a community project. All interactions should be respectful, constructive, and inclusive. We expect all contributors to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

### Communication Guidelines

- Be patient and understanding
- Assume good faith
- Provide constructive feedback
- Accept feedback gracefully
- Disagree without being disagreeable

## Questions?

If you have questions about contributing, see [SUPPORT.md](SUPPORT.md) for information on how to get in touch.

## Thank You

Every contribution matters. Whether you fix a typo, propose an architectural improvement, or write a kernel module, you are helping build an operating system that puts users first.

Welcome to Athia.
