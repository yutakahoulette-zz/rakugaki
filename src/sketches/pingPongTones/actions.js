import { cornerCoordsToSegmentCoords } from './cornerCoordsToSegmentCoords'

export const actions = {
  set: (obj) => () => obj,
  handleResize: (resizerNewCoords) => ({
    resizerOldCoords,
    resizerIndex,
    cornerCoords
  }) => {
    const xDiff = resizerNewCoords[0] - resizerOldCoords[0]
    const yDiff = resizerNewCoords[1] - resizerOldCoords[1]

    const [topLeft, topRight, bottomRight, bottomLeft] = cornerCoords
    const [topLeftX, topLeftY] = topLeft
    const [topRightX, topRightY] = topRight
    const [bottomRightX, bottomRightY] = bottomRight
    const [bottomLeftX, bottomLeftY] = bottomLeft

    let newCornerCoords = []
    switch (resizerIndex) {
      case 0:
        // Top left
        newCornerCoords = [
          [topLeftX + xDiff, topLeftY + yDiff],
          [topRightX, topRightY + yDiff],
          bottomRight,
          [bottomLeftX + xDiff, bottomLeftY]
        ]
        break
      case 1:
        // Top right
        newCornerCoords = [
          [topLeftX, topLeftY + yDiff],
          [topRightX + xDiff, topRightY + yDiff],
          [bottomRightX + xDiff, bottomRight[1]],
          bottomLeft
        ]
        break
      case 2:
        // Bottom right
        newCornerCoords = [
          topLeft,
          [topRightX + xDiff, topRightY],
          [bottomRightX + xDiff, bottomRightY + yDiff],
          [bottomLeftX, bottomLeftY + yDiff]
        ]
        break
      case 3:
        // Bottom left
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
  }
}
