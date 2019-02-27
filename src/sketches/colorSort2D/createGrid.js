// NPM
import { compose, sort, reverse, map, prop, times, uniq, flatten } from 'ramda'

// Utils
import { randomElm } from '../../utils/randomElm'
import { getClampedDimensions } from '../../utils/getClampedDimensions'

// Consts
import { MAX_SIZE, UNIT_SIZE, UNIT_SIZE_HALF, COLORS } from './consts'

import { animate } from './animate'

export const createGrid = (state, actions) => {
  const dimensions = getClampedDimensions({
    unitSize: UNIT_SIZE,
    maxSize: MAX_SIZE
  })

  const { unit, pack } = dimensions

  const colors = times(
    () => times(() => randomElm(COLORS), unit.width),
    unit.height
  )

  const grid = colors.map((arr, y) => {
    return arr.map((color, x) => {
      return {
        fill: color,
        cx: UNIT_SIZE * x + pack.width + UNIT_SIZE_HALF,
        cy: UNIT_SIZE * y + pack.height + UNIT_SIZE_HALF
      }
    })
  })

  const uniqueColors = compose(
    uniq,
    flatten
  )(colors)

  const circles = flatten(grid)

  const sortedColors = compose(
    reverse,
    map(prop('fill')),
    flatten,
    sort((a, b) => a.length - b.length),
    map((color) => circles.filter((circle) => circle.fill === color))
  )(uniqueColors)

  actions.set({
    grid,
    dimensions
  })

  animate(actions, sortedColors)
}
