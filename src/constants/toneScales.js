import { firstKeyVal } from '../utils/firstKeyVal'

export function octaveScales(scale, octaves = [3, 4]) {
  return octaves
    .map((num) => scale.map((note) => `${note}${num}`))
    .reduce((acc, arr) => [...acc, ...arr], [])
}

export const IONIAN = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

export const DORIAN = ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb']

export const PHRYGIAN = ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb']

export const LYDIAN = ['C', 'D', 'E', 'F#', 'G', 'A', 'B']

export const MIXOLYDIAN = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb']

export const AEOLIAN = ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb']

export const LOCRIAN = ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb']

export const ALL_SCALES_WITH_OCTAVES = [
  { IONIAN },
  { DORIAN },
  { PHRYGIAN },
  { LYDIAN },
  { MIXOLYDIAN },
  { AEOLIAN },
  { LOCRIAN }
].reduce((acc, scale) => {
  const [key, val] = firstKeyVal(scale)
  return {
    [key]: octaveScales(val),
    ...acc
  }
}, {})
