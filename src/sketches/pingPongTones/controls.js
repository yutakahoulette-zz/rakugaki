import { h } from 'hyperapp'
import { COLORS, WAVES_ABBR } from './consts'

function SynthTitle(i) {
  const dotSize = '0.75em'
  const dotStyle = {
    background: COLORS[i],
    height: dotSize,
    width: dotSize,
    'border-radius': '50%'
  }
  return (
    <div class="flex flex-wrap items-center justify-center">
      <div style={dotStyle} />
      <span class="f6 pl2">{WAVES_ABBR[i]}</span>
    </div>
  )
}

export function Controls(state, actions) {
  return (
    <div id="controls" class="flex container--narrow pb4 pt3">
      {COLORS.map((_, i) => {
        return (
          <div class="w-25">
            <a>{SynthTitle(i)}</a>
          </div>
        )
      })}
    </div>
  )
}
