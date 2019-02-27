import { h } from 'hyperapp'

// Equilateral triangle
export const EqTriangle = ({
  cx,
  cy,
  pointDown,
  halfHeight,
  halfLength,
  props
}) => {
  // y value for a or c points
  const acY = cy + (pointDown ? -halfHeight : halfHeight)
  // y value for b point
  const bY = cy + (pointDown ? halfHeight : -halfHeight)

  const a = { x: cx - halfLength, y: acY }
  const b = { x: cx, y: bY }
  const c = { x: cx + halfLength, y: acY }

  const points = [a, b, c].reduce((st, { x, y }) => `${st} ${x},${y}`, '')
  return <polygon points={points} {...props} />
}
