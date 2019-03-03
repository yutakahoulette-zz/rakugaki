import { state } from './state'
import { actions } from './actions'
import { view } from './view'

const description = ` 
Clicking a segment while the looper is stopped will toggle a drone. 
Edit each totem's sounds by clicking on it's title below it. 
The pitches are half semitones and are based on the segment's area (larger means lower pitch).
Sounds created using Tone.js. Totems are SVGs.`

export const FMSynthTotems = {
  title: 'FM synth totems',
  description,
  path: 'FMSynthTotems',
  date: new Date(2019, 1, 25),
  load: true,
  state,
  actions,
  view
}
