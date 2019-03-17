import { last } from 'ramda'
import { SEGMENT_COUNT } from './consts'

function cornerCoordsToLineCoords(cornerCoords) {
  const [
    topLeftCoords,
    topRightCoords,
    bottomRightCoords,
    bottomLeftCoords
  ] = cornerCoords
  return [
    [topLeftCoords, topRightCoords],
    [topRightCoords, bottomRightCoords],
    [bottomLeftCoords, bottomRightCoords],
    [topLeftCoords, bottomLeftCoords]
  ]
}

function getDifference(a, b) {
  return Math.abs(a - b)
}

function lineCoordsToSegmentCoords(coords) {
  const [[startX, startY], [endX, endY]] = coords
  const xDistance = getDifference(startX, endX)
  const yDistance = getDifference(startY, endY)
  const segmentWidth = xDistance / SEGMENT_COUNT
  const segmentHeight = yDistance / SEGMENT_COUNT
  return new Array(SEGMENT_COUNT + 1).fill().reduce((acc, _, i) => {
    const x = startX + segmentWidth * i
    const y = startY + segmentHeight * i
    const coords = [x, y]
    const prev = last(acc)
    if (i === 0) {
      return [[coords]]
    } else {
      prev.push(coords)
      if (i === SEGMENT_COUNT) {
        return acc
      }
      return [...acc, [coords]]
    }
  }, [])
}

export function cornerCoordsToSegmentCoords(cornerCoords) {
  const lineCoords = cornerCoordsToLineCoords(cornerCoords)
  return lineCoords.map(lineCoordsToSegmentCoords)
}
