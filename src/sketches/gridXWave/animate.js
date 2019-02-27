// Utils
import { delayUpdate } from '../../utils/delayUpdate'

// Consts
import { MS } from './consts'

export const animate = (x, y, state, actions) =>
  window.requestAnimationFrame(() => {
    const { dimensions } = state
    const { width, height } = dimensions.unit

    const updateCoords = (xInc, yInc) => ({ x, y }) => {
      return {
        x: x + xInc,
        y: y + yInc
      }
    }

    const enders = {
      NW: ({ x, y }) => x <= 0 || y <= 0,
      NE: ({ x, y }) => x >= width - 1 || y <= 0,
      SW: ({ x, y }) => x <= 0 || y >= height - 1,
      SE: ({ x, y }) => x >= width - 1 || y >= height - 1
    }

    const updaters = {
      NW: updateCoords(-1, -1),
      NE: updateCoords(1, -1),
      SE: updateCoords(1, 1),
      SW: updateCoords(-1, 1)
    }

    const endAll = (arr) => arr.every((x) => !Boolean(x))

    const updateUnless = ({ arg, end, update }) => {
      return !arg || end(arg) ? false : update(arg)
    }

    const update = (arr, i) => {
      return ['NW', 'NE', 'SW', 'SE'].map((key, ii) => {
        const coords = i <= 0 ? arr[0] : arr[ii]
        return updateUnless({
          end: enders[key],
          update: updaters[key],
          arg: coords
        })
      })
    }

    const animate = () =>
      delayUpdate({
        fn: actions.toggleCircles,
        arg: [{ x, y }],
        update,
        end: endAll,
        ms: 100
      })

    // This first call 'tilts' the circles
    animate()
    window.setTimeout(animate, MS)
  })
