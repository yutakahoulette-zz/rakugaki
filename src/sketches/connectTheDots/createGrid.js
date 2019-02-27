import { times } from 'ramda'
import { getClampedDimensions } from '../../utils/getClampedDimensions'

import { MAX_SIZE, UNIT_SIZE, PADDING } from './consts'

export const createGrid = (elm, actions) => {
  const offsetY = elm.querySelector('#controls').offsetHeight + PADDING
  const dimensions = getClampedDimensions({
    unitSize: UNIT_SIZE,
    maxSize: MAX_SIZE,
    offsetX: PADDING,
    offsetY
  })
  const { unit, pack } = dimensions
  const grid = times(
    (y) =>
      times((x) => {
        return {
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
