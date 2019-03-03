import { SHAKE_MAX } from './consts'
import { ALBERS } from '../../constants/colors'

const defaultColor = ALBERS[Object.keys(ALBERS)[0]]

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
  enders: [],
  isLoading: true
}
