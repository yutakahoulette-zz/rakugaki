import { clamp } from 'ramda'

const MAX_INITIAL_SIZE = 24 * 24
const MIN_INITIAL_SIZE = 24 * 8
const HANDLE_SIZE = 16
const PADDING = HANDLE_SIZE * 3

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

  const padCoords = (coords) => coords.map(([x, y]) => [padX(x), padY(y)])

  //                topCoords
  //              ------------
  //              |          |
  //   leftCoords |          | rightCoords
  //              |          |
  //              ------------
  //              bottomCoords

  const topCoords = padCoords([
    [midX - midXWidth, midY - midYHeight],
    [midX + midXWidth, midY - midYHeight]
  ])
  const bottomCoords = padCoords([
    [midX - midXWidth, midY + midYHeight],
    [midX + midXWidth, midY + midYHeight]
  ])
  const leftCoords = padCoords([
    [midX - midXWidth, midY - midYHeight],
    [midX - midXWidth, midY + midYHeight]
  ])
  const rightCoords = padCoords([
    [midX + midXWidth, midY - midYHeight],
    [midX + midXWidth, midY + midYHeight]
  ])

  actions.set({
    height,
    width,
    boxCoords: {
      top: topCoords,
      bottom: bottomCoords,
      left: leftCoords,
      right: rightCoords
    }
  })
}
