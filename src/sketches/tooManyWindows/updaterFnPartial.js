export const updaterFnPartial = ({ data }) => ({
  updateY,
  updateX,
  updateWidth,
  updateHeight
}) => ({ yDifference, xDifference }) => {
  const { width, height, x, y } = data
  return {
    y: updateY ? updateY({ y, yDifference }) : y,
    x: updateX ? updateX({ x, xDifference }) : x,
    width: updateWidth ? updateWidth({ width, xDifference }) : width,
    height: updateHeight ? updateHeight({ height, yDifference }) : height
  }
}
