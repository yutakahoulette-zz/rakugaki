// NPM
import { h } from 'hyperapp'
import picostyle from 'picostyle'

import { init } from './init'
import { BlockStacks } from './blockStacks'
import { Controls } from './controls'

const style = picostyle(h)

const Wrapper = style('div')({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  display: 'flex'
})

const Container = style('div')({
  margin: 'auto'
})

export const view = (state, actions) => {
  const { height = 0, width = 0 } = state
  const wrapperStyle = {
    bottom: (ENV.navHeight || 0) + 'px'
  }
  return (
    <Wrapper style={wrapperStyle}>
      <Container
        oncreate={() => {
          init(actions)
          const keyPressEv = window.addEventListener('keypress', (ev) => {
            if (!ev.key === 'x') {
              return
            }
            actions.set({
              isShowingModal: false
            })
          })
          actions.set({ keyPressEv })
        }}
        ondestroy={() => {
          window.removeEventListener('keypress', state.keyPressEv)
          actions.reset()
        }}
      >
        <svg {...{ width, height }}>
          <BlockStacks state={state} actions={actions} />
        </svg>
        <Controls state={state} actions={actions} />
      </Container>
    </Wrapper>
  )
}
