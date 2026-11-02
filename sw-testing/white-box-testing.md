# White-box testing

- Examines a system's internal logic and structure.
- Requires access to the code or design.
- Often measures structural coverage, such as statement, branch, condition, and path coverage.
- Also known as structural testing or glass-box testing.

## White-box testing methodologies

1. Control flow testing
2. Data flow testing
3. Mutation testing

## Control flow testing

### Statement coverage

Measures whether each executable statement has run at least once.

### Branch (decision) coverage

Measures whether each decision outcome, such as true and false for an `if` statement, has been exercised.

### Condition coverage

Measures whether each Boolean condition has evaluated to both true and false. For decisions with multiple conditions, each condition is considered independently.

### Multiple condition coverage

Measures combinations of condition outcomes in a decision. The required combinations depend on the selected coverage criterion.

### Path coverage

Measures execution of paths through the control-flow graph. Complete path coverage may be infeasible when loops create an unbounded number of paths.

## Data flow testing

- Examines paths from a variable's definition to its use.
- A definition-use (DU) pair connects a definition of a variable to a reachable use of that definition.
- A computational use (CU) occurs when a variable's value is used in a computation.
- A predicate use (PU) occurs when a variable's value is used in a condition that controls program flow.

## Mutation testing

- Creates program variants, called mutants, by making small changes to the original code.
- Runs the test suite against each mutant.
- A test suite detects (or “kills”) a mutant when its results distinguish the mutant from the original program.
- Equivalent mutants behave the same as the original for all relevant inputs and may not be detectable by tests.
