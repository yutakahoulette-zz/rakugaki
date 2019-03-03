// NPM
import { h } from 'hyperapp'
import picostyle from 'picostyle'

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
  return (
    <Wrapper>
      <Container oncreate={() => {}} ondestroy={() => {}}>
        <svg />
      </Container>
    </Wrapper>
  )
}
