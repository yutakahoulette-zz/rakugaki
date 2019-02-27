// NPM
import { h } from 'hyperapp'
import picostyle from 'picostyle'
import { dropLast, range } from 'ramda'

import { handleClickIndex } from './handleClickIndex'

import { DRAWING_ID, SHAKE_MAX } from './consts'

// Consts
import { albers } from '../../constants/colors'

// Utils
import { classNames } from '../../utils/classNames'
import { downloadSVG } from '../../utils/downloadSVG'
import { randomElm } from '../../utils/randomElm'
import { raf } from '../../utils/raf'

const style = picostyle(h)

const CircleButton = style('button')({
  width: '16px',
  height: '16px',
  border: 'none',
  borderRadius: '8px',
  position: 'relative',
  display: 'block',
  '.selected::before': {
    content: "''",
    width: '8px',
    height: '8px',
    borderRadius: '100%',
    position: 'absolute',
    left: '4px',
    top: '4px',
    background: 'white'
  }
})

const ColorButtons = ({ color, actions }) => {
  const keys = Object.keys(albers)
  const btns = keys.map((key) => {
    const btnColor = albers[key]
    const selected = color === btnColor
    const bgStyle = {
      background: btnColor
    }
    const className = classNames({
      ma1: true,
      selected: selected
    })
    const onclick = () => actions.set({ color: btnColor })
    return <CircleButton style={bgStyle} class={className} onclick={onclick} />
  })
  return (
    <div
      class="flex flex-wrap ma2"
      style={{
        maxWidth: '144px'
      }}
    >
      {btns}
    </div>
  )
}

const Fill = ({ fill, actions }) => (
  <div class="ma2">
    <label for="fill" class="pr2">
      Fill?
    </label>
    <input
      id="fill"
      type="checkbox"
      checked={fill}
      onchange={() => {
        actions.set({
          fill: !fill
        })
      }}
    />
  </div>
)

export const Controls = ({ state, actions }) => {
  const {
    color,
    fill,
    dimensions,
    points,
    clickIndex,
    isShaking,
    shakeLevel
  } = state

  const style = { maxWidth: dimensions.px.width + 'px' }

  return (
    <div
      style={style}
      id="controls"
      class="fadeIn--delay flex flex-wrap items-center justify-between pt2 f6"
    >
      <ColorButtons color={color} actions={actions} />
      <Fill fill={fill} actions={actions} />
      <button
        disabled={points.length <= 1}
        class="button button--small ma2"
        onclick={shake(state, actions)}
      >
        {isShaking ? 'Stop' : 'Shake'}
      </button>
      <div class="ma2">
        <label for="shake-level" class="db pb1">
          Shake level
        </label>
        <input
          id="shake-level"
          type="range"
          min={1}
          max={SHAKE_MAX}
          value={shakeLevel}
          oninput={(ev) => {
            actions.set({
              shakeLevel: Number(ev.target.value)
            })
          }}
        />
      </div>
      <button
        disabled={points.length <= 1 || isShaking}
        class="button button--small ma2"
        onclick={() => {
          const data = { points: dropLast(1, points) }
          actions.set(
            handleClickIndex({
              data,
              clickIndex,
              inc: -1
            })
          )
        }}
      >
        Undo
      </button>
      <button
        disabled={points.length <= 1}
        class="button button--small ma2"
        onclick={download(state)}
      >
        Download
      </button>
    </div>
  )
}

const download = (state) => (ev) => {
  const {
    dimensions: {
      px: { height, width }
    }
  } = state
  const drawing = document.getElementById(DRAWING_ID)
  const svgData = `<svg xmlns="http://www.w3.org/2000/svg" height="${height}" width="${width}">${
    drawing.outerHTML
  }</svg>`
  downloadSVG({
    svgData,
    title: DRAWING_ID
  })
}

const shake = (state, actions) => (ev) => {
  const { isShaking, points, enders } = state
  if (isShaking) {
    actions.stop()
  } else {
    actions.set({
      isShaking: true,
      savedPoints: points
    })
    const end = raf(function shake() {
      const newPoints = points.map(([x, y]) => {
        const shakeLevel = actions.get('shakeLevel')
        const adders = range(-shakeLevel, shakeLevel + 1)
        const addX = randomElm(adders)
        const addY = randomElm(adders)
        return [x + addX, y + addY]
      })
      actions.set({
        points: newPoints
      })
    })
    actions.set({
      enders: enders.concat([end])
    })
  }
}
