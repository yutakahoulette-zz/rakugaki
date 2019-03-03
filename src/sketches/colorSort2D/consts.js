import { values } from 'ramda'
import { ALBERS } from '../../constants/colors'

export const BASE = 16
export const MAX_SIZE = BASE * 27
export const UNIT_SIZE = BASE * 2
export const UNIT_SIZE_HALF = UNIT_SIZE / 2
export const MS = 350
export const RADIUS = UNIT_SIZE_HALF * 0.8
export const COLORS = values(ALBERS)
