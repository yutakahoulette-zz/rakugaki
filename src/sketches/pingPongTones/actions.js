import { MIN_SIZE, SEGMENT_COUNT, SCALES, HANDLE_SIZE } from './consts'
import { cornerCoordsToSegmentCoords } from './cornerCoordsToSegmentCoords'
import { getBoxSizeAndOffsets } from './getBoxSizeAndOffsets'
import { percentInRange } from '../../utils/percentInRange'
import { Frequency } from 'tone'
import { raf } from '../../utils/raf'

export const actions = {
  get: (key) => (state) => state[key],
  set: (obj) => () => obj,
  handleResize: (resizerNewCoords) => (state) => {
    const {
      resizerOldCoords,
      resizerIndex,
      cornerCoords,
      svgWidth,
      svgHeight
    } = state
    if (!resizerOldCoords) {
      return state
    }
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
        } else {
          if (topLeft[0] <= HANDLE_SIZE) {
            xDiff = 0
          }
        }
        if (!isExpandingY) {
          if (boxHeight - yDiff <= MIN_SIZE) {
            yDiff = 0
          }
        } else {
          if (topLeft[1] <= HANDLE_SIZE) {
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
        } else {
          if (topRight[0] >= svgWidth - HANDLE_SIZE) {
            xDiff = 0
          }
        }
        if (!isExpandingY) {
          if (boxHeight - yDiff <= MIN_SIZE) {
            yDiff = 0
          }
        } else {
          if (topRight[1] <= HANDLE_SIZE) {
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
        } else {
          if (bottomRight[0] >= svgWidth - HANDLE_SIZE) {
            xDiff = 0
          }
        }
        if (!isExpandingY) {
          if (boxHeight + yDiff <= MIN_SIZE) {
            yDiff = 0
          }
        } else {
          if (bottomRight[1] >= svgHeight - HANDLE_SIZE) {
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
        } else {
          if (bottomLeft[0] <= HANDLE_SIZE) {
            xDiff = 0
          }
        }
        if (!isExpandingY) {
          if (boxHeight + yDiff <= MIN_SIZE) {
            yDiff = 0
          }
        } else {
          if (bottomLeft[1] >= svgHeight - HANDLE_SIZE) {
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
      bottomOffset,
      isMuted
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
      const { synth, release, octave } = ballsData[ballsDataIndex]
      let note = SCALES.IONIAN[segmentIndex]
      if (note) {
        if (octave) {
          note = Frequency(note).transpose(octave * 12)
        }
        if (!isMuted) {
          synth.triggerAttackRelease(note, release / 1000)
        }
      }
      window.setTimeout(() => {
        const currentBallsCollisions = actions.get('ballsCollisions')
        delete currentBallsCollisions[ballsCollisionsKey]
        actions.set({
          ballsCollisions: currentBallsCollisions
        })
      }, release)
    }

    // Also mutates ballsCollisions
    const newBallsData = ballsData.map((ballData, i) => {
      let { xSpeed, ySpeed, coords, wallIndex } = ballData
      let [x, y] = coords
      let noteIndex
      let newWallIndex

      // First update speeds
      if (x >= rightOffset || x <= leftOffset) {
        noteIndex = findNoteIndex(y, top, bottom)
        if (x >= rightOffset) {
          newWallIndex = 1
          if (wallIndex !== newWallIndex) {
            xSpeed = -Math.abs(xSpeed)
          }
        } else {
          newWallIndex = 3
          if (wallIndex !== newWallIndex) {
            xSpeed = Math.abs(xSpeed)
          }
        }
        updateBallCollisions(newWallIndex, noteIndex, i)
      }

      if (y <= topOffset || y >= bottomOffset) {
        noteIndex = findNoteIndex(x, left, right)
        if (y <= topOffset) {
          newWallIndex = 0
          if (wallIndex !== newWallIndex) {
            ySpeed = Math.abs(ySpeed)
          }
        } else {
          newWallIndex = 2
          if (wallIndex !== newWallIndex) {
            ySpeed = -Math.abs(ySpeed)
          }
        }
        updateBallCollisions(newWallIndex, noteIndex, i)
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
        wallIndex: newWallIndex != undefined ? newWallIndex : wallIndex,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        coords: [x, y]
      }
    })

    return {
      ballsData: newBallsData,
      ballsCollisions
    }
  },
  updateBallData: ({ key, val, path, prop, transform }) => ({
    editIndex,
    ballsData
  }) => {
    if (path && prop) {
      const obj = ballsData[editIndex][prop]
      const len = path.length
      path.reduce((acc, key, i) => {
        if (i === len - 1) {
          acc[key] = transform ? transform(val) : val
        }
        return acc[key]
      }, obj)
    }
    return updateBallsData({
      ballsData,
      editIndex,
      key,
      val
    })
  },
  toggleMute: () => ({ isMuted, ballsData }) => {
    if (!isMuted) {
      ballsData.forEach(({ synth }) => {
        synth.triggerRelease()
      })
    }
    return {
      isMuted: !isMuted
    }
  },
  togglePlay: () => ({ isPlaying, end, ballsData }, actions) => {
    if (isPlaying) {
      end()
      ballsData.forEach(({ synth }) => {
        synth.triggerRelease()
      })
      return {
        ballsCollisions: {},
        isPlaying: false
      }
    }
    return {
      isPlaying: true,
      end: raf(actions.updateBalls)
    }
  }
}

const updateBallsData = ({ ballsData, editIndex, key, val }) => {
  const ballData = ballsData[editIndex]
  ballData[key] = val
  ballsData[editIndex] = ballData
  return { ballsData }
}

function findNoteIndex(n, min, max) {
  return Math.floor(percentInRange(n, min, max) * SEGMENT_COUNT)
}
