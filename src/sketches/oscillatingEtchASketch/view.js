// NPM
import { h } from 'hyperapp'
import picostyle from 'picostyle'
import { CIRCLE_RADIUS } from './consts'

import { init } from './init'
import { inputs } from './inputs'

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

export const view = (state, actions) => {
  const { x, y, fill, width, height, pointsString } = state
  const style = {
    bottom: (ENV.navHeight || 0) + 'px'
  }
  return (
    <Wrapper style={style}>
      <Container
        oncreate={(elm) => init(elm, actions)}
        ondestroy={() => {
          actions.clearAll()
        }}
      >
        <svg width={width} height={height} style={{ background: 'white' }}>
          <polyline
            fill={fill ? 'black' : 'none'}
            stroke="black"
            stroke-width="1"
            points={pointsString}
          />
          <circle stroke="none" fill="red" cx={x} cy={y} r={CIRCLE_RADIUS} />
        </svg>
        {inputs(state, actions)}
      </Container>
    </Wrapper>
  )
}
