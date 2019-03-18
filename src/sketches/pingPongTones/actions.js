import { MIN_SIZE, BALL_RADIUS } from './consts'
import { cornerCoordsToSegmentCoords } from './cornerCoordsToSegmentCoords'

export const actions = {
  set: (obj) => () => obj,
  handleResize: (resizerNewCoords) => ({
    resizerOldCoords,
    resizerIndex,
    cornerCoords
  }) => {
    const [resizerNewCoordsX, resizerNewCoordsY] = resizerNewCoords
    const [resizerOldCoordsX, resizerOldCoordsY] = resizerOldCoords
    let xDiff = resizerNewCoordsX - resizerOldCoordsX
    let yDiff = resizerNewCoordsY - resizerOldCoordsY

    const [topLeft, topRight, bottomRight, bottomLeft] = cornerCoords
    const [topLeftX, topLeftY] = topLeft
    const [topRightX, topRightY] = topRight
    const [bottomRightX, bottomRightY] = bottomRight
    const [bottomLeftX, bottomLeftY] = bottomLeft

    const boxWidth = topRightX - topLeftX
    const boxHeight = bottomRightY - topRight[1]
    let newCornerCoords
    let isExpandingX
    let isExpandingY
    switch (resizerIndex) {
      case 0:
        // Top left
        isExpandingX = xDiff <= 0
        isExpandingY = yDiff <= 0
        if (!isExpandingX) {
          if (boxWidth - xDiff <= MIN_SIZE) {
            xDiff = 0
          }
        }
        if (!isExpandingY) {
          if (boxHeight - yDiff <= MIN_SIZE) {
            yDiff = 0
          }
        }
        newCornerCoords = [
          [topLeftX + xDiff, topLeftY + yDiff],
          [topRightX, topRightY + yDiff],
          bottomRight,
          [bottomLeftX + xDiff, bottomLeftY]
        ]
        break
      case 1:
        // Top right
        isExpandingX = xDiff >= 0
        isExpandingY = yDiff <= 0
        if (!isExpandingX) {
          if (boxWidth + xDiff <= MIN_SIZE) {
            xDiff = 0
          }
        }
        if (!isExpandingY) {
          if (boxHeight - yDiff <= MIN_SIZE) {
            yDiff = 0
          }
        }
        newCornerCoords = [
          [topLeftX, topLeftY + yDiff],
          [topRightX + xDiff, topRightY + yDiff],
          [bottomRightX + xDiff, bottomRight[1]],
          bottomLeft
        ]
        break
      case 2:
        // Bottom right
        isExpandingX = xDiff >= 0
        isExpandingY = yDiff >= 0
        if (!isExpandingX) {
          if (boxWidth + xDiff <= MIN_SIZE) {
            xDiff = 0
          }
        }
        if (!isExpandingY) {
          if (boxHeight + yDiff <= MIN_SIZE) {
            yDiff = 0
          }
        }
        newCornerCoords = [
          topLeft,
          [topRightX + xDiff, topRightY],
          [bottomRightX + xDiff, bottomRightY + yDiff],
          [bottomLeftX, bottomLeftY + yDiff]
        ]
        break
      case 3:
        // Bottom left
        isExpandingX = xDiff <= 0
        isExpandingY = yDiff >= 0
        if (!isExpandingX) {
          if (boxWidth - xDiff <= MIN_SIZE) {
            xDiff = 0
          }
        }
        if (!isExpandingY) {
          if (boxHeight + yDiff <= MIN_SIZE) {
            yDiff = 0
          }
        }
        newCornerCoords = [
          [topLeftX + xDiff, topLeftY],
          topRight,
          [bottomRightX, bottomRightY + yDiff],
          [bottomLeftX + xDiff, bottomLeftY + yDiff]
        ]
    }
    return {
      resizerOldCoords: resizerNewCoords,
      segmentCoords: cornerCoordsToSegmentCoords(newCornerCoords),
      cornerCoords: newCornerCoords
    }
  },
  updateBalls: () => (state) => {
    const { ballCoords, ballSpeeds, cornerCoords } = state
    const [, topRight, , bottomLeft] = cornerCoords
    let [right, top] = topRight
    let [left, bottom] = bottomLeft
    right = right - BALL_RADIUS
    top = top + BALL_RADIUS
    left = left + BALL_RADIUS
    bottom = bottom - BALL_RADIUS
    const newBallSpeeds = ballSpeeds.map(([xSpeed, ySpeed], i) => {
      const [x, y] = ballCoords[i]
      if (x >= right || x <= left) {
        xSpeed = xSpeed * -1
      }
      if (y <= top || y >= bottom) {
        ySpeed = ySpeed * -1
      }
      return [xSpeed, ySpeed]
    })
    const newBallCoords = ballCoords.map(([x, y], i) => {
      const [xSpeed, ySpeed] = newBallSpeeds[i]
      if (x >= right || x <= left) {
        if (x >= right) {
          x = right - 1
        }
        if (x <= left) {
          x = left + 1
        }
      } else {
        x = x + xSpeed
      }

      if (y >= bottom || y <= top) {
        if (y >= bottom) {
          y = bottom - 1
        }
        if (y <= top) {
          y = top + 1
        }
      } else {
        y = y + ySpeed
      }
      return [x, y]
    })
    return { ballCoords: newBallCoords, ballSpeeds: newBallSpeeds }
  }
}
