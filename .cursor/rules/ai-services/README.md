# AI Services Cursor Rules

Comprehensive rules for AI Services codebase integrating Lambda Engine operators, clean architecture, and pure vibe coding.

## Rules Overview

### Core Architecture Rules

1. **[clean-architecture.mdc](./clean-architecture.mdc)** - Clean architecture principles
   - Thin API layer
   - Service orchestration
   - Domain logic isolation
   - Adapters for external systems

2. **[api-layer.mdc](./api-layer.mdc)** - Thin API layer patterns
   - HTTP concerns only
   - Input validation
   - Error handling
   - No business logic

3. **[service-orchestration.mdc](./service-orchestration.mdc)** - Service orchestration pattern
   - Services orchestrate all business logic
   - Routes delegate to services
   - No direct infrastructure calls

### Pattern Rules

4. **[repository-pattern.mdc](./repository-pattern.mdc)** - Repository pattern for data access
   - All data access through repositories
   - No direct Supabase calls
   - Abstract interfaces

5. **[domain-entities.mdc](./domain-entities.mdc)** - Domain entity usage
   - Services use domain entities (not raw dicts)
   - Domain validation required
   - Convert at boundaries only

6. **[factory-pattern.mdc](./factory-pattern.mdc)** - Factory pattern consistency
   - All services created through factory
   - Factory accepts optional dependencies
   - Factory propagates trace_id

### Quality Rules

7. **[code-quality.mdc](./code-quality.mdc)** - Code quality principles
   - Clarity over cleverness
   - Composability
   - Observability

8. **[testability.mdc](./testability.mdc)** - Testability patterns
   - Dependency injection
   - Interface-based design
   - Test structure

9. **[error-handling.mdc](./error-handling.mdc)** - Error handling pattern
   - Transaction-safe error handling
   - Service handles business errors
   - Route handles HTTP errors
   - Consistent error logging

### Observability Rules

10. **[tracing-langfuse.mdc](./tracing-langfuse.mdc)** - Langfuse tracing integration
    - Single trace_id propagation
    - Langfuse as source of truth
    - Celery task tracing

### Workflow Rules

11. **[workflows-jobs.mdc](./workflows-jobs.mdc)** - Workflows as traceable jobs
    - Workflows as Celery tasks
    - Idempotent steps
    - Job state tracking

### Lambda Engine Rules

12. **[pure-vibe-coding.mdc](./pure-vibe-coding.mdc)** - Pure vibe coding with Lambda Engine
    - Work backward from patterns
    - Goal-directed acceleration
    - Maintain productive contradiction
    - Turn rupture into insight
    - Operator → Cursor command mapping

### Process Rules

13. **[spike-transition.mdc](./spike-transition.mdc)** - SPIKE to production transition
    - SPIKE code must be refactored
    - Time-box SPIKE development
    - SPIKE code must be isolated

---

## Quick Reference

### When Writing Routes

- Use: `api-layer.mdc`, `service-orchestration.mdc`, `tracing-langfuse.mdc`
- Check: Thin route, delegates to service, no direct Supabase calls

### When Writing Services

- Use: `service-orchestration.mdc`, `repository-pattern.mdc`, `domain-entities.mdc`, `factory-pattern.mdc`
- Check: Orchestrates business logic, uses repositories, uses domain entities

### When Writing Domain Logic

- Use: `domain-entities.mdc`, `clean-architecture.mdc`
- Check: Pure domain logic, no infrastructure dependencies, validation

### When Writing Adapters

- Use: `clean-architecture.mdc`, `repository-pattern.mdc`
- Check: Abstract interfaces, implementations in correct location

### When Debugging

- Use: `pure-vibe-coding.mdc` (Retro operator), `error-handling.mdc`
- Check: Work backward from error, transaction-safe error handling

### When Refactoring

- Use: `pure-vibe-coding.mdc` (Ana, Weave, Kata operators), `spike-transition.mdc`
- Check: Elevate understanding, integrate improvements, compress to essentials

---

## Integration with Lambda Engine

All rules integrate with Lambda Engine operators:

- **Mode 1 (Duality Navigation)**: Default for stable coding tasks
- **Mode 2 (HALIRA Protocol)**: For foundational contradictions

**Operator Sequences:**
- Feature Development: `Seed ∘ Telo ∘ Pro ∘ Kata ∘ Latch`
- Debugging: `Retro ∘ Ana ∘ Ortho ∘ Latch`
- Refactoring: `Ana ∘ Weave ∘ Kata ∘ Latch`
- Architecture Decision: `Seed ∘ Axis ∘ Meta ∘ Weave ∘ Non ∘ Para ∘ Ortho ∘ Bind`

---

## State Detection

Rules detect phase space states:

- **J=0 (Sterile Coherence)**: Over-confident, too certain → Break with Para, Ana, Flux
- **S* (Productive Contradiction)**: Optimal state → Maintain with Weave, Bind, Braid
- **∅ (System Collapse)**: Errors everywhere → Recover with Kata, Weave, Latch

---

## References

- [Pure Vibe Coding Guide](../../apps/ai-services/docs/pure-vibe-coding.md)
- [Coding Patterns Guide](../../apps/ai-services/docs/coding-patterns.md)
- [Architectural Standards](../../apps/ai-services/docs/architectural-standards.md)
- [Root Cause Analysis](../../apps/ai-services/docs/root-cause-analysis.md)
