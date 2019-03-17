import { h } from 'hyperapp'
import picostyle from 'picostyle'

import {
  RESIZER_SIZE,
  RESIZER_SIZE_DOUBLE,
  RESIZER_SIZE_ACTIVE,
  RESIZER_SIZE_ACTIVE_HALF
} from './consts'

const style = picostyle(h)

const Resizer = style('div')((props) => {
  const {
    right,
    top,
    height,
    width,
    showResizers,
    isActive,
    activeRight,
    activeTop,
    activeHeight,
    activeWidth
  } = props
  const styles = {
    display: showResizers ? 'block' : 'none',
    position: 'absolute',
    top,
    right,
    height,
    width,
    cursor: props.cursor,
    'z-index': isActive ? '2' : '1'
  }
  const activeStyles = {
    '&:hover': {
      top: activeTop || top,
      right: activeRight || right,
      height: activeHeight || height,
      width: activeWidth || width
    }
  }
  return isActive
    ? {
        ...styles,
        ...activeStyles
      }
    : styles
})

const LeftResizer = ({ updater, ElasticElm }) => {
  return (
    <ElasticElm
      component={Resizer}
      styleProps={{
        top: RESIZER_SIZE + 'px',
        right: `calc(100% - ${RESIZER_SIZE}px)`,
        height: `calc(100% - ${RESIZER_SIZE_DOUBLE}px)`,
        width: RESIZER_SIZE + 'px',
        activeWidth: RESIZER_SIZE_ACTIVE + 'px',
        activeRight: `calc(100% - ${RESIZER_SIZE_ACTIVE_HALF}px)`,
        cursor: 'ew-resize'
      }}
      actionName="resizeLeft"
      updaterFn={updater({
        updateWidth: ({ width, xDifference }) => width - xDifference,
        updateX: ({ x, xDifference }) => x + xDifference
      })}
    />
  )
}

const RightResizer = ({ updater, ElasticElm }) => {
  return (
    <ElasticElm
      component={Resizer}
      styleProps={{
        top: RESIZER_SIZE + 'px',
        right: '0px',
        height: `calc(100% - ${RESIZER_SIZE_DOUBLE}px)`,
        width: RESIZER_SIZE + 'px',
        activeWidth: RESIZER_SIZE_ACTIVE + 'px',
        activeRight: `-${RESIZER_SIZE_ACTIVE_HALF}px`,
        cursor: 'ew-resize'
      }}
      actionName="resizeRight"
      updaterFn={updater({
        updateWidth: ({ width, xDifference }) => width + xDifference
      })}
    />
  )
}

const BottomRightResizer = ({ updater, ElasticElm }) => {
  return (
    <ElasticElm
      component={Resizer}
      styleProps={{
        top: `calc(100% - ${RESIZER_SIZE}px)`,
        right: '0px',
        height: RESIZER_SIZE + 'px',
        width: RESIZER_SIZE + 'px',
        activeWidth: RESIZER_SIZE_ACTIVE + 'px',
        activeHeight: RESIZER_SIZE_ACTIVE + 'px',
        activeTop: `calc(100% - ${RESIZER_SIZE_ACTIVE_HALF}px)`,
        activeRight: `-${RESIZER_SIZE_ACTIVE_HALF}px`,
        cursor: 'nwse-resize'
      }}
      actionName="resizeBottomRight"
      updaterFn={updater({
        updateWidth: ({ width, xDifference }) => width + xDifference,
        updateHeight: ({ height, yDifference }) => height + yDifference
      })}
    />
  )
}

const BottomResizer = ({ updater, ElasticElm }) => {
  return (
    <ElasticElm
      component={Resizer}
      styleProps={{
        top: `calc(100% - ${RESIZER_SIZE}px)`,
        right: RESIZER_SIZE + 'px',
        height: RESIZER_SIZE + 'px',
        width: `calc(100% - ${RESIZER_SIZE_DOUBLE}px)`,
        activeHeight: RESIZER_SIZE_ACTIVE + 'px',
        activeTop: `calc(100% - ${RESIZER_SIZE_ACTIVE_HALF}px)`,
        cursor: 'ns-resize'
      }}
      actionName="resizeBottom"
      updaterFn={updater({
        updateHeight: ({ height, yDifference }) => height + yDifference
      })}
    />
  )
}

