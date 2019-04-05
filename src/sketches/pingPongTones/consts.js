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
export const MAX_RELEASE = 10000
export const MAX_SPEED = 10
export const PADDING = HANDLE_SIZE * 3
export const SEGMENT_COUNT = ionian.length
export const HANDLE_OFFSET = HANDLE_SIZE - STROKE_WIDTH / 2
export const BALL_RADIUS = 6
export const INITIAL_BALL_PADDING = BALL_RADIUS * 6
export const COLORS = [LEAF, RUST, PINK, POLLEN]
export const BALL_COUNT = COLORS.length
export const WAVES = ['square', 'sawtooth', 'triangle', 'sine']
export const WAVES_ABBR = ['sqr', 'saw', 'tri', 'sin']
export const SCALES = {
  IONIAN: ionian
}
