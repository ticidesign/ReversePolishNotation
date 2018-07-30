const describe = (desc, fn) => {
  console.log(desc)
  fn()
}

const it = (msg, fn) => describe('  ' + msg, fn)

const matchers = (exp) => ({
  toBe: (assertion) => {
    if (exp === assertion) {
      console.log('✅   Pass')
      return true
    } else {
      console.log('❌   Fail')
      return false
    }
  }
})

const expect = (exp) => matchers(exp)

module.exports = {
  describe,
  expect,
  it,
  matchers
}
