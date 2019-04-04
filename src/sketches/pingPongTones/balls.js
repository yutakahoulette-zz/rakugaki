import { h } from 'hyperapp'
import { BALL_RADIUS, COLORS } from './consts'

export function Balls({ ballsData }) {
  return ballsData.map(({ coords }, i) => {
    const [x, y] = coords
    return <circle fill={COLORS[i]} cx={x} cy={y} r={BALL_RADIUS} />
  })
}
