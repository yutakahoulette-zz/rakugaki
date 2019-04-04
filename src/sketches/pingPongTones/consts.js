import { LEAF, PINK, POLLEN, RUST } from '../../constants/colors'
import { IONIAN, octaveScales } from '../../constants/toneScales'

const [ionian] = [IONIAN].map((scale) => octaveScales(scale))

const BASE = 24

export const STROKE_WIDTH = 4
export const HALF_STROKE_WIDTH = STROKE_WIDTH / 2
export const MAX_INITIAL_SIZE = BASE * 16
export const MIN_INITIAL_SIZE = BASE * 8
export const MIN_SIZE = BASE
export const HANDLE_SIZE = 16
export const MIN_RELEASE = 100
export const MAX_RELEASE = 3000
export const MAX_RELEASE_SECONDS = 3000 / 1000
export const MAX_SPEED = 8
export const PADDING = HANDLE_SIZE * 3
export const SEGMENT_COUNT = ionian.length
export const HANDLE_OFFSET = HANDLE_SIZE - STROKE_WIDTH / 2
export const BALL_RADIUS = 6
export const INITIAL_BALL_PADDING = BALL_RADIUS * 6
export const COLORS = [LEAF, PINK, POLLEN, RUST]
export const BALL_COUNT = COLORS.length
export const WAVES = ['square', 'triangle', 'sine', 'sawtooth']
export const WAVES_ABBR = ['sqr', 'tri', 'sin', 'saw']
export const SCALES = {
  IONIAN: ionian
}
