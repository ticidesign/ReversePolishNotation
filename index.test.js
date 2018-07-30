const {
  describe,
  it,
  expect,
  matchers 
} = require('./test/index');

const { resolvePostfix, rpn } = require('./index');


describe('Resolve Postfix Notation tests', () => {
  it('Douple spaces', () => {
    const result = resolvePostfix('5  6 +');
    expect(result).toBe(11);
  })
  it('Multiple spaces, one number', () => {
    const result = resolvePostfix('5         ');
    expect(result).toBe(5);
  })
  it('Return float', () => {
    const result = resolvePostfix('7 2 /');
    expect(result).toBe(3.5);
  })
  it('Multiple functions', () => {
    const result = resolvePostfix('5 1 2 + 4 * + 3 -');
    expect(result).toBe(14);
  })
  it('No function', () => {
    const result = resolvePostfix('1 2       ');
    expect(result).toBe('ERR!');
  })
  it('Empty', () => {
    const result = resolvePostfix(' ');
    expect(result).toBe('ERR!');
  })
  it('Negative numbers', () => {
    expect(resolvePostfix('3 4 5 * -')).toBe(-17);
  })
  it('No numbers', () => {
    const result = resolvePostfix('+');
    expect(result).toBe('ERR!');
  })
  // it('with one cordinate', () => {
  //   expect(resolvePostfix('c2 3 * ')).toBe(0);
  // })
})

describe('Reverse Polish Notation test', () => {
  it('First Test', () => {
    const restult = rpn('b1 b2 +,2 b2 3 * -, ,+\na1     ,5         , ,7 2 /\nc2 3 * ,1 2       , ,5 1 2 + 4 * + 3 -');
    expect(result).toBe('-8,-13,ERR!,ERR!', '-8,5,ERR!,3.5', 'ERR!,ERR!,ERR!,14');
  })
})


// function adder(a, b) {
//   return a + b 
// }

// describe('adder', () => {
//   it('adds two numbers', () => {
//     const result = adder(1, 2)
//     expect(result).toBe(3)
//   })
// })

// let executes = 0
// const noop = () => { executes += 1 }

// describe('describe', () => {
//   it('returns a function', () => {
//     const actual = describe('', noop)

//     expect(executes).toBe(1)
//   }) 
// })

// describe('expect', () => {
//   it('returns an object', () => {
//     const actual = expect(true)

//     expect(typeof actual).toBe('object')
//     expect(typeof actual.toBe).toBe('function')
//   })
// })

// describe('matchers', () => {
//   describe('toBe', () => {
//     it('works', () => {
//       const actual = matchers('1').toBe('1')

//       expect(actual).toBe(true)
//     })
//   })
// })