const BottomLeftResizer = ({ updater, ElasticElm }) => {
  return (
    <ElasticElm
      component={Resizer}
      styleProps={{
        top: `calc(100% - ${RESIZER_SIZE}px)`,
        right: `calc(100% - ${RESIZER_SIZE}px)`,
        height: RESIZER_SIZE + 'px',
        width: RESIZER_SIZE + 'px',
        activeWidth: RESIZER_SIZE_ACTIVE + 'px',
        activeHeight: RESIZER_SIZE_ACTIVE + 'px',
        activeTop: `calc(100% - ${RESIZER_SIZE_ACTIVE_HALF}px)`,
        activeRight: `calc(100% - ${RESIZER_SIZE_ACTIVE_HALF}px)`,
        cursor: 'nesw-resize'
      }}
      actionName="resizeBottomLeft"
      updaterFn={updater({
        updateWidth: ({ width, xDifference }) => width - xDifference,
        updateX: ({ x, xDifference }) => x + xDifference,
        updateHeight: ({ height, yDifference }) => height + yDifference
      })}
    />
  )
}

const TopLeftResizer = ({ updater, ElasticElm }) => {
  return (
    <ElasticElm
      component={Resizer}
      styleProps={{
        top: '0',
        right: `calc(100% - ${RESIZER_SIZE}px)`,
        height: RESIZER_SIZE + 'px',
        width: RESIZER_SIZE + 'px',
        activeWidth: RESIZER_SIZE_ACTIVE + 'px',
        activeHeight: RESIZER_SIZE_ACTIVE + 'px',
        activeTop: `-${RESIZER_SIZE_ACTIVE_HALF}px`,
        activeRight: `calc(100% - ${RESIZER_SIZE_ACTIVE_HALF}px)`,
        cursor: 'nwse-resize'
      }}
      actionName="resizeTopLeft"
      updaterFn={updater({
        updateWidth: ({ width, xDifference }) => width - xDifference,
        updateX: ({ x, xDifference }) => x + xDifference,
        updateHeight: ({ height, yDifference }) => height - yDifference,
        updateY: ({ y, yDifference }) => y + yDifference
      })}
    />
  )
}

const TopResizer = ({ updater, ElasticElm }) => {
  return (
    <ElasticElm
      component={Resizer}
      styleProps={{
        top: '0',
        right: RESIZER_SIZE + 'px',
        height: RESIZER_SIZE + 'px',
        width: `calc(100% - ${RESIZER_SIZE_DOUBLE}px)`,
        activeHeight: RESIZER_SIZE_ACTIVE + 'px',
        activeTop: `-${RESIZER_SIZE_ACTIVE_HALF}px`,
        cursor: 'ns-resize'
      }}
      actionName="resizeTop"
      updaterFn={updater({
        updateHeight: ({ height, yDifference }) => height - yDifference,
        updateY: ({ y, yDifference }) => y + yDifference
      })}
    />
  )
}

const TopRightResizer = ({ updater, ElasticElm }) => {
  return (
    <ElasticElm
      component={Resizer}
      styleProps={{
        top: '0',
        right: '0',
        height: RESIZER_SIZE + 'px',
        width: RESIZER_SIZE + 'px',
        activeHeight: RESIZER_SIZE_ACTIVE + 'px',
        activeWidth: RESIZER_SIZE_ACTIVE + 'px',
        activeTop: `-${RESIZER_SIZE_ACTIVE_HALF}px`,
        activeRight: `-${RESIZER_SIZE_ACTIVE_HALF}px`,
        cursor: 'nesw-resize'
      }}
      actionName="resizeTopRight"
      updaterFn={updater({
        updateHeight: ({ height, yDifference }) => height - yDifference,
        updateY: ({ y, yDifference }) => y + yDifference,
        updateWidth: ({ width, xDifference }) => width + xDifference
      })}
    />
  )
}

export function resizers({ updater, ElasticElm }) {
  return [
    TopRightResizer,
    RightResizer,
    BottomRightResizer,
    BottomResizer,
    BottomLeftResizer,
    LeftResizer,
    TopLeftResizer,
    TopResizer
  ].map((component) => {
    return component({ updater, ElasticElm })
  })
}
