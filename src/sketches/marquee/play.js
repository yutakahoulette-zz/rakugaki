import { times } from 'ramda'
import { keyMap } from './keyMap'
import { delayEach } from '../../utils/delayEach'
import { SPACER, MS } from './consts'

export const play = (actions) => {
  const state = actions.getState()

  const {
    dimensions: { unit },
    rawInput,
    ends
  } = state

  if (ends.length || !rawInput.length) {
    actions.endAll()
    actions.clearGrid()
  }

  const tail = times(() => SPACER, unit.width + 1)

  const chars = rawInput.split('').reduce((acc, key) => {
    const val = keyMap[key] || [SPACER, SPACER]
    return [].concat(acc, val)
  }, [])

  const end = delayEach({
    fn: (_, i, acc) => {
      const start = i > unit.width ? i - unit.width : 0
      const end = acc.length + 1
      const chars = acc.slice(start, end)
      actions.play({ chars })
    },
    arr: [].concat(chars, tail),
    loop: true,
    ms: MS
  })

  actions.pushEnd(end)
}
