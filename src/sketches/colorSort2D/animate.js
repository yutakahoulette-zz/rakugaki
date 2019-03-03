import { compose, propEq, findIndex, drop, flatten } from 'ramda'

import { MS } from './consts'

import { delayEach } from '../../utils/delayEach'
import { get2dCoords } from '../../utils/get2dCoords'

export const animate = (actions, sortedColors) => {
  const sort = ({ color, i }) => {
    const {
      grid,
      dimensions: {
        unit: { width }
      }
    } = actions.getState()

    const flatGrid = compose(
      drop(i),
      flatten
    )(grid)

    const a = get2dCoords(i, width)

    const bIndex = findIndex(propEq('fill', color), flatGrid) + i

    const b = get2dCoords(bIndex, width)

    actions.swapPhysicalLocation({ a, b })

    window.setTimeout(() => actions.swapArrayLocation({ a, b }), MS)
  }

  const end = delayEach({
    arr: sortedColors,
    fn: (color, i) => sort({ color, i }),
    ms: MS
  })

  actions.pushEnd(end)
}
