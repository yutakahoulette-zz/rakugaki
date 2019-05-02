import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = `Untitled`

export const pingPongTones = {
  title: 'ping pong tones',
  description,
  date: new Date(1982, 11, 9),
  state,
  actions,
  view
}

// TODO:
// - add resize for touch screens
