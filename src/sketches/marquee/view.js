import { h } from 'hyperapp'
import picostyle from 'picostyle'

import { RADIUS } from './consts'

import { createGrid } from './createGrid'
import { play } from './play'

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
  background: 'black'
})

const Button = style('button')({
  background: '#333333',
  color: 'orange'
})

const row = (arr, x) => {
  return arr.map((obj, y) => {
    const { val, cx, cy } = obj
    return (
      <circle
        key={`${y}:${x}`}
        cx={cx}
        cy={cy}
        r={RADIUS}
        fill={val ? 'orange' : '#333333'}
      />
    )
  })
}

export const view = (state, actions) => {
  const {
    grid,
    rawInput,
    dimensions: { px }
  } = state

  const wrapperStyle = {
    bottom: (ENV.navHeight || 0) + 'px'
  }

  const svgStyle = {
    transform: `rotateY(45deg) translateX(17.9%) scale(1.075, 1.5)`
  }

  const svgWrapperStyle = {
    perspective: `${px.width}px`,
    perspectiveOrigin: '100%'
  }

  return (
    <Wrapper style={wrapperStyle}>
      <Container
        oncreate={() => {
          createGrid(actions)
        }}
        ondestroy={() => {
          actions.endAll()
        }}
      >
        <div style={svgWrapperStyle} class="mb4">
          <svg style={svgStyle} width={px.width} height={px.height}>
            {grid.map(row)}
          </svg>
        </div>
        <form
          class="container--narrow pt6-ns pt5 flex flex-wrap"
          onsubmit={(ev) => {
            ev.preventDefault()
            play(actions)
          }}
        >
          <div class="mr3 flex-grow-1">
            <input
              class="w-100 ttu"
              type="text"
              oncreate={(elm) => (elm.value = rawInput)}
              oninput={(ev) =>
                actions.set({ rawInput: ev.target.value.toUpperCase() })
              }
            />
          </div>
          <Button class="button">Play</Button>
        </form>
      </Container>
    </Wrapper>
  )
}
