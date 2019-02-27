import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = `Click or click and drag on any circle to create an 'X' shaped wave effect.`

export const gridXWave = {
  title: 'grid X wave',
  description,
  path: 'gridXWave',
  date: new Date(2018, 9, 15),
  state,
  actions,
  noTouch: true,
  view
}
