import { values } from 'ramda'
import { shuffle } from '../../utils/shuffle'
import { segment } from '../../utils/segment'
import { albers } from '../../constants/colors'

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
export const COLORS = values(albers)

export const colorsLen = COLORS.length / 2
export const getColorPairs = () => segment(2, shuffle(COLORS))
