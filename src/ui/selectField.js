import { h } from 'hyperapp'
import { Select } from './select'
import { slugify } from '../utils/slugify'

export const SelectField = ({ options, cb, selected, label, id }) => {
  id = id ? id : slugify(label)
  const onchange = (ev) => {
    cb(ev.target.value)
  }
  return (
    <div key={id}>
      <label for={id} class="db pb1">
        {label}
      </label>
      <Select
        options={options}
        id={id}
        selected={selected}
        onchange={onchange}
      />
    </div>
  )
}
