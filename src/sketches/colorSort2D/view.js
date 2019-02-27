// NPM
import { h } from 'hyperapp'
import picostyle from 'picostyle'

// Consts
import { MS, RADIUS } from './consts'

// Utils
import { transitionString } from '../../utils/transitionString'

import { createGrid } from './createGrid'

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

const transitions = transitionString({
  props: ['transform'],
  ease: 'ease',
  ms: MS
})

const row = (arr, y) => {
  return arr.map((val, x) => {
    const { transition, cx, cy } = val
    const style = {
      'will-change': 'transform',
      transform: `translate(${cx}px, ${cy}px)`,
      transition: transition ? transitions : 'none'
    }
    return (
      <circle
        key={`${y}:${x}`}
        fill={val.fill}
        r={transition ? RADIUS * 1.1 : RADIUS}
        style={style}
      />
    )
  })
}

export const view = (state, actions) => {
  const {
    grid,
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
          createGrid(state, actions)
        }}
        ondestroy={() => {
          actions.endAll()
        }}
      >
        <svg width={width} height={height}>
          {grid.map(row)}
        </svg>
      </Container>
    </Wrapper>
  )
}
