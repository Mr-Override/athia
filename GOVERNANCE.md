# Athia Governance

> **Status:** Proposed governance model — not yet established. This document describes the intended governance structure for the Athia project. The initial governance model will evolve as the community grows.

## Principles

Athia's governance is built on transparency, inclusivity, and accountability. Decisions are made openly, contributions are welcomed from all, and leadership is accountable to the community.

## Roles

### Contributors

Anyone who contributes to Athia is a contributor. Contributions include code, documentation, design, testing, issue reporting, and community participation.

Contributors can:
- Open issues and pull requests
- Participate in discussions
- Review contributions from others
- Propose architectural changes
- Vote on community decisions (when voting is used)

### Maintainers

Maintainers are contributors who have demonstrated sustained, high-quality contributions and a deep understanding of the project. Maintainers are responsible for:

- Reviewing and merging pull requests
- Triage issues and managing the project backlog
- Guiding architectural discussions
- Representing the project in external communications

Maintainers are not owners. They are stewards of the project, accountable to the community.

### How Maintainers Are Chosen

Initially, maintainers will be the founding contributors. As the project grows, new maintainers will be added through a nomination and approval process:

1. An existing maintainer nominates a contributor
2. The nomination is discussed publicly
3. Existing maintainers vote on the nomination
4. A supermajority (e.g., 2/3) is required for approval

Maintainers can also step down voluntarily or be removed through a supermajority vote of the other maintainers, with public justification.

## Decision-Making

### Consensus-Seeking

Athia seeks consensus for significant decisions. Consensus does not mean unanimity — it means that all concerns have been heard and addressed to a reasonable degree.

### Architecture Decisions

Significant architectural decisions are documented as Architecture Decision Records (ADRs) in [docs/decisions/](docs/decisions/). The process is:

1. A maintainer or contributor proposes an ADR
2. The ADR is discussed publicly
3. Feedback is incorporated
4. Maintainers review and approve the ADR
5. The ADR is recorded with its status (Proposed, Accepted, Deprecated, etc.)

### Routine Decisions

Routine decisions (bug fixes, documentation improvements, minor feature additions) can be made by maintainers through the pull request review process without a formal ADR.

### Escalation

If consensus cannot be reached after good-faith effort, the decision escalates to a maintainer vote. A supermajority vote breaks the deadlock.

## Community Discussions

Community discussions take place in public channels:

- **Issues:** Technical discussions, bug reports, and feature requests
- **Pull requests:** Code and documentation review
- **Architecture Decision Records:** Architectural discussions and decisions
- **[TO BE CONFIGURED]:** Real-time discussion channel (e.g., forum, chat)

All discussions are archived and searchable.

## Review Requirements

### Pull Requests

- All pull requests require at least one maintainer review
- Significant changes may require multiple reviews
- Automated checks (CI) must pass before merging

### Architecture Decision Records

- All ADRs require maintainer review and approval
- ADRs remain open for community comment for a defined period before approval

## Conflict Resolution

Conflicts are resolved through discussion, not hierarchy:

1. **Direct discussion:** The parties involved discuss the issue directly
2. **Mediation:** If direct discussion fails, a maintainer mediates
3. **Community input:** If mediation fails, the issue is brought to the community
4. **Vote:** As a last resort, a maintainer vote resolves the conflict

All conflict resolution is documented and transparent.

## Project Leadership

The project does not have a single leader. Leadership is distributed among maintainers, with accountability to the community.

A project lead may be designated for specific areas (e.g., kernel development, desktop environment, community management) but does not have authority over other areas.

## Evolution

This governance model is proposed and will evolve as the project grows. Changes to the governance model require:

1. A proposal for the change
2. Public discussion
3. Maintainer approval with supermajority
4. Community comment period

## Initial Governance

In the initial phase of the project, governance is informal:

- The founding contributors serve as initial maintainers
- Decisions are made through discussion and consensus
- Formal processes are established as the community grows

This informal phase is temporary. As the project matures, the governance structure will become more formal and inclusive.

## Code of Conduct

All participants are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Violations are handled according to the enforcement guidelines in that document.

## Transparency

All governance activities are public:

- Maintainer lists are public
- Decision records are public
- Meeting notes (if applicable) are public
- Voting results are public

Nothing about the governance of Athia happens in private, except for sensitive personnel matters (e.g., Code of Conduct enforcement).
