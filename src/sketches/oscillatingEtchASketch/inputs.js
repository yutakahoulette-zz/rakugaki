import { h } from 'hyperapp'
import { MIN_LEN, MAX_LEN } from './consts'

const setRangeVal = (key, actions) => (ev) => {
  const val = ev.target.value
  actions.set({
    [key]: Number(val)
  })
}

export const inputs = (state, actions) => {
  const { xInc, yInc, maxXInc, maxYInc, fill, tailLength, width } = state
  const sectionStyle = {
    maxWidth: width + 'px'
  }

  return (
    <section id="inputs" class="flex flex-wrap pt4 f6" style={sectionStyle}>
      <div class="w-50">
        <label for="h-speed" class="db pb1">
          Horizontal speed
        </label>
        <input
          id="h-speed"
          min={1}
          max={maxXInc}
          step={0.5}
          type="range"
          value={xInc}
          oninput={setRangeVal('xInc', actions)}
        />
      </div>
      <div class="w-50">
        <label for="line-length" class="db pb1">
          Line length
        </label>
        <input
          id="line-length"
          min={MIN_LEN}
          step={50}
          max={MAX_LEN}
          type="range"
          value={tailLength}
          oninput={setRangeVal('tailLength', actions)}
        />
      </div>
      <div class="w-50 pt3">
        <label for="v-speed" class="db pb1">
          Vertical speed
        </label>
        <input
          id="v-speed"
          min={1}
          max={maxYInc}
          step={0.5}
          type="range"
          value={yInc}
          oninput={setRangeVal('yInc', actions)}
        />
      </div>
      <div class="w-50 pt3">
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
    </section>
  )
}
