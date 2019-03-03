import { update } from 'ramda'

import { swapProps } from '../../utils/swapProps'
import { getElmFrom2dArray } from '../../utils/getElmFrom2dArray'

const updateRow = ({ x, y, circle, grid }) => update(x, circle, grid[y])
const updateGrid = ({ y, row, grid }) => update(y, row, grid)

export const actions = {
  set: (obj) => () => obj,
  getState: () => (state) => state,
  pushEnd: (end) => ({ ends }) => ({
    ends: [].concat(ends, end)
  }),
  endAll: () => ({ ends }) => {
    ends.map((fn) => fn())
    return { ends: [] }
  },
  swapPhysicalLocation: ({ a, b }) => (state) => {
    const { grid } = state
    const aCircle = getElmFrom2dArray(a, grid)
    const bCircle = getElmFrom2dArray(b, grid)
    const updatedCircles = swapProps({
      a: aCircle,
      b: bCircle,
      props: ['cx', 'cy']
    })
    const aCircleUpdated = updatedCircles.a
    const bCircleUpdated = updatedCircles.b
    bCircleUpdated.transition = true
    aCircleUpdated.transition = true
    const aRow = updateRow({ x: a.x, y: a.y, circle: aCircleUpdated, grid })
    const aGrid = updateGrid({ y: a.y, row: aRow, grid })
    const bRow = updateRow({
      x: b.x,
      y: b.y,
      circle: bCircleUpdated,
      grid: aGrid
    })
    const bGrid = updateGrid({ y: b.y, row: bRow, grid: aGrid })
    return { grid: bGrid }
  },
  swapArrayLocation: ({ a, b }) => (state) => {
    const { grid } = state
    const aCircle = getElmFrom2dArray(a, grid)
    const bCircle = getElmFrom2dArray(b, grid)
    aCircle.transition = false
    bCircle.transition = false
    const aRow = updateRow({ x: a.x, y: a.y, circle: bCircle, grid })
    const aGrid = updateGrid({ y: a.y, row: aRow, grid })
    const bRow = updateRow({
      x: b.x,
      y: b.y,
      circle: aCircle,
      grid: aGrid
    })
    const bGrid = updateGrid({ y: b.y, row: bRow, grid: aGrid })
    return { grid: bGrid }
  }
}
