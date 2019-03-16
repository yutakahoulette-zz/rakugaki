import { h } from 'hyperapp'
import picostyle from 'picostyle'
import { init } from './init'
import { coordsToPoints } from '../../utils/coordsToPoints'

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

function box(boxCoords) {
  const lines = Object.keys(boxCoords).reduce((acc, key) => {
    const coords = boxCoords[key]
    if (coords) {
      console.log({ key, coords })
      const points = coordsToPoints(coords)
      const polyline = <polyline stroke="black" key={key} points={points} />
      return [polyline, ...acc]
    }
    return acc
  }, [])
  return <g>{lines}</g>
}

export function view(state, actions) {
  const { boxCoords, width, height } = state
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
        <svg width={width} height={height}>
          {box(boxCoords)}
        </svg>
      </Container>
    </Wrapper>
  )
}
