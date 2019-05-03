import { h } from 'hyperapp'
import picostyle from 'picostyle'

import { init } from './init'

// Utils
import { getClientXY } from '../../utils/getClientXY'
import { transitionString } from '../../utils/transitionString'

// SVGs
import { Balls } from './balls'
import { Segments } from './segments'
import { Handles } from './handles'

// UI
import { Controls } from './controls'

const style = picostyle(h)

const Container = style('div')({
  margin: 'auto',
  '& polyline': {
    transition: transitionString({
      props: ['stroke', 'transform'],
      ms: 100,
      ease: 'ease-out'
    })
  }
})

const Wrapper = style('div')({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  display: 'flex'
})

const handlePointerUp = (actions) => (ev) => {
  ev.stopPropagation()
  ev.preventDefault()
  actions.set({
    resizerOldCoords: undefined
  })
}

const handlePointerMove = ({ actions, isTouch, resizerOldCoords }) => (ev) => {
  ev.stopPropagation()
  ev.preventDefault()
  if (resizerOldCoords === undefined) {
    return
  }
  window.requestAnimationFrame(() =>
    actions.handleResize(getClientXY(ev, isTouch))
  )
}

export function view(state, actions) {
  const { resizerOldCoords, svgWidth, svgHeight, isPlaying } = state
  const bottomOffset = (ENV.navHeight || 0) + 'px'
  const style = {
    bottom: bottomOffset
  }
  return (
    <Wrapper style={style}>
      <Container
        style={style}
        oncreate={() => {
          init(actions)
        }}
        ondestroy={actions.cleanUp}
      >
        <svg
          width={svgWidth}
          height={svgHeight}
          onmouseleave={handlePointerUp(actions)}
          onmouseup={handlePointerUp(actions)}
          ontouchend={handlePointerUp(actions)}
          onmousemove={handlePointerMove({ actions, resizerOldCoords })}
          ontouchmove={handlePointerMove({
            actions,
            isTouch: true,
            resizerOldCoords
          })}
        >
          {isPlaying && Balls(state)}
          {Segments(state)}
          {Handles(state, actions)}
        </svg>
        {Controls(state, actions)}
      </Container>
    </Wrapper>
  )
}
