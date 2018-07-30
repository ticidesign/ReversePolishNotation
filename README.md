# Reverse Polish notation

## List of task for build a csv parser for a spreadsheet:

- write in node and without dependencies
- each cell in the input csv includes a postfix notation (en.wikipedia.org/wiki/Reverse_Polish_notation)
- numbers and operators are separated  by one or more spaces
- a cell can refer to another cell via letter number notation (A2, B6 etc)
- letters refer to columns, numbers to rows
- support for + - * / math operators
- cells that generate an error will print `ERR!` but all other cells still do the deed
- the app should print the output to stdout (no need to save new file)

## Example:

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
