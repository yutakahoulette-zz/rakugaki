import { assoc, update } from 'ramda'

export const actions = {
  set: (obj) => () => obj,
  toggleCircles: (arr) => (state) => {
    const { grid } = state
    const updatedGrid = arr.reduce((acc, obj) => {
      if (!obj) {
        return acc
      }
      const { x, y } = obj
      const circle = acc[y][x]
      const updatedCircle = assoc('tilt', !circle.tilt, circle)
      const updatedRow = update(x, updatedCircle, acc[y])
      return update(y, updatedRow, acc)
    }, grid)
    return {
      grid: updatedGrid
    }
  }
}
