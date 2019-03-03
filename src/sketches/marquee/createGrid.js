import { times } from 'ramda'

import { play } from './play'
import { MAX_WIDTH, MAX_HEIGHT, UNIT_SIZE, UNIT_SIZE_HALF } from './consts'

import { getClampedDimensions } from '../../utils/getClampedDimensions'

export const blankGrid = ({ unit, pack }) =>
  times(
    (x) =>
      times((y) => {
        return {
          val: 0,
          cx: UNIT_SIZE * x + pack.width + UNIT_SIZE_HALF,
          cy: UNIT_SIZE * y + pack.height + UNIT_SIZE_HALF
        }
      }, unit.height),
    unit.width
  )

export const createGrid = (actions) => {
  const dimensions = getClampedDimensions({
    unitSize: UNIT_SIZE,
    maxHeight: MAX_HEIGHT,
    maxWidth: MAX_WIDTH
  })

  actions.set({
    grid: blankGrid(dimensions),
    dimensions
  })

  play(actions)
}
