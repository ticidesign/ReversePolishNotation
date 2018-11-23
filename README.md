# Reverse Polish notation

Reverse Polish notation (RPN), also known as Polish postfix notation or simply postfix notation, is a mathematical notation in which operators follow their operands. It does not need any parentheses as long as each operator has a fixed number of operands. The description "Polish" refers to the nationality of logician [Jan Łukasiewicz](https://en.wikipedia.org/wiki/Jan_%C5%81ukasiewicz), who invented this notation in 1924.

Postfix evaluation algorithm

```
for each token in the postfix expression:
  if token is an operator:
    operand_2 ← pop from the stack
    operand_1 ← pop from the stack
    result ← evaluate token with operand_1 and operand_2
    push result back onto the stack
  else if token is an operand:
    push token onto the stack
result ← pop from the stack
```


## List of task for build a csv parser for a spreadsheet:

- write in node and without dependencies
- each cell in the input csv includes a postfix notation (en.wikipedia.org/wiki/Reverse_Polish_notation)
- numbers and operators are separated  by one or more spaces
- a cell can refer to another cell via letter number notation (A2, B6 etc)
- letters refer to columns, numbers to rows
- support for + - * / math operators
- cells that generate an error will print `ERR!` but all other cells still do the deed
- the app should print the output to stdout (no need to save new file)


To get started, install the required packages.

```
yarn
yarn start
```

## Test driven development

A collection of unit tests have been provided. To run the tests, run

```
yarn test
```

## Example

Input
```
b1 b2 +,2 b2 3 * -, ,+
a1     ,5         , ,7 2 /
c2 3 * ,1 2       , ,5 1 2 + 4 * + 3 -
```

Output:
```
-8,-13,0,ERR!
-8,5,0,3.5
0,ERR!,0,14
```
