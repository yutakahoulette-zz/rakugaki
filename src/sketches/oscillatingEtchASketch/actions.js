import { takeLast } from 'ramda'
import { CIRCLE_RADIUS } from './consts'

export const actions = {
  set: (obj) => () => obj,
  endLoop: () => ({ endLoop }) => endLoop(),
  clearAll: () => ({ endLoop, centerX, centerY }) => {
    endLoop()
    return {
      pointsArray: [],
      pointsString: '',
      x: centerX,
      y: centerY
    }
  },
  updateXY: () => ({
    x,
    y,
    xInc,
    yInc,
    xDirection = 'right',
    yDirection = 'down',
    innerWidthOffset,
    innerHeightOffset,
    pointsArray,
    tailLength
  }) => {
    if (yDirection === 'down') {
      const atBottomBorder = y + yInc >= innerHeightOffset
      yDirection = atBottomBorder ? 'up' : 'down'
    } else if (yDirection === 'up') {
      const atTopBorder = y - yInc <= CIRCLE_RADIUS
      yDirection = atTopBorder ? 'down' : 'up'
    }

    if (xDirection === 'right') {
      xDirection = x + xInc >= innerWidthOffset ? 'left' : 'right'
    } else if (xDirection === 'left') {
      xDirection = x - xInc <= CIRCLE_RADIUS ? 'right' : 'left'
    }

    y = y + (yDirection === 'down' ? yInc : -yInc)
    x = x + (xDirection === 'right' ? xInc : -xInc)

    const updatedPointsArray = takeLast(
      tailLength,
      [].concat(pointsArray, [x, y])
    )

    const pointsString = updatedPointsArray.join(',')

    return {
      y,
      x,
      yDirection,
      xDirection,
      pointsString,
      pointsArray: updatedPointsArray
    }
  }
}
