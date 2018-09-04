var assert = require('assert');
var { resolvePostfix, rpn } = require('../index');


describe('Resolve Postfix Notation', () => {
  it('Douple spaces', () => {
    assert.equal(resolvePostfix('5  6 +'), 11);
  })
  it('Multiple spaces, one number', () => {
    assert.equal(resolvePostfix('5         '), 5);
  })
  it('Return float', () => {
    assert.equal(resolvePostfix('7 2 /'), 3.5);
  })
  it('Multiple functions', () => {
    assert.equal(resolvePostfix('5 1 2 + 4 * + 3 -'), 14);
  })
  it('No function', () => {
    assert.equal(resolvePostfix('1 2       '), 'ERR!');
  })
  it('Empty', () => {
    assert.equal(resolvePostfix(' '), 'ERR!');
  })
  it('Negative numbers', () => {
    assert.equal(resolvePostfix('3 4 5 * -'), -17);
  })
  it('No numbers', () => {
    assert.equal(resolvePostfix('+'), 'ERR!');
  })
  // it('with one cordinate', () => {
  //   assert.equal(resolvePostfix('c2 3 * '), 0);
  // })
})

describe('Reverse Polish Notation test', () => {
  it('First Test', () => {
    const result = rpn('b1 b2 +,2 b2 3 * -, ,+\na1     ,5         , ,7 2 /\nc2 3 * ,1 2       , ,5 1 2 + 4 * + 3 -');
    assert.equal(result, '-8,-13,ERR!,ERR!', '-8,5,ERR!,3.5', 'ERR!,ERR!,ERR!,14');
  })
})
