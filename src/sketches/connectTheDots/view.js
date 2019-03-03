import { h } from 'hyperapp'
import picostyle from 'picostyle'

import { drawing } from './drawing'
import { fgGrid, bgGrid } from './grids'
import { createGrid } from './createGrid'
import { Controls } from './controls'

const style = picostyle(h)

import { classNames } from '../../utils/classNames'

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
  const {
    grid,
    isShaking,
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
        oncreate={(elm) => createGrid(elm, actions)}
        ondestroy={() => {
          actions.stop()
          actions.reset()
        }}
      >
        <svg
          class={classNames({
            crosshair: !isShaking,
            'not-allowed': isShaking
          })}
          width={width}
          height={height}
          onmouseleave={() => {
            if (isShaking) {
              return
            }
            actions.set({
              isDrawing: false
            })
          }}
          onmouseenter={() => {
            if (isShaking) {
              return
            }
            actions.set({
              isDrawing: true
            })
          }}
        >
          <g>{grid.map(bgGrid)}</g>
          {drawing(state)}
          <g>{grid.map(fgGrid({ state, actions }))}</g>
        </svg>
        <Controls actions={actions} state={state} />
      </Container>
    </Wrapper>
  )
}
