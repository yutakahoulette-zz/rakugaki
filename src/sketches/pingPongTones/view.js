import { h } from 'hyperapp'
import picostyle from 'picostyle'
import { init } from './init'
import { coordsToPoints } from '../../utils/coordsToPoints'
import {
  STROKE_WIDTH,
  HALF_STROKE_WIDTH,
  HANDLE_OFFSET,
  HANDLE_SIZE
} from './consts'

const style = picostyle(h)

const Container = style('div')({
  margin: 'auto'
})

const Wrapper = style('div')({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  display: 'flex'
})

function segments(segmentCoords) {
  const groups = segmentCoords.map((coordPairs, i) => {
    const polylines = coordPairs.map((coords, ii) => {
      const points = coordsToPoints(coords)
      const stroke = 'black'
      return (
        <polyline
          stroke={stroke}
          stroke-width={STROKE_WIDTH}
          stroke-linecap="square"
          key={`${i}:${ii}`}
          points={points}
        />
      )
    })
    return <g>{polylines}</g>
  })
  return <g>{groups}</g>
}

function handles(cornerCoords) {
  const [
    topLeftCoords,
    topRightCoords,
    bottomRightCoords,
    bottomLeftCoords
  ] = cornerCoords
  const topLeftRect = (
    <rect
      x={topLeftCoords[0] - HANDLE_OFFSET}
      y={topLeftCoords[1] - HANDLE_OFFSET}
      width={HANDLE_SIZE}
      height={HANDLE_SIZE}
    />
  )
  const topRightRect = (
    <rect
      x={topRightCoords[0] - HALF_STROKE_WIDTH}
      y={topRightCoords[1] - HANDLE_OFFSET}
      width={HANDLE_SIZE}
      height={HANDLE_SIZE}
    />
  )
  const bottomRightRect = (
    <rect
      x={bottomRightCoords[0] - HALF_STROKE_WIDTH}
      y={bottomRightCoords[1] - HALF_STROKE_WIDTH}
      width={HANDLE_SIZE}
      height={HANDLE_SIZE}
    />
  )
  const bottomLeftRect = (
    <rect
      x={bottomLeftCoords[0] - HANDLE_OFFSET}
      y={bottomLeftCoords[1] - HALF_STROKE_WIDTH}
      width={HANDLE_SIZE}
      height={HANDLE_SIZE}
    />
  )
  const rects = [topLeftRect, topRightRect, bottomRightRect, bottomLeftRect]
  return <g>{rects}</g>
}

export function view(state, actions) {
  const { segmentCoords, cornerCoords, width, height } = state
  const bottomOffset = (ENV.navHeight || 0) + 'px'
  const style = {
    bottom: bottomOffset
  }
  return (
    <Wrapper style={style}>
      <Container
        oncreate={() => {
          init(actions)
        }}
        ondestroy={() => {}}
      >
        <svg width={width} height={height}>
          {segments(segmentCoords)}
          {handles(cornerCoords)}
        </svg>
      </Container>
    </Wrapper>
  )
}
