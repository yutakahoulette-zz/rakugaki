import { flatten } from 'ramda'
import { Transport, Pattern, Draw, FMSynth, PingPongDelay } from 'tone'

import { getClampedDimensions } from '../../utils/getClampedDimensions'
import { randomNum } from '../../utils/randomNum'
import { randomElm } from '../../utils/randomElm'
import { toHertz } from '../../utils/toHertz'
import { percentInRange } from '../../utils/percentInRange'
import { polygonArea } from '../../utils/polygonArea'
import { gainToDb } from '../../utils/gainToDb'
import {
  BPM,
  SIZE,
  COUNT,
  DEVI,
  MIN_PITCH,
  PITCH_RANGE,
  MAX_SIZE,
  PADDING,
  MIN_WIDTH,
  WAVES
} from './consts'

export const init = (actions) => {
  const offsetY = document.querySelector('#controls').offsetHeight + PADDING
  const dimensions = getClampedDimensions({
    maxSize: MAX_SIZE,
    offsetX: 0,
    offsetY
  })
  const { width, height } = dimensions.px
  const segments = Math.floor(width / COUNT)

  const coordStacks = new Array(COUNT).fill().map((_, i) => {
    const minWidth = segments * i
    const maxWidth = segments * (i + 1)
    return createStack({ minWidth, maxWidth, height })
  })

  const areas2d = coordStacks.map((stack) =>
    stack.map((coords) => polygonArea(coords))
  )

  const { minArea, maxArea } = flatten(areas2d).reduce(
    ({ minArea, maxArea }, area, i) => {
      if (area >= maxArea) {
        maxArea = area
      }
      if (i === 0) {
        minArea = area
      } else if (area <= minArea) {
        minArea = area
      }
      return { minArea, maxArea }
    },
    { minArea: 0, maxArea: 0 }
  )

  const pitchStacks = areas2d.map((areas) =>
    areas.map((area) => {
      // Returns a number between 0 - 1
      // Inverting the percent so that larger areas have lower pitches
      const percent = 1 - percentInRange(area, minArea, maxArea)
      // Shift the number so that 0 is MIN_PITCH and 1 is MAX_PITCH
      // which represents the upper/lower bounds of pitch
      const pitch = Math.ceil((percent * PITCH_RANGE + MIN_PITCH) * 5) / 5
      return toHertz(pitch)
    })
  )

  const toneStacks = pitchStacks.map((notes, i) =>
    createSequences(i, notes, actions)
  )

  toneStacks.forEach(({ pattern }) => pattern.start())

  Transport.bpm.value = BPM

  const playingIndexes = toneStacks.map(() => null)

  actions.set({
    width,
    height,
    coordStacks,
    toneStacks,
    playingIndexes,
    Transport,
    bpm: BPM,
    swing: 0
  })
}

const createSequences = (i, notes, actions) => {
  const oscillator = randomElm(WAVES)
  const modulation = randomElm(WAVES)

  const delay = new PingPongDelay().toMaster()
  const synth = new FMSynth({
    oscillator: { type: oscillator },
    modulation: { type: modulation }
  }).connect(delay)

  const patternStyle = 'up'
  const pattern = new Pattern(
    function(time, note) {
      actions.playPatternNote({
        note,
        time,
        stackIndex: i
      })
      const patternIndex = pattern.index
      Draw.schedule(() => {
        actions.setPlayingIndex({ stackIndex: i, patternIndex })
      }, time)
    },
    notes,
    patternStyle
  )

  const interval = randomElm([1, 2, 4]) * randomElm([1, 2, 4])
  pattern.interval = `${interval}n`

  const feedback = randomNum(1, 99) / 100
  const delayTime = 0
  delay.feedback.value = feedback
  delay.delayTime.value = delayTime

  const volume = 0.5
  const portamento = 0
  const detune = 0
  const release = 0.05
  synth.volume.value = gainToDb(volume)

  return {
    pattern,
    notes,
    patternStyle,
    interval,
    delay,
    detune,
    delayTime,
    feedback,
    synth,
    oscillator,
    modulation,
    harmonicity: synth.harmonicity.value,
    modulationIndex: synth.modulationIndex.value,
    release,
    volume,
    portamento
  }
}

// Used for creating random variations in the
// in the shapes of the blocks
const getSize = () => {
  return randomNum(SIZE - DEVI, SIZE + DEVI)
}

const transformXY = (arr, xTrans, yTrans) => {
  const [x, y] = arr
  return [x + xTrans, y + yTrans]
}

const createSquarePoints = (bottomPoints) => {
  const [p1, p2] = bottomPoints
  const bottomXLen = p2[0] - p1[0]
  // Devi is short for deviation
  const p3XDevi = randomNum(bottomXLen <= SIZE ? MIN_WIDTH : -DEVI, DEVI)
  const p3YDevi = -getSize() * 2
  const p3 = transformXY(p2, p3XDevi, p3YDevi)
  const p4x = bottomXLen + p3XDevi * 2
  const p4 = transformXY(p3, -p4x, 0)
  return [p1, p2, p3, p4, p1]
}

const createStack = ({ minWidth, maxWidth, height }) => {
  // Create varrying max height for stacks
  const maxDistanceFromTop = randomNum(SIZE * 2, height / 3)

  const stackUntilTallEnough = (stack, bottomPoints) => {
    const squarePoints = createSquarePoints(bottomPoints)
    const [p3, p2] = [3, 2].map((x) => squarePoints[x])
    const topPoints = [p3, p2]
    const distanceToTop = p3[1]
    if (distanceToTop <= maxDistanceFromTop) {
      return stack
    }
    stack.push(squarePoints)
    // Call recursively until the stack is tall enough
    return stackUntilTallEnough(stack, topPoints)
  }

  const size = getSize()
  const halfSize = size / 2
  const segment = maxWidth - minWidth
  const initialX = Math.floor(segment / 2 + minWidth - halfSize)
  const initialBottomPoints = [
    [initialX + 1, height - 2],
    [initialX + size + 1, height - 2]
  ]

  return stackUntilTallEnough([], initialBottomPoints)
}
