import { getColorPairs } from './consts'

const colorPairs = getColorPairs()
const colorPair = colorPairs[0]

export const state = {
  ends: [],
  hexProps: [],
  rotation: 0,
  colorRotation: 0,
  colorPairs,
  colorPair,
  dimensions: {
    px: {},
    unit: {}
  }
}
