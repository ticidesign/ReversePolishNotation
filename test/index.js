const describe = (desc, fn) => {
  console.log(desc)
  try {
    fn()
  } catch(error) {
    process.exit(1)
  }

}

const it = (msg, fn) => describe('  ' + msg, fn)

let pass = true
const matchers = (exp) => ({
  toBe: (assertion) => {
    if (exp === assertion) {
      console.log('✅   Pass')
    } else {
      console.log('❌   Fail')
      throw Error('❌   Fail Now')
      pass = false
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
