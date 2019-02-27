import { last, dropLast, flatten, map, compose, reduce, addIndex } from 'ramda'

import { rafEach } from '../../utils/rafEach'
import { getClampedDimensions } from '../../utils/getClampedDimensions'
import { smaller } from '../../utils/smaller'
import { nEvens } from '../../utils/nEvens'
import { rotateArray } from '../../utils/rotateArray'

import {
  LENGTH,
  HALF_LENGTH,
  HEIGHT,
  HALF_HEIGHT,
  MAX_SIZE,
  DIRECTIONS
} from './consts'

const pointDown = (direction) => {
  switch (direction) {
    case 'right':
    case 'downLeft':
    case 'upLeft':
      return true
    default:
      return false
  }
}

// Constructs props for the triangles that comprise a side of a hexagon
const constructTriangleProps = ({ cx, cy, count, direction }) => {
  const props = [{ cx, cy, pointDown: pointDown(direction) }]
  for (let i = 1; i < count; i++) {
    const isEven = i % 2 === 0
    const isOdd = (i + 1) % 2 === 0
    cx = cxUpdaters[direction]({ cx, isEven, isOdd })
    cy = cyUpdaters[direction]({ cy, isEven, isOdd })
    props.push({
      cx,
      cy,
      opacity: 0,
      pointDown: pointDown(direction) ? isEven : isOdd
    })
  }
  return props
}

const cxUpdaters = {
  upRight: ({ cx, isOdd }) => cx + (isOdd ? HALF_LENGTH : 0),
  right: ({ cx }) => cx + HALF_LENGTH,
  downRight: ({ cx, isEven }) => cx + (isEven ? HALF_LENGTH : 0),
  downLeft: ({ cx, isOdd }) => cx - (isOdd ? HALF_LENGTH : 0),
  left: ({ cx }) => cx - HALF_LENGTH,
  upLeft: ({ cx, isEven }) => cx - (isEven ? HALF_LENGTH : 0)
}

const cyUpdaters = {
  upRight: ({ cy, isEven }) => cy - (isEven ? HEIGHT : 0),
  right: ({ cy }) => cy,
  downRight: ({ cy, isOdd }) => cy + (isOdd ? HEIGHT : 0),
  downLeft: ({ cy, isEven }) => cy + (isEven ? HEIGHT : 0),
  left: ({ cy }) => cy,
  upLeft: ({ cy, isOdd }) => cy - (isOdd ? HEIGHT : 0)
}

const constructHexProps = ({ initialCx, initialCy, depth }) => {
  const hexProps = (count) =>
    compose(
      map(dropLast(1)),
      map((arr) => rotateArray({ count: 1, arr, direction: 'left' })),
      addIndex(reduce)((arr, direction, i) => {
        const prev = i === 0 ? {} : last(arr[i - 1])
        const [cx, cy] =
          i === 0
            ? [initialCx - (count - 1) * HALF_LENGTH, initialCy]
            : [prev.cx, prev.cy]
        const triangleProps = constructTriangleProps({
          cx,
          cy,
          count,
          direction
        })
        return [].concat(arr, [triangleProps])
      }, [])
    )(DIRECTIONS)
  const arrayOfEvens = nEvens(Math.floor(depth))
  return flatten(arrayOfEvens.map(hexProps))
}

export const createHex = ({ actions, state }) => {
  const dimensions = getClampedDimensions({
    unitSize: LENGTH,
    maxSize: MAX_SIZE
  })
  const { px, unit } = dimensions
  const initialCx = px.width / 2
  const initialCy = px.height / 2 - HALF_HEIGHT
  const depth = smaller(unit.width / 2, unit.height / 2)
  const hexProps = constructHexProps({ initialCx, initialCy, depth })
  const hexPropsLen = hexProps.length

  actions.set({
    dimensions,
    hexProps,
    hexPropsLen
  })

  const end = rafEach({
    fn: (triangle, i) => actions.showTriangle({ triangle, i }),
    arr: hexProps,
    loop: true
  })

  actions.pushEnd(end)
}
