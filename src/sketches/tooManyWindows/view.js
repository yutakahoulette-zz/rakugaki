// NPM
import { h } from 'hyperapp'
import picostyle from 'picostyle'

import { init } from './init'
import { RESIZER_SIZE_ACTIVE, RESIZER_SIZE_ACTIVE_HALF, QUOTE } from './consts'
import { updaterFnPartial } from './updaterFnPartial'
import { ElasticElmPartial } from './elasticElmPartial'
import { resizers } from './resizers'

const style = picostyle(h)

const Wrapper = style('div')({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  overflow: 'hidden',
  display: 'flex'
})

const Text = style('p')({
  position: 'absolute',
  'font-size': '1.5rem',
  padding: '1rem',
  margin: '0px',
  top: '0px',
  left: '0px',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
})

const Windo = style('div')((props) => {
  const { isActive } = props
  const styles = {
    position: 'absolute',
    'box-shadow': '0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.08)',
    top: '0px',
    left: '0px',
    'border-radius': '3px',
    'will-change': 'transform',
    'mix-blend-mode': isActive ? 'multiply' : 'normal'
  }
  const pseudoStyles = {
    '&::after': {
      content: "''",
      position: 'absolute',
      width: `calc(100% + ${RESIZER_SIZE_ACTIVE}px)`,
      height: `calc(100% + ${RESIZER_SIZE_ACTIVE}px)`,
      top: `-${RESIZER_SIZE_ACTIVE_HALF}px`,
      left: `-${RESIZER_SIZE_ACTIVE_HALF}px`
    }
  }
  return isActive
    ? {
        ...styles,
        ...pseudoStyles
      }
    : styles
})

export const windos = (state, actions) => {
  const { windosData } = state
  if (!windosData.length) return ''
  return windosData.map((_, i) => {
    const data = windosData[i]
    const { color, zIndex, x, y } = data
    const parentStyle = {
      zIndex: data.zIndex,
      background: data.background,
      height: data.height + 'px',
      width: data.width + 'px',
      transform: `translate(${x}px, ${y}px)`
    }
    const ElasticElm = ElasticElmPartial({ actions, data, i })
    const updater = updaterFnPartial({ data })
    return (
      <ElasticElm
        component={Windo}
        actionName="move"
        style={{
          background: color,
          zIndex: zIndex
        }}
        updaterFn={updater({
          updateY: ({ y, yDifference }) => y + yDifference,
          updateX: ({ x, xDifference }) => x + xDifference
        })}
        style={parentStyle}
      >
        {resizers({ ElasticElm, updater }).concat([
          Text(
            {
              class: 'unselectable'
            },
            QUOTE
          )
        ])}
      </ElasticElm>
    )
  })
}

export const view = (state, actions) => {
  const bottom = (ENV.navHeight || 0) + 'px'
  const top = (ENV.disclaimerHeight || 0) + 'px'
  return (
    <Wrapper
      oncreate={() => {
        init(actions)
      }}
      style={{ bottom, top }}
    >
      {windos(state, actions)}
    </Wrapper>
  )
}
