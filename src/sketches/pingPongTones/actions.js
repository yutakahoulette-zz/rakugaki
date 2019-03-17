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
    let newCornerCoords
    switch (resizerIndex) {
      case 0:
        // Top left
        newCornerCoords = [
          [topLeft[0] + xDiff, topLeft[1] + yDiff],
          [topRight[0], topRight[1] + yDiff],
          bottomRight,
          [bottomLeft[0] + xDiff, bottomLeft[1]]
        ]
        break
      case 1:
        // Top right
        newCornerCoords = [
          [topLeft[0], topLeft[1] + yDiff],
          [topRight[0] + xDiff, topRight[1] + yDiff],
          [bottomRight[0] + xDiff, bottomRight[1]],
          bottomLeft
        ]
        break
      case 2:
        // Bottom right
        newCornerCoords = [
          topLeft,
          [topRight[0] + xDiff, topRight[1]],
          [bottomRight[0] + xDiff, bottomRight[1] + yDiff],
          [bottomLeft[0], bottomLeft[1] + yDiff]
        ]
        break
      case 3:
        // Bottom left
        newCornerCoords = [
          [topLeft[0] + xDiff, topLeft[1]],
          topRight,
          [bottomRight[0], bottomRight[1] + yDiff],
          [bottomLeft[0] + xDiff, bottomLeft[1] + yDiff]
        ]
    }
    return {
      resizerOldCoords: resizerNewCoords,
      cornerCoords: newCornerCoords
    }
  }
}
