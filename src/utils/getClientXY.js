export function getClientXY(ev, isTouch = false) {
  if (isTouch) {
    return [ev.touches[0].clientX, ev.touches[0].clientY]
  }
  return [ev.clientX, ev.clientY]
}
