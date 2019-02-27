import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const title = 'oscillating etch a sketch'
const description = `An SVG polyline drawing an oscillating triangle wave. 
Adjusting the parameters can reveal op-art-like patterns.`

export const oscillatingEtchASketch = {
  title,
  description,
  date: new Date(2018, 10, 24),
  path: 'oscillatingEtchASketch',
  state,
  actions,
  view
}
