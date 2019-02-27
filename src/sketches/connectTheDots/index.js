import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = `An SVG pen tool thing with limited/random features. 
The curves are quadractic Bezier curves.`

export const connectTheDots = {
  title: 'connect the dots',
  description,
  path: 'connectTheDots',
  date: new Date(2018, 11, 22),
  noTouch: true,
  state,
  actions,
  view
}
