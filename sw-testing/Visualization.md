# Software quality and testing pipeline

This overview maps the testing topics in this study guide from requirements through release. The sequence is illustrative; teams may adapt it to their development process.

## 1. Requirements and specifications

Start with software specifications and user requirements. Testing aims to find hidden defects and verify conformance, not merely to demonstrate successful behavior.

## 2. Static verification

Review work products before executing the software:

- **Informal analysis:** Code walkthroughs.
- **Formal analysis:** Code inspections.
- **V&V review:** Examine documents, code, and traceability to assess whether the product is being built according to its requirements.

## 3. Dynamic testing

Test progressively from individual components to the complete system.

### Unit testing

Test individual components in isolation. White-box techniques examine internal structure:

- **Control flow:** Measure statement, branch, condition, and path coverage.
- **Data flow:** Trace variables from definition to use through definition-use (DU) pairs, including computational-use (CU) and predicate-use (PU) pairs.
- **Mutation testing:** Make small changes to a program and check whether tests detect the resulting behavioral differences.

### Integration testing

Combine modules into subsystems and check their interfaces:

- **Top-down:** Use stubs to test higher-level modules early.
- **Bottom-up:** Use drivers to test lower-level modules before integrating higher-level modules.
- **Sandwich (hybrid):** Integrate from both ends.

### System testing

Test the integrated system against its functional and non-functional requirements:

- **Functional testing:** Black-box techniques test inputs and outputs against specifications. Examples include equivalence partitioning, boundary value analysis, cause-effect graphing, state transition testing, and use case-based testing.
- **Non-functional testing:** Methods include load, stress, smoke, sanity, regression, volume, and robustness testing.
- **Robustness testing:** Evaluate behavior under invalid inputs, extreme conditions, or environmental failures. Methods include boundary value expansion and fault injection.

### Acceptance testing

The customer or end users evaluate whether the system is ready for operational use:

- **Alpha testing:** Takes place at the developer's site in a controlled environment, often with developers observing use.
- **Beta testing:** Takes place at the customer's site; users report problems from an environment not controlled by the developer.

## 4. Release and measurement

After acceptance, release the software for operational use. Continue to assess quality using metrics:

- **Direct metrics:** Size (LOC or FP), cost, defect density, test pass rate, time to fix defects, requirements coverage, effort variance, and schedule variance.
- **Indirect metrics:** Efficiency, productivity, reliability, functionality, complexity, and maintainability.
