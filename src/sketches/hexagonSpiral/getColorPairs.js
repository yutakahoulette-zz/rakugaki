import { COLORS } from './consts'

import { shuffle } from '../../utils/shuffle'
import { segment } from '../../utils/segment'

export const getColorPairs = () => segment(2, shuffle(COLORS))
