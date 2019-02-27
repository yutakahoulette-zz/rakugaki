import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = `A dot matrix style marquee created with SVG circles. 
The default text are random Ozu Yasujiro movie titles.`

export const marquee = {
  title: 'marquee',
  description,
  date: new Date(2018, 9, 30),
  path: 'marquee',
  state,
  actions,
  view
}
