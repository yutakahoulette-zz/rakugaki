import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = `SVG animation of a grid of circles being sorted by color \
and ordered by color count`

export const colorSort2D = {
  title: 'color sort 2D',
  description,
  path: 'colorSort2D',
  date: new Date(2018, 9, 18),
  state,
  actions,
  view
}
