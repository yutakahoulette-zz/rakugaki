import { h } from 'hyperapp'
import { slugify } from '../utils/slugify'

export const RangeField = ({
  cb,
  min = 0,
  max = 100,
  value,
  label,
  valueLabel,
  id,
  isPercent,
  step
}) => {
  id = id ? id : slugify(label)
  const oninput = (ev) => {
    const newValue = Number(ev.target.value)
    cb(isPercent ? newValue / 100 : newValue)
  }
  value = isPercent ? Math.ceil(value * 100) : value
  return (
    <div key={id}>
      <label for={id} class="db">
        {`${label}: ${valueLabel || value}`}
      </label>
      <input
        id={id}
        type="range"
        value={value}
        step={step}
        min={min}
        max={max}
        oninput={oninput}
      />
    </div>
  )
}
