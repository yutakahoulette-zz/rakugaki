import { h } from 'hyperapp'
import { last } from 'ramda'

import { UNIT_SIZE, HALF_UNIT_SIZE, DOT_RADIUS } from './consts'
import { handleClickIndex } from './handleClickIndex'

import { reflectPoints } from '../../utils/reflectPoints'

const cPlus = ({ cx, cy }) => [cx + HALF_UNIT_SIZE, cy + HALF_UNIT_SIZE]

export const bgGrid = (arr, y) => {
  return arr.map((circle, x) => {
    const [cxPlus, cyPlus] = cPlus(circle)
    return (
      <ellipse
        cx={cxPlus}
        cy={cyPlus}
        rx={DOT_RADIUS}
        ry={DOT_RADIUS}
        opacity={0.1}
        key={`${y}:${x}`}
      />
    )
  })
}

export const fgGrid = ({ state, actions }) => (arr, y) => {
  const { clickIndex, isEvenClick, points, isShaking } = state
  return arr.map((circle, x) => {
    const { cx, cy } = circle
    const newPoints = !isEvenClick
      ? reflectPoints(last(points), cPlus(circle))
      : cPlus(circle)
    return (
      <rect
        key={`${y}:${x}`}
        x={cx}
        y={cy}
        width={UNIT_SIZE}
        height={UNIT_SIZE}
        opacity={0}
        onclick={() => {
          if (isShaking) {
            return
          }
          const data = {
            points: points.concat([newPoints]),
            previewPoints: cPlus(circle)
          }
          actions.set(
            handleClickIndex({
              data,
              clickIndex
            })
          )
        }}
        onmouseenter={() => {
          if (isShaking) {
            return
          }
          actions.set({
            previewPoints: newPoints
          })
        }}
      />
    )
  })
}
