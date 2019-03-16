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

const handlePartial = (coords) => ({ xOffset, yOffset }) => {
  const [x, y] = coords
  return (
    <rect
      x={x - xOffset}
      y={y - yOffset}
      width={HANDLE_SIZE}
      height={HANDLE_SIZE}
    />
  )
}

function handles(cornerCoords) {
  const rects = cornerCoords.map((coords, i) => {
    const handle = handlePartial(coords)
    switch (i) {
      case 0:
        // Top left
        return handle({
          xOffset: HANDLE_OFFSET,
          yOffset: HANDLE_OFFSET
        })
      case 1:
        // Top right
        return handle({
          xOffset: HALF_STROKE_WIDTH,
          yOffset: HANDLE_OFFSET
        })
      case 2:
        // Bottom right
        return handle({
          xOffset: HALF_STROKE_WIDTH,
          yOffset: HALF_STROKE_WIDTH
        })
      case 3:
        // Bottom left
        return handle({
          xOffset: HANDLE_OFFSET,
          yOffset: HALF_STROKE_WIDTH
        })
    }
  })
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
