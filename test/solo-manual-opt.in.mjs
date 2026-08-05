import { spawner } from './helpers/index.js'

await spawner(
  function ({ test, solo }) {
    solo()

    test('skip this one', function (t) {
      t.pass()
    })

    solo('only one solo is ran', function (t) {
      t.pass()
    })

    test('skip this other one', function (t) {
      t.pass()
    })
  },
  `
  TAP version 13

  # only one solo is ran
      ok 1 - passed
      1..1
  ok 1 - only one solo is ran # time = 0.332794ms

  1..1
  # tests = 1/1 pass
  # asserts = 1/1 pass
  # time = 3.964696ms

  # ok
  `,
  { exitCode: 0, stderr: '' }
)
