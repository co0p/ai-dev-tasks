# The 6 Pillars of Modern Software Engineering

A strong constitution covers the following pillars, guiding decision-making across architecture, implementation, and trade-offs:

1. **Delivery Velocity**
   - How fast to ship vs. how polished? Iteration philosophy, MVP definition, acceptable quality thresholds.
   - Guides: Feature scope, when to refactor, release cadence
   - References: Kent Beck (XP: small steps, continuous integration), Jez Humble & David Farley (Continuous Delivery), Nicole Forsgren et al. (DORA metrics)

2. **Test Strategy**
   - What to test, when to test, how much coverage is enough?
   - Guides: Test writing, refactoring confidence, deployment decisions
   - References: Kent Beck (TDD, test-first), Michael Feathers (Working Effectively with Legacy Code), Gerard Meszaros (xUnit Test Patterns)

3. **Design Integrity**
   - How to structure code? Dependency rules, SOLID principles, architectural boundaries.
   - Guides: Where to put logic, when to create abstractions, module boundaries
   - References: Robert C. Martin (SOLID, Clean Architecture), Eric Evans (DDD), Grady Booch (OO design), David Parnas (information hiding)

4. **Simplicity First**
   - When to add abstraction? YAGNI application, refactoring triggers, complexity tolerance.
   - Guides: Premature optimization, abstraction timing, code evolution
   - References: Martin Fowler (Refactoring, YAGNI), Ward Cunningham (Technical debt metaphor), John Ousterhout (A Philosophy of Software Design: simple interfaces)

5. **Technical Debt Boundaries**
   - When are shortcuts acceptable? How to track and pay down debt?
   - Guides: Shortcut decisions, refactoring priority, quality bar
   - References: Ward Cunningham (Debt), Martin Fowler (Debt quadrants), Kent Beck (make it work → make it right → make it fast)

6. **Dependency Discipline**
   - When to add libraries? How to isolate third-party code? Framework philosophy.
   - Guides: Library selection, vendor coupling, upgrade strategy
   - References: Robert C. Martin (stable dependencies, dependency inversion), Sam Newman (Building Microservices: external service boundaries), Michael Nygard (Release It!: resilience patterns)
