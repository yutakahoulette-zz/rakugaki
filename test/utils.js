import test from 'tape'
import { classNames } from '../src/utils/classNames'
import { firstKeyVal } from '../src/utils/firstKeyVal'
import { gainToDb } from '../src/utils/gainToDb'
import { get2dCoords } from '../src/utils/get2dCoords'
import { getElmFrom2dArray } from '../src/utils/getElmFrom2dArray'

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

test('firsKeyVal', (t) => {
  const expected = ['apple', 1]
  const obj = {
    apple: 1,
    banana: 2
  }
  t.deepEqual(firstKeyVal(obj), expected)
  t.end()
})

test('gainToDb', (t) => {
  t.equal(gainToDb(1), 0)
  t.equal(gainToDb(10), 20)
  t.end()
})

test('get2dCoords', (t) => {
  t.deepEqual(get2dCoords(4, 5), { x: 4, y: 0 })
  t.deepEqual(get2dCoords(5, 4), { x: 1, y: 1 })
  t.end()
})

test('getElmFrom2dArray', (t) => {
  const matrix = [[1, 2, 3], [4, 5, 6]]
  t.equal(getElmFrom2dArray({ x: 0, y: 0 }, matrix), 1)
  t.equal(getElmFrom2dArray({ x: 2, y: 0 }, matrix), 3)
  t.equal(getElmFrom2dArray({ x: 0, y: 1 }, matrix), 4)
  t.equal(getElmFrom2dArray({ x: 2, y: 1 }, matrix), 6)
  t.end()
})
