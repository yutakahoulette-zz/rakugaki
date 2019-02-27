export const reflectPoints = (a = [], b = []) => {
  const [x1, y1] = a
  const [x2, y2] = b
  const mirrorX = x1 - (x2 - x1)
  const mirrorY = y1 - (y2 - y1)
  return [mirrorX, mirrorY]
}
