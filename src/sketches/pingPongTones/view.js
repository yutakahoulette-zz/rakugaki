import { h } from 'hyperapp'
import picostyle from 'picostyle'
import { init } from './init'
import { coordsToPoints } from '../../utils/coordsToPoints'
import {
  STROKE_WIDTH,
  HANDLE_OFFSET,
  BALL_RADIUS,
  BALL_WIDTH,
  COLORS,
  WAVES_ABBR
} from './consts'

import { getClientXY } from '../../utils/getClientXY'
import { transitionString } from '../../utils/transitionString'

const style = picostyle(h)

const Container = style('div')({
  margin: 'auto'
})

const Wrapper = style('div')({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  display: 'flex',
  '& polyline': {
    transition: transitionString({
      props: ['stroke', 'transform'],
      ms: 100,
      ease: 'ease-out'
    })
  }
})

function Segments({ segmentCoords, ballsCollisions }) {
  const groups = segmentCoords.map((coordPairs, i) => {
    const polylines = coordPairs.map((coords, ii) => {
      const key = `${i}-${ii}`
      const val = ballsCollisions[key]
      let stroke = 'black'
      let style = {}
      if (val !== undefined) {
        stroke = COLORS[val]
        let transform
        switch (i) {
          default:
          case 0:
            transform = `translateY(-${STROKE_WIDTH}px)`
            break
          case 1:
            transform = `translateX(${STROKE_WIDTH}px)`
            break
          case 2:
            transform = `translateY(${STROKE_WIDTH}px)`
            break
          case 3:
            transform = `translateX(-${STROKE_WIDTH}px)`
            break
        }
        style = {
          transform
        }
      }
      const points = coordsToPoints(coords)
      return (
        <polyline
          style={style}
          stroke={stroke}
          stroke-width={STROKE_WIDTH}
          key={`${i}:${ii}`}
          points={points}
        />
      )
    })
    return <g>{polylines}</g>
  })
  return <g>{groups}</g>
}

const handlePartial = ({ actions, coords, i }) => ({
  xOffset = 0,
  yOffset = 0
}) => {
  const [x, y] = coords
  return (
    <rect
      fill="white"
      stroke-width={STROKE_WIDTH}
      stroke="black"
      class="pointer"
      x={x - xOffset}
      y={y - yOffset}
      onmousedown={(ev) => {
        ev.preventDefault()
        actions.set({
          resizerOldCoords: getClientXY(ev),
          resizerIndex: i
        })
      }}
      width={HANDLE_OFFSET}
      height={HANDLE_OFFSET}
    />
  )
}

function Handles(state, actions) {
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
          yOffset: HANDLE_OFFSET
        })
      case 2:
        // Bottom right
        return handle({})
      case 3:
        // Bottom left
        return handle({
          xOffset: HANDLE_OFFSET
        })
    }
  })
  return <g>{rects}</g>
}

function Balls({ ballsData }) {
  return ballsData.map(({ coords }, i) => {
    const [x, y] = coords
    return <circle fill={COLORS[i]} cx={x} cy={y} r={BALL_RADIUS} />
  })
}

function ControlDot(background) {
  const ballSize = BALL_WIDTH + 'px'
  const style = {
    background,
    height: ballSize,
    width: ballSize,
    'border-radius': BALL_RADIUS + 'px'
  }
  return <div style={style} />
}

function Controls(state, actions) {
  return (
    <div id="controls" class="flex container--narrow pb4 pt3">
      {COLORS.map((color, i) => {
        return (
          <div class="w-25">
            <a class="flex flex-wrap items-center justify-center">
              {ControlDot(color)}
              <span class="f6 pl2">{WAVES_ABBR[i]}</span>
            </a>
          </div>
        )
      })}
    </div>
  )
}

export function view(state, actions) {
  const { resizerOldCoords, svgWidth, svgHeight } = state
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
          width={svgWidth}
          height={svgHeight}
          onmouseleave={(ev) => {
            ev.preventDefault()
            actions.set({
              resizerOldCoords: undefined
            })
          }}
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
            window.requestAnimationFrame(() =>
              actions.handleResize(getClientXY(ev))
            )
          }}
        >
          {Balls(state)}
          {Segments(state)}
          {Handles(state, actions)}
        </svg>
        {Controls(state, actions)}
      </Container>
    </Wrapper>
  )
}
