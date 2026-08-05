import { spawner } from './helpers/index.js'

// a timed out test is reported as failed, the tests after it keep running
await spawner(
  function (test) {
    test('tbd', { timeout: 10 }, async function (t) {
      await new Promise((resolve) => {
        setTimeout(resolve, 200)
      })
      t.pass()
    })

    test('tbd2', { timeout: 10 }, function (t) {
      t.pass()
    })
  },
  `
  TAP version 13

  # tbd
      not ok 1 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - tbd # time = 11.402584ms

  # tbd2
      ok 1 - passed
  ok 2 - tbd2 # time = 0.216125ms

  1..2
  # tests = 1/2 pass
  # asserts = 1/2 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

// the assertions of a timed out test are ignored once it has been reported
await spawner(
  function (test) {
    test('zombie', { timeout: 10 }, async function (t) {
      t.pass('before')
      await new Promise((resolve) => {
        setTimeout(resolve, 200)
      })
      t.pass('after')
      t.comment('after')
      t.teardown(() => {})
    })

    test('next', function (t) {
      t.pass()
    })
  },
  `
  TAP version 13

  # zombie
      ok 1 - before
      not ok 2 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - zombie # time = 11.402584ms

  # next
      ok 1 - passed
  ok 2 - next # time = 0.216125ms

  1..2
  # tests = 1/2 pass
  # asserts = 2/3 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

// a timed out subtest fails its parent but the parent keeps running
await spawner(
  function (test) {
    test('parent', async function (t) {
      await t.test('slow child', { timeout: 10 }, async function (st) {
        await new Promise((resolve) => {
          setTimeout(resolve, 200)
        })
        st.pass()
      })

      t.pass('parent continues')
    })
  },
  `
  TAP version 13

  # parent
      not ok 1 - (slow child) - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
      ok 2 - parent continues
  not ok 1 - parent # time = 202.402584ms

  1..1
  # tests = 0/1 pass
  # asserts = 1/2 pass
  # time = 203.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

// a test that times out during teardown is still reported as failed
await spawner(
  function (test) {
    test('slow teardown', { timeout: 10 }, function (t) {
      t.teardown(async function () {
        await new Promise((resolve) => {
          setTimeout(resolve, 200)
        })
      })
      t.pass()
    })

    test('next', function (t) {
      t.pass()
    })
  },
  `
  TAP version 13

  # slow teardown
      ok 1 - passed
      not ok 2 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - slow teardown # time = 11.402584ms

  # next
      ok 1 - passed
  ok 2 - next # time = 0.216125ms

  1..2
  # tests = 1/2 pass
  # asserts = 2/3 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)
