// https://en.wikipedia.org/wiki/Scientific_pitch_notation
// Takes semitone (n) and returns a frequency in hertz
// 0 is middle C
export const toHertz = (n) => 440 * Math.pow(2, (n - 9) / 12)
