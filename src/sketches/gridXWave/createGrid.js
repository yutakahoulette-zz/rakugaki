import { times } from 'ramda'
import { getClampedDimensions } from '../../utils/getClampedDimensions'

import { MAX_SIZE, UNIT_SIZE } from './consts'

export const createGrid = (actions) => {
  const dimensions = getClampedDimensions({
    unitSize: UNIT_SIZE,
    maxSize: MAX_SIZE
  })
  const { unit, pack } = dimensions
  const grid = times(
    (y) =>
      times((x) => {
        return {
          tilt: false,
          cx: UNIT_SIZE * x + pack.width,
          cy: UNIT_SIZE * y + pack.height
        }
      }, unit.width),
    unit.height
  )
  actions.set({
    grid,
    dimensions
  })
}
