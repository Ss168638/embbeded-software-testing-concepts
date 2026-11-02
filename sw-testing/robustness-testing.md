# Robustness testing

Robustness testing evaluates a system's ability to function correctly, degrade gracefully, or recover when it encounters invalid inputs, extreme stress, or unexpected environmental failures.

## Methods

- Boundary value expansion
- Fault injection
- Chaos engineering

## Boundary value expansion

For an input expected to be in the range [10, 100], test the boundary values and values just outside the range, such as 9 and 101. Also test clearly invalid values, such as -1 or 9999, when appropriate for the input.

## Fault injection

Fault injection introduces artificial errors or failures into a system to evaluate its response.

### Error seeding

Seeded errors are artificial defects introduced for testing. If testing detects a known proportion of seeded errors, that detection rate can be used to estimate the number of defects that were not seeded.

Let:

- **S** be the number of seeded errors introduced.
- **s** be the number of seeded errors detected.
- **n** be the number of non-seeded errors detected.
- **N** be the estimated total number of non-seeded errors.

Assuming seeded and non-seeded errors are equally likely to be detected:

```text
s / S = n / N
N = (n × S) / s
```

This estimate is meaningful only when the seeded errors are representative and the detection-rate assumption is reasonable.
