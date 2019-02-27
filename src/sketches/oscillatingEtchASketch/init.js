import { MAX_SIZE, CIRCLE_RADIUS, CIRCLE_WIDTH } from './consts'
import { getClampedDimensions } from '../../utils/getClampedDimensions'
import { raf } from '../../utils/raf'

export const init = (elm, actions) => {
  const offsetY = elm.querySelector('#inputs').offsetHeight + 32
  const dimensions = getClampedDimensions({
    unitSize: 1,
    maxSize: MAX_SIZE,
    offsetY
  })

  const { width, height } = dimensions.px

  const innerWidth = width - CIRCLE_WIDTH
  const innerHeight = height - CIRCLE_WIDTH
  const innerWidthOffset = width - CIRCLE_RADIUS
  const innerHeightOffset = height - CIRCLE_RADIUS
  const maxXInc = innerWidth / 10
  const maxYInc = innerHeight / 10
  const centerX = Math.floor(innerWidth / 2)
  const centerY = Math.floor(innerHeight / 2)
  const x = centerX
  const y = centerY

  actions.set({
    x,
    y,
    centerX,
    centerY,
    width,
    height,
    maxXInc,
    maxYInc,
    innerWidth,
    innerHeight,
    innerWidthOffset,
    innerHeightOffset
  })

  const endLoop = raf(actions.updateXY)

  actions.set({
    endLoop
  })
}
