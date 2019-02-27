import { blankGrid } from './createGrid'

export const actions = {
  getState: () => (state) => state,
  set: (obj) => () => obj,
  pushEnd: (end) => ({ ends }) => {
    return {
      ends: [].concat(ends, end)
    }
  },
  clearGrid: () => ({ dimensions }) => {
    return {
      grid: blankGrid(dimensions)
    }
  },
  endAll: () => ({ ends }) => {
    ends.map((fn) => fn())
    return { ends: [] }
  },
  play: ({ chars }) => ({ grid, dimensions }) => {
    const gridLength = dimensions.unit.width
    let gridCopy = [].concat(grid)
    const charsLength = chars.length
    const padding = gridLength - charsLength + 1

    for (let y = 0; y < charsLength; y++) {
      const col = chars[y]
      const colLength = col.length
      const gridCol = gridCopy[y + padding]
      if (gridCol) {
        for (let x = 0; x < colLength; x++) {
          const val = col[x]
          const objCopy = gridCol[x + 1]
          objCopy.val = val
          gridCopy[y + padding][x + 1] = objCopy
        }
      }
    }

    return {
      grid: gridCopy
    }
  }
}
