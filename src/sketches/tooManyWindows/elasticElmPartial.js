import { COLORS_LEN } from './consts'

const getXY = (ev) => [ev.clientX, ev.clientY]

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
      onmousedown: (ev) => {
        ev.stopPropagation()
        const [x, y] = getXY(ev)
        actions.updateZIndex({ i })
        actions.setWindoProps({
          i,
          props: { coords: { x, y }, currentActionName: actionName }
        })
      },
      onmouseup: (ev) => {
        ev.stopPropagation()
        actions.setWindoProps({
          i,
          props: { currentActionName: undefined }
        })
      },
      onmousemove: (ev) => {
        ev.stopPropagation()
        if (!isActive || !coords) {
          return
        }
        const [x, y] = getXY(ev)
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
      },
      onmouseleave: (ev) => {
        ev.stopPropagation()
        actions.setWindoProps({
          i,
          props: { currentActionName: undefined }
        })
      }
    },
    children
  )
}
