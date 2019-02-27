import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = `An SVG animation of a hexagon comprised of spiraling equilateral triangles.`

export const hexagonSpiral = {
  title: 'hexagon spiral',
  description,
  path: 'hexagonSpiral',
  date: new Date(2018, 10, 12),
  state,
  actions,
  view
}
