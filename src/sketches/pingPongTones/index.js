import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = `Untitled`

// - draw box with 12 steps
// - boxes should have min size of 16px
// - make box resizable from 4 corners

// - add bouncing ball in box
// - ball should have radius of 2
// - make sure ball stays in box even when box is resized
// - add 3 more balls, each a different color

// - assign a note to each segement
// - assign an synth to each ball
// - have the synth play the note that it hits

// - add global controls:
// - scale for the notes (major, minor, penta, etc...)
// - volume

// - add synth controls:
// - wave
// - volume
// - delay
// - reverb
// - detune
// - envelope

export const pingPongTones = {
  title: 'ping pong tones',
  description,
  date: new Date(1982, 11, 9),
  wip: true,
  state,
  actions,
  view
}
