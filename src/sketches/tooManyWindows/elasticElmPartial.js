import { COLORS_LEN } from './consts'
import { getClientXY } from '../../utils/getClientXY'

const handlePointerDown = ({ actions, i, actionName, isTouch }) => (ev) => {
  ev.stopPropagation()
  ev.preventDefault()
  const [x, y] = getClientXY(ev, isTouch)
  actions.updateZIndex({ i })
  actions.setWindoProps({
    i,
    props: { coords: { x, y }, currentActionName: actionName }
  })
}

const handlePointerUp = ({ actions, i }) => (ev) => {
  ev.stopPropagation()
  ev.preventDefault()
  actions.setWindoProps({
    i,
    props: { currentActionName: undefined }
  })
}

const handlePointerMove = ({
  actions,
  coords,
  isActive,
  updaterFn,
  i,
  isTouch
}) => (ev) => {
  ev.stopPropagation()
  ev.preventDefault()
  if (!isActive || !coords) {
    return
  }
  const [x, y] = getClientXY(ev, isTouch)
  const xDifference = x - coords.x
  const yDifference = y - coords.y
  const props = {
    coords: { x, y }
  }
  const updaterProps = updaterFn({
    yDifference,
    xDifference
  })
  const mergedProps = {
    ...props,
    ...updaterProps
  }
  actions.setWindoProps({ i, props: mergedProps })
}

export const ElasticElmPartial = ({ actions, data, i }) => (
  { style = {}, component, updaterFn, actionName, styleProps = {} },
  children
) => {
  const { coords, currentActionName, zIndex } = data
  const isActive = currentActionName === actionName
  const isParent = actionName === 'move'
  const isMoving = currentActionName === 'move'
  const key = isParent ? { key: i } : {}
  const showResizers = isParent
    ? {}
    : { showResizers: zIndex === COLORS_LEN - 1 && !isMoving }
  return component(
    {
      style,
      isActive,
      ...styleProps,
      ...showResizers,
      ...key,
      onmousedown: handlePointerDown({ actions, actionName, i }),
      ontouchstart: handlePointerDown({
        actions,
        actionName,
        i,
        isTouch: true
      }),
      onmouseup: handlePointerUp({ actions, i }),
      ontouchend: handlePointerUp({ actions, i }),
      onmousemove: handlePointerMove({
        actions,
        coords,
        isActive,
        updaterFn,
        i
      }),
      ontouchmove: handlePointerMove({
        actions,
        coords,
        isActive,
        updaterFn,
        isTouch: true,
        i
      }),
      onmouseleave: handlePointerUp({ actions, actionName, i })
    },
    children
  )
}
