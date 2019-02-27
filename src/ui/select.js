import { h } from 'hyperapp'

export const Select = ({ id, onchange, options, selected }) => {
  return (
    <select class="ttc" onchange={onchange} id={id}>
      {options.map((st) => {
        return (
          <option value={st} selected={st == selected}>
            {st}
          </option>
        )
      })}
    </select>
  )
}
