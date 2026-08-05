import { spawner } from './helpers/index.js'

await spawner(
  function (test) {
    test('timeout option, classic, no plan', { timeout: 10 }, async function (t) {
      await new Promise((resolve) => {
        setTimeout(resolve, 20)
      })
    })
  },
  `
  TAP version 13

  # timeout option, classic, no plan
      not ok 1 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - timeout option, classic, no plan # time = 11.402584ms

  1..1
  # tests = 0/1 pass
  # asserts = 0/1 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

await spawner(
  async function (test) {
    const t = test('timeout option, inverted, no plan', { timeout: 10 })
    await new Promise((resolve) => {
      setTimeout(resolve, 20)
    })
    t.end()
  },
  `
  TAP version 13

  # timeout option, inverted, no plan
      not ok 1 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - timeout option, inverted, no plan # time = 11.402584ms

  1..1
  # tests = 0/1 pass
  # asserts = 0/1 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

await spawner(
  function (test) {
    test('timeout option, classic, plan', { timeout: 10 }, async function (t) {
      t.plan(1)
      await new Promise((resolve) => {
        setTimeout(resolve, 20)
      })
    })
  },
  `
  TAP version 13

  # timeout option, classic, plan
      not ok 1 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - timeout option, classic, plan # time = 11.402584ms

  1..1
  # tests = 0/1 pass
  # asserts = 0/1 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

await spawner(
  async function (test) {
    const t = test('timeout option, inverted, plan', { timeout: 10 })
    t.plan(1)
    await new Promise((resolve) => {
      setTimeout(resolve, 20)
    })
    await t
  },
  `
  TAP version 13

  # timeout option, inverted, plan
      not ok 1 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - timeout option, inverted, plan # time = 11.402584ms

  1..1
  # tests = 0/1 pass
  # asserts = 0/1 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

await spawner(
  function (test) {
    test('timeout method, classic, no plan', async function (t) {
      t.timeout(10)
      await new Promise((resolve) => {
        setTimeout(resolve, 20)
      })
    })
  },
  `
  TAP version 13

  # timeout method, classic, no plan
      not ok 1 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - timeout method, classic, no plan # time = 11.402584ms

  1..1
  # tests = 0/1 pass
  # asserts = 0/1 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

await spawner(
  async function (test) {
    const t = test('timeout method, inverted, no plan')
    t.timeout(10)
    await new Promise((resolve) => {
      setTimeout(resolve, 20)
    })
    t.end()
  },
  `
  TAP version 13

  # timeout method, inverted, no plan
      not ok 1 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - timeout method, inverted, no plan # time = 11.402584ms

  1..1
  # tests = 0/1 pass
  # asserts = 0/1 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

await spawner(
  function (test) {
    test('timeout method, classic, plan', async function (t) {
      t.timeout(10)
      t.plan(1)
      await new Promise((resolve) => {
        setTimeout(resolve, 20)
      })
    })
  },
  `
  TAP version 13

  # timeout method, classic, plan
      not ok 1 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - timeout method, classic, plan # time = 11.402584ms

  1..1
  # tests = 0/1 pass
  # asserts = 0/1 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)

await spawner(
  async function (test) {
    const t = test('timeout method, inverted, plan')
    t.timeout(10)
    t.plan(1)
    await new Promise((resolve) => {
      setTimeout(resolve, 20)
    })
    await t
  },
  `
  TAP version 13

  # timeout method, inverted, plan
      not ok 1 - timed out after 10 ms
        ---
        code: ERR_TIMEOUT
        operator: timeout
        timeout: 10
        ...
  not ok 1 - timeout method, inverted, plan # time = 11.402584ms

  1..1
  # tests = 0/1 pass
  # asserts = 0/1 pass
  # time = 12.983ms

  # not ok
  `,
  { exitCode: 1, stderr: '' }
)
