import { h } from 'hyperapp'
import { getClientXY } from '../../utils/getClientXY'
import { STROKE_WIDTH, HANDLE_OFFSET } from './consts'

const handlePointerDown = ({ i, actions, isTouch }) => (ev) => {
  ev.stopPropagation()
  ev.preventDefault()
  actions.set({
    resizerOldCoords: getClientXY(ev, isTouch),
    resizerIndex: i
  })
}

const handlePartial = ({ actions, coords, i }) => ({
  xOffset = 0,
  yOffset = 0
}) => {
  const [x, y] = coords
  return (
    <rect
      fill="white"
      stroke-width={STROKE_WIDTH}
      stroke="black"
      class="pointer"
      x={x - xOffset}
      y={y - yOffset}
      onmousedown={handlePointerDown({ actions, i })}
      ontouchstart={handlePointerDown({ actions, i, isTouch: true })}
      width={HANDLE_OFFSET}
      height={HANDLE_OFFSET}
    />
  )
}

export function Handles(state, actions) {
  const { cornerCoords } = state
  const rects = cornerCoords.map((coords, i) => {
    const handle = handlePartial({ actions, coords, i })
    switch (i) {
      case 0:
        // Top left
        return handle({
          xOffset: HANDLE_OFFSET,
          yOffset: HANDLE_OFFSET
        })
      case 1:
        // Top right
        return handle({
          yOffset: HANDLE_OFFSET
        })
      case 2:
        // Bottom right
        return handle({})
      case 3:
        // Bottom left
        return handle({
          xOffset: HANDLE_OFFSET
        })
    }
  })
  return <g>{rects}</g>
}
