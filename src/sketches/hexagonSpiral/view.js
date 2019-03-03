import { h } from 'hyperapp'
import picostyle from 'picostyle'
import { createHex } from './createHex'
import { HALF_LENGTH, HALF_HEIGHT } from './consts'
import { EqTriangle } from '../../polygons/eqTriangle'

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

const drawTriangles = ({ hexProps, colorPair }) => {
  return hexProps.map(({ cx, cy, pointDown, opacity }) => {
    const props = {
      fill: pointDown ? colorPair[0] : colorPair[1],
      stroke: 'none',
      opacity
    }
    return (
      <EqTriangle
        cx={cx}
        cy={cy}
        halfHeight={HALF_HEIGHT}
        halfLength={HALF_LENGTH}
        pointDown={pointDown}
        props={props}
      />
    )
  })
}

const line = ({ firstElm, lastElm, rotationIsEven }) => {
  const stroke = rotationIsEven ? 'gray' : 'white'
  return (
    <line
      x1={firstElm.cx}
      y1={firstElm.cy}
      x2={lastElm.cx}
      y2={lastElm.cy}
      stroke={stroke}
      stroke-width={4}
      stroke-linecap="round"
      stroke-dasharray={8}
    />
  )
}

export const view = (state, actions) => {
  const {
    hexProps,
    currentTriangle,
    rotationIsEven,
    colorPair,
    dimensions: {
      px: { width, height }
    }
  } = state
  const offset = (ENV.navHeight || 0) + 'px'
  const style = {
    bottom: offset
  }
  return (
    <Wrapper style={style}>
      <Container
        oncreate={() => {
          createHex({ actions, state })
        }}
        ondestroy={() => {
          actions.clear()
        }}
      >
        <svg height={height} width={width}>
          {hexProps.length && drawTriangles({ hexProps, colorPair })}
          {currentTriangle &&
            line({
              firstElm: hexProps[0],
              lastElm: currentTriangle,
              rotationIsEven
            })}
        </svg>
      </Container>
    </Wrapper>
  )
}
