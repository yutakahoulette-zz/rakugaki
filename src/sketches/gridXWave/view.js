// NPM
import { h } from 'hyperapp'
import picostyle from 'picostyle'

// Utils
import { transitionString } from '../../utils/transitionString'

// Consts
import { MS, UNIT_SIZE, HALF_UNIT_SIZE } from './consts'

// Functions
import { createGrid } from './createGrid'
import { animate } from './animate'

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

const G = style('g')({
  cursor: 'pointer',
  ':hover': {
    fill: 'tomato'
  }
})

const row = (state, actions) => (arr, y) => {
  return arr.map((circle, x) => {
    const fn = () => animate(x, y, state, actions)
    const { tilt, cx, cy } = circle
    const style = {
      transition: transitionString({
        props: ['opacity', 'transform'],
        ease: 'ease-out',
        ms: MS
      }),
      transform: `translate(${cx + HALF_UNIT_SIZE}px, ${cy +
        HALF_UNIT_SIZE}px)${tilt ? ` scaleY(0.3)` : ''}`
    }
    return (
      <G
        key={`${y}:${x}`}
        onclick={fn}
        // Simulating a 'click and hold' event
        onkeydown={fn}
        onmouseenter={() => state.clicking && fn()}
      >
        <circle r={HALF_UNIT_SIZE} opacity={tilt ? 0.8 : 1} style={style} />
        {/* The rectangle is here so that the negative space around the circle is also clickable */}
        <rect
          x={circle.cx}
          y={circle.cy}
          width={UNIT_SIZE}
          height={UNIT_SIZE}
          opacity={0}
        />
      </G>
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
  const bottomOffset = (ENV.navHeight || 0) + 'px'
  const topOffset = (ENV.disclaimerHeight || 0) + 'px'
  const style = {
    bottom: bottomOffset,
    top: topOffset
  }
  return (
    <Wrapper style={style}>
      <Container
        onmousedown={() => actions.set({ clicking: true })}
        onmouseup={() => actions.set({ clicking: false })}
        oncreate={() => createGrid(actions)}
      >
        <svg width={width} height={height}>
          {grid.map(row(state, actions))}
        </svg>
      </Container>
    </Wrapper>
  )
}
