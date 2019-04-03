export function octaveScales(scale, octaves = [3, 4]) {
  return octaves
    .map((num) => scale.map((note) => `${note}${num}`))
    .reduce((acc, arr) => [...acc, ...arr], [])
}

export const IONIAN = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// const dorian =
// C, D, Eb, F, G, A, Bb

// const phrygian =

// C, Db, Eb, F, G, Ab, Bb

// const lydian =
// C, D, E, F#, G, A, B

// const mixolydian =
// C, D, E, F, G, A, Bb

// const aeolian

// C, D, Eb, F, G, Ab, Bb

// const locrian

// C, Db, Eb, F, Gb, Ab, Bb
