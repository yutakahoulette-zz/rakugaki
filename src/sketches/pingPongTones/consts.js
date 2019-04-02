import { LEAF, PINK, POLLEN } from '../../constants/colors'
import { IONIAN } from '../../constants/toneScales'

export const BASE = 24
export const STROKE_WIDTH = 3
export const HALF_STROKE_WIDTH = STROKE_WIDTH / 2
export const MAX_INITIAL_SIZE = BASE * 12
export const MIN_INITIAL_SIZE = BASE * 8
export const MIN_SIZE = BASE
export const HANDLE_SIZE = 16
export const PADDING = HANDLE_SIZE * 3
export const SEGMENT_COUNT = IONIAN.length
export const HANDLE_OFFSET = HANDLE_SIZE - STROKE_WIDTH / 2
export const BALL_RADIUS = 5
export const INITIAL_BALL_PADDING = BALL_RADIUS * 6
export const BALL_COUNT = 3
export const COLORS = [LEAF, PINK, POLLEN]
export const SCALES = {
  IONIAN
}
