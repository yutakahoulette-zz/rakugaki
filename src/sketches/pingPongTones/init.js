import { clamp } from 'ramda'
import { Synth, Freeverb } from 'tone'
import { cornerCoordsToSegmentCoords } from './cornerCoordsToSegmentCoords'
import { getBoxSizeAndOffsets } from './getBoxSizeAndOffsets'
import {
  MIN_RELEASE,
  MAX_RELEASE,
  MAX_SPEED,
  MAX_INITIAL_SIZE,
  MIN_INITIAL_SIZE,
  PADDING,
  INITIAL_BALL_PADDING,
  BALL_COUNT
} from './consts'
import { randomNum } from '../../utils/randomNum'
import { randomElm } from '../../utils/randomElm'
import { raf } from '../../utils/raf'

export const init = (actions) => {
  const { ENV = {} } = window
  const navHeight = ENV.navHeight || 0
  const width = window.innerWidth
  const height = window.innerHeight - navHeight

  const midX = width / 2
  const midY = height / 2

  const [xWidth, yHeight] = [width, height].map(
    clamp(MIN_INITIAL_SIZE, MAX_INITIAL_SIZE)
  )

  const midXWidth = xWidth / 2
  const midYHeight = yHeight / 2

  const padY = clamp(PADDING, height - PADDING)
  const padX = clamp(PADDING, width - PADDING)
  const padCoords = ([x, y]) => [padX(x), padY(y)]

  const topLeftCoords = padCoords([midX - midXWidth, midY - midYHeight])
  const topRightCoords = padCoords([midX + midXWidth, midY - midYHeight])
  const bottomRightCoords = padCoords([midX + midXWidth, midY + midYHeight])
  const bottomLeftCoords = padCoords([midX - midXWidth, midY + midYHeight])

  const cornerCoords = [
    topLeftCoords,
    topRightCoords,
    bottomRightCoords,
    bottomLeftCoords
  ]

  const segmentCoords = cornerCoordsToSegmentCoords(cornerCoords)

  const ballsData = new Array(BALL_COUNT).fill().map(() => {
    const x = randomNum(
      topLeftCoords[0] + INITIAL_BALL_PADDING,
      topRightCoords[0] - INITIAL_BALL_PADDING
    )
    const y = randomNum(
      topLeftCoords[1] + INITIAL_BALL_PADDING,
      bottomLeftCoords[1] - INITIAL_BALL_PADDING
    )
    const reverb = new Freeverb().toMaster()
    const dampening = 1000
    reverb.dampening.value = dampening
    const wave = randomElm(['triangle', 'square', 'sine'])
    const synth = new Synth({
      oscillator: { type: wave }
    }).chain(reverb)
    const release = randomNum(MIN_RELEASE, MAX_RELEASE)
    return {
      synth,
      reverb,
      dampening,
      wave,
      release,
      coords: [x, y],
      speeds: [Math.random() * MAX_SPEED, Math.random() * MAX_SPEED]
    }
  })

  const boxSizeAndOffsets = getBoxSizeAndOffsets(cornerCoords)
  actions.set({
    ...boxSizeAndOffsets,
    ballsData,
    svgHeight: height,
    svgWidth: width,
    cornerCoords,
    segmentCoords
  })
  window.setInterval(actions.updateBalls, 100)
  // raf(actions.updateBalls)
}
