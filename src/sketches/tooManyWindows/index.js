import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = `Some movable, resizable "stickies" containing the opening 
lyrics of "Once in a Lifetime"`

export const tooManyWindows = {
  title: 'too many windows',
  description,
  date: new Date(2019, 0, 1),
  path: 'tooManyWindows',
  state,
  actions,
  view
}
