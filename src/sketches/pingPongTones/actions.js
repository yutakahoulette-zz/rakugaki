import { MIN_SIZE, SEGMENT_COUNT, SCALES } from './consts'
import { cornerCoordsToSegmentCoords } from './cornerCoordsToSegmentCoords'
import { getBoxSizeAndOffsets } from './getBoxSizeAndOffsets'
import { percentInRange } from '../../utils/percentInRange'

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
    const boxSizeAndOffsets = getBoxSizeAndOffsets(newCornerCoords)
    return {
      ...boxSizeAndOffsets,
      resizerOldCoords: resizerNewCoords,
      segmentCoords: cornerCoordsToSegmentCoords(newCornerCoords),
      cornerCoords: newCornerCoords
    }
  },
  updateBalls: () => (state, actions) => {
    const {
      ballsData,
      ballsCollisions,
      right,
      left,
      top,
      bottom,
      rightOffset,
      topOffset,
      leftOffset,
      bottomOffset
    } = state

    const updateBallCollisions = (wallIndex, segmentIndex, ballsDataIndex) => {
      // Reset ballsCollisions
      Object.keys(ballsCollisions).forEach((key) => {
        if (ballsCollisions[key] === ballsDataIndex) {
          delete ballsCollisions[key]
        }
      })
      const ballsCollisionsKey = `${wallIndex}-${segmentIndex}`
      ballsCollisions[ballsCollisionsKey] = ballsDataIndex
      const { synth, release } = ballsData[ballsDataIndex]
      const note = SCALES.IONIAN[segmentIndex]
      if (note) {
        synth.triggerAttackRelease(note, release / 1000)
      }
      window.setTimeout(() => {
        delete ballsCollisions[ballsCollisionsKey]
        actions.set({
          ballsCollisions
        })
      }, release)
    }

    // Also mutates ballsCollisions
    const newBallsData = ballsData.map((ballData, i) => {
      const { speeds, coords } = ballData
      let [xSpeed, ySpeed] = speeds
      let [x, y] = coords
      let noteIndex

      // First update speeds
      if (x >= rightOffset || x <= leftOffset) {
        noteIndex = findNoteIndex(y, top, bottom)
        xSpeed = xSpeed * -1
        if (x >= rightOffset) {
          updateBallCollisions(1, noteIndex, i)
        } else {
          updateBallCollisions(3, noteIndex, i)
        }
      }
      if (y <= topOffset || y >= bottomOffset) {
        noteIndex = findNoteIndex(x, left, right)
        ySpeed = ySpeed * -1
        if (y <= topOffset) {
          updateBallCollisions(0, noteIndex, i)
        } else {
          updateBallCollisions(2, noteIndex, i)
        }
      }

      // Then use new speeds to update coords
      if (x >= rightOffset || x <= leftOffset) {
        if (x >= rightOffset) {
          x = rightOffset - 1
        } else if (x <= leftOffset) {
          x = leftOffset + 1
        }
      } else {
        x = x + xSpeed
      }
      if (y >= bottomOffset || y <= topOffset) {
        if (y >= bottomOffset) {
          y = bottomOffset - 1
        } else if (y <= topOffset) {
          y = topOffset + 1
        }
      } else {
        y = y + ySpeed
      }

      return {
        ...ballData,
        speeds: [xSpeed, ySpeed],
        coords: [x, y]
      }
    })

    return {
      ballsData: newBallsData,
      ballsCollisions
    }
  }
}

function findNoteIndex(n, min, max) {
  return Math.floor(percentInRange(n, min, max) * SEGMENT_COUNT)
}
