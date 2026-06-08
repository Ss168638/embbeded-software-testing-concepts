# White-Box Testing
- is a software testing technique that focuses on the internal logic and structure of the software.
- tester has access to the code
- main objective is code coverage/statement coverage/branch coverage/path coverage
- is also known as structural testing/glass-box testing

## White Box Testing Methologies
1. Control Flow Testing
2. Data Flow Testing
3. Mutation Testing

## Control Flow Testing
### Statement Coverage 
- 100% of the statement in code must be executed **at least once**

### Branch Coverage/Decision Coverage 
- Branch like if...else, while, do-while etc. are to be evaluated for both true and false (T/F).

### Condition Coverage
- All conditions should be executed at least once
- Conditions using relational and logical operators should be checked for all possible outcomes
- Multiple conditions should be checked in such a manner that each condition becomes true at least once.

### Multiple Condition Coverage
- In some cases there may be multiple conditions in the decisions
- consider combination of these condition for deriving test cases
- in all cases optimize on the number of test cases so that the same number of test cases will help get more coverage

### Path Coverage
- Every statement exercised at least once
- Every decision exercised over all outcomes

## Data Flow Testing
- Structural Testing Technique
- Execute sub-path from definition to use
- Sub-paths are known as definition use pairs (du)
- Definition of variable and usage verified (du)
- All **c**omputational **u**sage is called cu pair
- All **p**redicate **u**sage is called pu pair

### DU pair
- Consists of 2 values 
    - Definition value 
    - Corresponding usage value
### CU pair
- consists of 2 values
    - computational operations
    - its corresponding number of usage

## Mutation Testing
- A structural test approach
- Creates mutants of a program by making small changes to code called **mutatnts**
- During testing each mutant will produce an output different from original output
- Requirement is that the set of the test cases be able to differentiate between original and mutant