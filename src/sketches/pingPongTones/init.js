import { clamp } from 'ramda'
import { Synth, JCReverb, FeedbackDelay, Chorus } from 'tone'
import { cornerCoordsToSegmentCoords } from './cornerCoordsToSegmentCoords'
import { getBoxSizeAndOffsets } from './getBoxSizeAndOffsets'
import {
  MIN_RELEASE,
  MAX_RELEASE,
  WAVES,
  MAX_SPEED,
  MAX_INITIAL_SIZE,
  MIN_INITIAL_SIZE,
  PADDING,
  INITIAL_BALL_PADDING,
  BALL_COUNT
} from './consts'
import { randomNum } from '../../utils/randomNum'
import { gainToDb } from '../../utils/gainToDb'
import { raf } from '../../utils/raf'

export const init = (actions) => {
  const { ENV = {} } = window
  const navHeight = ENV.navHeight || 0

  const width = window.innerWidth
  const controlsHeight = document.querySelector('#controls').offsetHeight
  const height = window.innerHeight - navHeight - controlsHeight

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

  const ballsData = new Array(BALL_COUNT).fill().map((_, i) => {
    const x = randomNum(
      topLeftCoords[0] + INITIAL_BALL_PADDING,
      topRightCoords[0] - INITIAL_BALL_PADDING
    )
    const y = randomNum(
      topLeftCoords[1] + INITIAL_BALL_PADDING,
      bottomLeftCoords[1] - INITIAL_BALL_PADDING
    )

    // Reverb
    const reverb = new JCReverb().toMaster()
    const reverbRoomSize = 0
    const reverbWet = 0
    reverb.roomSize.value = reverbRoomSize
    reverb.wet.value = reverbWet

    // Chorus
    const chorus = new Chorus()
    const chorusDelayTime = 2
    const chorusDepth = 0
    const chorusWet = 0
    chorus.delayTime = chorusDelayTime
    chorus.depth = chorusDepth
    chorus.wet.value = chorusWet

    // Delay
    const delay = new FeedbackDelay()
    const delayTime = 0
    const delayFeedback = 0
    const delayWet = 0
    delay.delayTime.value = delayTime
    delay.feedback.value = delayFeedback
    delay.wet.value = delayWet

    // Synth
    const wave = WAVES[i]
    const synth = new Synth({
      oscillator: { type: wave }
    }).chain(delay, chorus, reverb)
    const release = Math.floor(randomNum(MIN_RELEASE, MAX_RELEASE) / 100) * 100
    const attack = 100
    synth.envelope.attack = attack / 1000

    const volume = ['sawtooth', 'square'].includes(wave) ? 0.2 : 0.75
    const speed = (i + 1) * 2
    synth.volume.value = gainToDb(volume)

    /*
    Things that can be updated:
    - [x] attack:  0 - MAX_RELEASE_SECONDS
    - [x] release: MIN_RELEASE - MAX_RELEASE
    - detune: NORMAL_RANGE
    - [x] delayTime: NORMAL_RANGE
    - [x] delayFeedBack: NORMAL_RANGE
    - [x] delayWet: NORMAL_RANGE
    - [x] reverbRoomSize: NORMAL_RANGE 
    - [x] reverbWet: NORMAL_RANGE 
    - [x] chorusDelayTime: 2 - 20
    - [x] chorusDepth: NORMAL_RANGE
    - [x] chorusWet: NORMAL_RANGE
    - [x] volume: NORMAL_RANGE
    - [x] xSpeed: 0 - MAX_SPEED
    - [x] ySpeed: 0 - MAX_SPEED
    */

    return {
      synth,
      wave,
      attack,
      release,
      detune: 0,
      octave: 0,
      portamento: 0,
      volume,
      reverb,
      reverbRoomSize,
      reverbWet,
      delay,
      delayTime,
      delayFeedback,
      delayWet,
      chorus,
      chorusDelayTime,
      chorusDepth,
      chorusWet,
      coords: [x, y],
      xSpeed: speed,
      ySpeed: speed
    }
  })

  const boxSizeAndOffsets = getBoxSizeAndOffsets(cornerCoords)

  actions.set({
    ...boxSizeAndOffsets,
    ballsData,
    end: raf(actions.updateBalls),
    svgHeight: height,
    svgWidth: width,
    cornerCoords,
    segmentCoords
  })
}
