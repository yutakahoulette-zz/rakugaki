import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = `An interactive SVG animation of balls bouncing in a box, which emit 
sounds whenever a ball hits a wall. Each wall is divided into 12 segments, 
which each represent a note in the selected scale. The sounds and movement can be edited 
for each ball, and the box can be resized by dragging the square handles in the corners. Sounds 
created using Tone.js.`

export const pingPongTones = {
  title: 'ping pong tones',
  description,
  date: new Date(2019, 4, 3),
  path: 'pingPongTones',
  state,
  actions,
  view
}
