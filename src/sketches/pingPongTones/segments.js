import { h } from 'hyperapp'
import { STROKE_WIDTH, COLORS } from './consts'
import { coordsToPoints } from '../../utils/coordsToPoints'

export function Segments({ segmentCoords, ballsCollisions, isPlaying }) {
  const groups = segmentCoords.map((coordPairs, i) => {
    const polylines = coordPairs.map((coords, ii) => {
      const key = `${i}-${ii}`
      const val = ballsCollisions[key]
      let stroke = 'black'
      let style = {}
      if (val !== undefined && isPlaying) {
        stroke = COLORS[val]
        let transform
        switch (i) {
          default:
          case 0:
            transform = `translateY(-${STROKE_WIDTH}px)`
            break
          case 1:
            transform = `translateX(${STROKE_WIDTH}px)`
            break
          case 2:
            transform = `translateY(${STROKE_WIDTH}px)`
            break
          case 3:
            transform = `translateX(-${STROKE_WIDTH}px)`
            break
        }
        style = {
          transform
        }
      }
      const points = coordsToPoints(coords)
      return (
        <polyline
          style={style}
          stroke={stroke}
          stroke-width={STROKE_WIDTH}
          key={`${i}:${ii}`}
          points={points}
        />
      )
    })
    return <g>{polylines}</g>
  })
  return <g>{groups}</g>
}
