# Software testing

## What is testing?

> “The process of executing a program or system with the intent of finding errors.” — Myers (1979)

## Objective of testing

The primary objective of testing is not to demonstrate correct performance, but to expose hidden defects.

## Why test?

- To verify conformance to requirements.
- To find defects in a product.

## Software testing techniques

### Black-box testing

- Tests a system or component through its known inputs, outputs, and functions without relying on knowledge of its implementation.
- Also known as testing against the specification.

### White-box testing

- Tests a system or component with consideration of its internal mechanisms and structure.
- May include statement, branch, and path testing.
- Also known as structural or glass-box testing.

## Levels of testing

### Unit testing

- Tests individual components to check that they operate correctly.
- Tests each component independently from the rest of the system.

### Integration testing

- Tests modules combined into subsystems.
- Helps detect errors at module interfaces.

### System testing

- Tests the complete system after its subsystems have been integrated.
- Helps identify errors caused by subsystem interactions.
- Validates functional and non-functional requirements.

### Acceptance testing

- The final testing stage before a system is accepted for operational use.
- Usually performed by the customer or end users.
- Helps reveal errors or omissions in the system requirements.

## Barriers to complete testing

- The correctness of the specification may be uncertain.
- Automatically verifying every program is theoretically impossible.
- The verification system itself cannot be verified completely.
- Complete functional testing may be impractical when the input space is large.
- Complete structural testing may be impractical or impossible.
