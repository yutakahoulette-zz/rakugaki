import { BALL_RADIUS } from './consts'
export function getBoxSizeAndOffsets(cornerCoords) {
  const [, topRight, , bottomLeft] = cornerCoords
  const [right, top] = topRight
  const [left, bottom] = bottomLeft

  const rightOffset = right - BALL_RADIUS
  const topOffset = top + BALL_RADIUS
  const leftOffset = left + BALL_RADIUS
  const bottomOffset = bottom - BALL_RADIUS
  return {
    right,
    top,
    left,
    bottom,
    rightOffset,
    topOffset,
    leftOffset,
    bottomOffset
  }
}
