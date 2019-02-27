import { h } from 'hyperapp'
import { last, splitEvery, takeLast } from 'ramda'
import { STROKE_WIDTH, DRAWING_ID } from './consts'

import { reflectPoints } from '../../utils/reflectPoints'

const constructD = ({ points, previewPoints, isEvenClick, isDrawing }) => {
  const [firstPoints, ...otherPoints] =
    !isEvenClick && isDrawing ? [].concat(points, [previewPoints]) : points

  const M = firstPoints ? `M ${firstPoints.join(',')} ` : ''

  const Q = splitEvery(2, otherPoints).reduce((acc, arrs) => {
    const [arr1, arr2 = arr1] = arrs
    const [x1, y1] = arr1
    const [x2, y2] = arr2
    return `${acc} Q ${x2},${y2} ${x1},${y1}`
  }, '')

  return M + Q
}

const linePointsToString = (a, b) => `${a.join(',')} ${b.join(',')}`

const linePreviewPoints = ({ points, previewPoints }) => {
  const pointA = points.length === 1 ? last(points) : takeLast(2, points)[0]
  return linePointsToString(pointA, previewPoints)
}

const curvePreviewPoints = ({ points, previewPoints }) => {
  const midPoints = takeLast(2, points)[1]
  const mirrorPoints = reflectPoints(midPoints, previewPoints)
  return {
    aPoints: linePointsToString(mirrorPoints, midPoints),
    bPoints: linePointsToString(midPoints, previewPoints),
    midPoints
  }
}

const Guides = ({ state }) => {
  const { points, previewPoints, isEvenClick, color, isShaking } = state
  if (!points.length || isShaking) {
    return ''
  }
  if (isEvenClick) {
    return (
      <Polyline
        color={color}
        points={linePreviewPoints({ points, previewPoints })}
      />
    )
  } else {
    if (points.length < 2) {
      return ''
    }
    const { aPoints, bPoints, midPoints } = curvePreviewPoints({
      points,
      previewPoints
    })
    return (
      <g>
        <Polyline color={color} points={aPoints} opacity={0.4} />
        <Polyline color={color} points={bPoints} />
        <rect
          x={midPoints[0] - STROKE_WIDTH * 2}
          y={midPoints[1] - STROKE_WIDTH * 2}
          width={STROKE_WIDTH * 4}
          height={STROKE_WIDTH * 4}
          fill={'white'}
          stroke={color}
          stroke-width={STROKE_WIDTH}
        />
        <circle
          cx={previewPoints[0]}
          cy={previewPoints[1]}
          r={STROKE_WIDTH * 2}
          fill={'white'}
          stroke={color}
          stroke-width={STROKE_WIDTH}
        />
      </g>
    )
  }
}

const Polyline = ({ points, color, opacity = 1 }) => {
  return (
    <polyline
      fill="none"
      stroke={color}
      stroke-width={STROKE_WIDTH}
      stroke-dasharray={STROKE_WIDTH * 2}
      points={points}
      opacity={opacity}
    />
  )
}

export const drawing = (state) => {
  const { points, previewPoints, isEvenClick, color, fill, isDrawing } = state
  const fillColor = fill ? color : 'none'
  const d = constructD({
    points,
    previewPoints,
    isEvenClick,
    isDrawing
  })
  return (
    <g>
      <path
        id={DRAWING_ID}
        fill={fillColor}
        stroke={color}
        stroke-width={STROKE_WIDTH}
        d={d}
      />
      {isDrawing && <Guides state={state} />}
    </g>
  )
}
