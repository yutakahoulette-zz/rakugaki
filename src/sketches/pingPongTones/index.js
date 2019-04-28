import { state } from './state'
import { actions } from './actions'
import { view } from './view'
import { Controls } from './controls'

const description = `Untitled`

export const pingPongTones = {
  title: 'ping pong tones',
  description,
  date: new Date(1982, 11, 9),
  wip: true,
  state,
  actions,
  view
}

// TODO:
// - don't allow resizing outside of SVG
// - style controls
// - add functionality to controls
// - add resize for touch screens
