const { resolvePostfix, rpn, makeCoordinates } = require('../index.js');

test('Resolve Postfix Notation - Douple spaces', () => {
  expect(resolvePostfix('5  6 +')).toBe(11);
})
test('Resolve Postfix Notation - Multiple spaces, one number', () => {
  expect(resolvePostfix('5         ')).toBe(5);
})
test('Resolve Postfix Notation - Return float', () => {
  expect(resolvePostfix('7 2 /')).toBe(3.5);
})
test('Resolve Postfix Notation - Multiple functions', () => {
  expect(resolvePostfix('5 1 2 + 4 * + 3 -')).toBe(14);
})
test('Resolve Postfix Notation - No function', () => {
  expect(resolvePostfix('1 2       ')).toBe('ERR!');
})
test('Resolve Postfix Notation - Empty', () => {
  expect(resolvePostfix(' ')).toBe('ERR!');
})
test('Resolve Postfix Notation - Negative numbers', () => {
  expect(resolvePostfix('3 4 5 * -')).toBe(-17);
})
test('Resolve Postfix Notation - No numbers', () => {
  expect(resolvePostfix('+')).toBe('ERR!');
})
test('Resolve Postfix Notation - With one cordinate', () => {
  expect(resolvePostfix('c2 3 * ')).toBe('ERR!');
})


test('makeCoordinates - Should give us the right coordinates', () => {
  const input = '' +
    /* A1 */ 'b1 b2 +,' +
    /* B1 */ '2 b2 3 * -,' +
    /* C1 */ ' ,' +
    /* D1 */ '+' +
    '\n' +
    /* A2 */ 'a1     ,' +
    /* B2 */ '5         ,' +
    /* C2 */ ' ,' +
    /* D2 */ '7 2 /' +
    '\n' +
    /* A3 */ 'c2 3 * ,' +
    /* B3 */ '1 2       ,' +
    /* C3 */ ' ,' +
    /* D3 */ '5 1 2 + 4 * + 3 -';
  const output = {
    A1: 'b1 b2 +',
    B1: '2 b2 3 * -',
    C1: ' ',
    D1: '+',
    A2: 'a1     ',
    B2: '5         ',
    C2: ' ',
    D2: '7 2 /',
    A3: 'c2 3 * ',
    B3: '1 2       ',
    C3: ' ',
    D3: '5 1 2 + 4 * + 3 -',
  };

  expect( makeCoordinates( input )).toMatchObject(output );
});

test('Reverse Polish Notation - RPN function', () => {
  const input = 'b1 b2 +,2 b2 3 * -, ,+\na1     ,5         , ,7 2 /\nc2 3 * ,1 2       , ,5 1 2 + 4 * + 3 -';
  const output = '-8,-13,ERR!,ERR!, -8,5,ERR!,3.5,ERR!,ERR!,ERR!,14'
  expect(rpn(input)).toBe(output);
})



// infinte loop example
// 7, C2 40 +, +
// B1, A2 72 /, B3
// 50, B2 7 8 + +, ..

//  7, ERR!, ERR!
// , ERR!, ERR!, ERR!
// 50, ERR!, ERR!
