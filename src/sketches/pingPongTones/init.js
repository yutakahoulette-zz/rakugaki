import { clamp, compose, chain, splitEvery, drop, dropLast } from 'ramda'

const MAX_INITIAL_SIZE = 24 * 24
const MIN_INITIAL_SIZE = 24 * 8
const HANDLE_SIZE = 16
const PADDING = HANDLE_SIZE * 3
const SEGMENT_COUNT = 12

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

  const segmentCoords = [topCoords, bottomCoords, leftCoords, rightCoords]
    .map(padCoords({ height, width }))
    .map(toSegements)
    .map(toPairs)

  actions.set({
    height,
    width,
    segmentCoords,
    boxCoords: {
      top: topCoords,
      left: leftCoords,
      bottom: bottomCoords,
      right: rightCoords
    }
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
