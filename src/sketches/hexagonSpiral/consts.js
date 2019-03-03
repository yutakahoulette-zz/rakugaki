import { values } from 'ramda'
import { ALBERS } from '../../constants/colors'

export const LENGTH = 32
export const HALF_LENGTH = LENGTH / 2
export const HEIGHT = LENGTH * (Math.sqrt(3) / 2)
export const HALF_HEIGHT = HEIGHT / 2
export const MAX_SIZE = LENGTH * 16
export const DIRECTIONS = [
  'upRight',
  'right',
  'downRight',
  'downLeft',
  'left',
  'upLeft'
]

export const COLORS = values(ALBERS)
export const COLORS_LEN = COLORS.length / 2
