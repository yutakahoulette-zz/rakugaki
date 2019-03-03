import test from 'tape'
import { classNames } from '../src/utils/classNames'

test('classNames', (t) => {
  const expected = 'red block outline'
  t.equal(
    classNames(
      {
        red: true,
        blue: false
      },
      ' block outline '
    ),
    expected
  )
  t.end()
})
