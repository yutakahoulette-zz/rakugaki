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
import { getClientXY } from '../../utils/getClientXY'

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

const handlePartial = ({ actions, state, coords, i }) => ({
  xOffset,
  yOffset
}) => {
  const [x, y] = coords
  const { resizerOldCoords } = state
  return (
    <rect
      x={x - xOffset}
      y={y - yOffset}
      onmousedown={(ev) => {
        ev.preventDefault()
        actions.set({
          resizerOldCoords: getClientXY(ev),
          resizerIndex: i
        })
      }}
      width={HANDLE_SIZE}
      height={HANDLE_SIZE}
    />
  )
}

function handles({ actions, state }) {
  const { cornerCoords } = state
  const rects = cornerCoords.map((coords, i) => {
    const handle = handlePartial({ actions, state, coords, i })
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
  const { segmentCoords, resizerOldCoords, width, height } = state
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
        <svg
          width={width}
          height={height}
          onmouseup={(ev) => {
            ev.preventDefault()
            actions.set({
              resizerOldCoords: undefined
            })
          }}
          onmousemove={(ev) => {
            ev.preventDefault()
            if (resizerOldCoords === undefined) {
              return
            }
            actions.handleResize(getClientXY(ev))
          }}
        >
          {segments(segmentCoords)}
          {handles({ actions, state })}
        </svg>
      </Container>
    </Wrapper>
  )
}
