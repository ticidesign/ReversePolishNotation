const {
  isNumber,
  isCoordenates,
  isOperator,
  resolvePostfix,
  rpn,
  makeCoordinates,
} = require('../index.js');

test('is a Number', () => {
  expect(isNumber(20)).toBe(true);
  expect(isNumber(0.01)).toBe(true);
  expect(isNumber('10')).toBe(true);
  expect(isNumber('-3')).toBe(true);
  expect(isNumber('3')).toBe(true);
})

test('is NOT a Number', () => {
  expect(isNumber('47uiu')).toBe(false);
  expect(isNumber('0-0')).toBe(false);
  expect(isNumber('O')).toBe(false);
})

test('is Coordenates', () => {
  expect(isCoordenates('z8')).toBe(true)
  expect(isCoordenates('abc123')).toBe(true)
})
test('is NOT a Coordenates', () => {
  expect(isCoordenates('8')).toBe(false)
  expect(isCoordenates('abc')).toBe(false)
})

test('is an Operator', () => {
  expect(isOperator.includes('+')).toBe(true)
  expect(isOperator.includes('-')).toBe(true)
  expect(isOperator.includes('*')).toBe(true)
  expect(isOperator.includes('/')).toBe(true)
})
test('is NOT an Operator', () => {
  expect(isOperator.includes('+')).toBe(true)
  expect(isOperator.includes('-')).toBe(true)
  expect(isOperator.includes('*')).toBe(true)
  expect(isOperator.includes('/')).toBe(true)
})

test('Resolve Postfix Notation - Douple spaces', () => {
  expect(resolvePostfix('5  6 +', 'aq20', {})).toBe(11);
})
test('Resolve Postfix Notation - Multiple spaces, one number', () => {
  expect(resolvePostfix('5         ', 'y6', {})).toBe(5);
})
test('Resolve Postfix Notation - Return float', () => {
  expect(resolvePostfix('7 2 /', 'f4', {})).toBe(3.5);
})
test('Resolve Postfix Notation - Multiple functions', () => {
  expect(resolvePostfix('5 1 2 + 4 * + 3 -', 'v5', {})).toBe(14);
})
test('Resolve Postfix Notation - No function', () => {
  expect(resolvePostfix('1 2       ', 'r4', {})).toBe('ERR!');
})
test('Resolve Postfix Notation - Empty', () => {
  expect(resolvePostfix(' ', 'x1', {})).toBe('ERR!');
})
test('Resolve Postfix Notation - Negative numbers', () => {
  expect(resolvePostfix('3 4 5 * -', 'a1', {})).toBe(-17);
})

test('Resolve Postfix Notation - No numbers', () => {
  expect(resolvePostfix('+', 'x2', {})).toBe('ERR!');
})

test('Resolve Postfix Notation - Just one coordinate', () => {
  expect(resolvePostfix('z8', 'a1', {z8: '10'})).toBe(10);
})

test('Resolve Postfix Notation - With missing cordinate', () => {
  expect(resolvePostfix('c2 3 * ', 'a1', {a1: 'c2 3 * ', a2: '2'})).toBe('ERR!');
})

test('Resolve Postfix Notation - With cordinate', () => {
  expect(resolvePostfix('c2 3 * ', 'a1', {a1: 'c2 3 * ', c2: '2'})).toBe(6);
})

test('Resolve Postfix Notation - With many cordinates', () => {
  const COORD = {
    z7: 'x8 3 +', // 723
    x8: 'z9 y7 *', // 720
    y7: '9',
    z9: 'x10', // 80
    x10: 'x7 20 15 + +', // 80
    x7: '5 9 *', // 45
  };
  expect(resolvePostfix('z7 8 +', 'y8', COORD)).toBe(731);
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
    a1: 'b1 b2 +',
    b1: '2 b2 3 * -',
    c1: ' ',
    d1: '+',
    a2: 'a1     ',
    b2: '5         ',
    c2: ' ',
    d2: '7 2 /',
    a3: 'c2 3 * ',
    b3: '1 2       ',
    c3: ' ',
    d3: '5 1 2 + 4 * + 3 -',
  };

  expect( makeCoordinates( input )).toMatchObject(output );
});

test('RPN function', () => {
  // const COORD = {
  //   a1: 'b1 b2 +', //-8
  //   b1: '2 b2 3 * -', //-13
  //   c1: ' ', //ERR!
  //   d1: '+', //ERR!
  //   a2: 'a1     ', //-8
  //   b2: '5         ', //5
  //   c2: ' ', //ERR!
  //   d2: '7 2 /',  //3.5
  //   a3: 'c2 3 * ',  //ERR!
  //   b3: '1 2       ', //ERR!
  //   c3: ' ', //ERR!
  //   d3: '5 1 2 + 4 * + 3 -' //14
  // }
  const input = 'b1 b2 +,2 b2 3 * -, ,+\n' +
                'a1     ,5         , ,7 2 /\n' +
                'c2 3 * ,1 2       , ,5 1 2 + 4 * + 3 -';
  const output = '-8,-13,ERR!,ERR!\n' +
                '-8,5,ERR!,3.5\n' +
                'ERR!,ERR!,ERR!,14';
  expect(rpn(input)).toBe(output);
})

// test('avoid infinite loops', () => {
//   const input = '7, c2 40 +, +\n' +
//                 'b1, a2 72 /, b3\n' +
//                 '50, b2 7 8 + +, 8 +';
//   const output = '7,ERR!,ERR!\n' +
//                 'ERR!,ERR!,ERR!\n' +
//                 '50,ERR!,ERR!';
//   expect(rpn(input)).toBe(output);
// })
