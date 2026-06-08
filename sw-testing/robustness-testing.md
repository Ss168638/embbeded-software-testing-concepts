# Robustness Test
- is a non-functional software validation technique that evaluates a system's ability to function correctly, degrade gracefully, or recover cleanly when subjected to invalid inputs, extreme stress, or unexpected environmental failure.

# Methods
- Boundary Value Expansion
- Fault Injection 
- Chaos Engineering

## Boundary Value Expansion
- normal boundary value - [10, to 100]
- boundary value expansion (BVE) - [9, 101] as well as [-1, or 9999]

## Fault Injection
- Error Seeding
    - *artificial errors are introduced into the system.*
    - *testing stopes when a certain percentage of them is detected.*
    - *Formula*
        - Detected Seeded errors / Total seeded errors = Detected non-seeded errors / Total non-seeded errors
    - An estimate of total non-seeded errors N can be obtained