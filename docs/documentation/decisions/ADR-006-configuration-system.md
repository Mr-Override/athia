# ADR-006: Configuration System

## Status

**Proposed**

## Context

Athia needs a configuration system for storing and managing system and user settings. The configuration system must support hierarchical settings, user overrides, and versioned configuration files.

## Decision

Athia uses a **declarative, versioned configuration system** with the following characteristics:

1. **TOML format** — Configuration files use TOML for readability and simplicity.
2. **Hierarchical structure** — Configuration is organized in a hierarchical directory structure.
3. **User overrides** — User configuration overrides system defaults.
4. **Versioned** — Configuration files include a version field for compatibility.
5. **Validated** — Configuration is validated at load time.

Configuration directories:

- `/etc/athia/` — System-wide configuration
- `~/.config/athia/` — User-specific configuration

## Alternatives Considered

- **JSON** — A popular configuration format. Rejected because TOML is more readable for humans.
- **YAML** — A flexible configuration format. Rejected because YAML's complexity can lead to parsing issues.
- **XML** — A structured configuration format. Rejected because it is verbose and difficult to read.
- **Registry** — A centralized configuration database. Rejected because files are simpler and more transparent.

## Consequences

### Positive

- **Readability** — TOML is easy to read and write.
- **Transparency** — Configuration files are plain text and version-controlled.
- **Simplicity** — File-based configuration is simpler than a registry.

### Negative

- **Validation** — Configuration must be validated at load time.
- **Migrations** — Configuration migrations must be handled when formats change.

## Open Questions

- How should configuration changes be applied (immediately, on restart)?
- Should configuration be encrypted for sensitive settings?
