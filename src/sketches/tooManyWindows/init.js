import { PADDING, COLORS, MIN_SIZE } from './consts'
import { randomNum } from '../../utils/randomNum'

export function init(actions) {
  const maxHeight = window.innerHeight - ENV.navHeight - ENV.disclaimerHeight
  const maxWidth = window.innerWidth
  const halfWidth = maxWidth / 2
  const halfHeight = maxHeight / 2
  const windosData = COLORS.map((background, i) => {
    const x = randomNum(PADDING, halfWidth)
    const y = randomNum(PADDING, halfHeight)
    const width = randomNum(MIN_SIZE, halfWidth - PADDING)
    const height = randomNum(MIN_SIZE, halfHeight - PADDING)
    return {
      zIndex: i,
      x,
      y,
      width,
      height,
      background
    }
  })
  actions.set({
    windosData
  })
}
