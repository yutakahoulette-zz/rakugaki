import { albers } from '../../constants/colors'
import { SHAKE_MAX } from './consts'

const defaultColor = albers[Object.keys(albers)[0]]

export const state = {
  color: defaultColor,
  clickIndex: 0,
  dimensions: {
    px: {},
    unit: {}
  },
  fill: false,
  grid: [],
  isDrawing: false,
  isEvenClick: true,
  isShaking: false,
  points: [],
  previewPoints: [],
  savedPoints: [],
  shakeLevel: Math.floor(SHAKE_MAX / 2),
  enders: []
}
