import { clamp, compose, chain, splitEvery, drop, dropLast, last } from 'ramda'
import {
  MAX_INITIAL_SIZE,
  MIN_INITIAL_SIZE,
  PADDING,
  SEGMENT_COUNT
} from './consts'

const first = (arr) => arr[0]

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

  //                topCoords
  //              ------------
  //              |          |
  //   leftCoords |          | rightCoords
  //              |          |
  //              ------------
  //              bottomCoords
  const topCoords = [
    [midX - midXWidth, midY - midYHeight],
    [midX + midXWidth, midY - midYHeight]
  ]
  const leftCoords = [
    [midX - midXWidth, midY - midYHeight],
    [midX - midXWidth, midY + midYHeight]
  ]
  const bottomCoords = [
    [midX - midXWidth, midY + midYHeight],
    [midX + midXWidth, midY + midYHeight]
  ]
  const rightCoords = [
    [midX + midXWidth, midY - midYHeight],
    [midX + midXWidth, midY + midYHeight]
  ]

  const segmentCoords = [topCoords, rightCoords, leftCoords, bottomCoords]
    .map(padCoords({ height, width }))
    .map(toSegements)
    .map(toPairs)

  const cornerCoords = [
    compose(
      first,
      first,
      first
    )(segmentCoords), // Top left
    compose(
      last,
      last,
      first
    )(segmentCoords), // Top right
    compose(
      last,
      last,
      last
    )(segmentCoords), // Bottom right
    compose(
      first,
      first,
      last
    )(segmentCoords) // Bottom left
  ]

  actions.set({
    height,
    width,
    cornerCoords,
    segmentCoords
  })
}

function padCoords({ height, width }) {
  return (coords) => {
    const padY = clamp(PADDING, height - PADDING)
    const padX = clamp(PADDING, width - PADDING)
    return coords.map(([x, y]) => [padX(x), padY(y)])
  }
}

function getDifference(a, b) {
  return Math.abs(a - b)
}

function toSegements(coords) {
  const [[startX, startY], [endX, endY]] = coords
  const xDistance = getDifference(startX, endX)
  const yDistance = getDifference(startY, endY)
  const segmentWidth = xDistance / SEGMENT_COUNT
  const segmentHeight = yDistance / SEGMENT_COUNT
  return new Array(SEGMENT_COUNT + 1).fill().map((_, i) => {
    const x = startX + segmentWidth * i
    const y = startY + segmentHeight * i
    return [x, y]
  })
}

function toPairs(coords) {
  return compose(
    splitEvery(2),
    dropLast(1),
    drop(1),
    chain((n) => [n, n])
  )(coords)
}
