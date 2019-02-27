// Same as delayEach but uses reaquestAnimationFrame
export const rafEach = ({ fn, arr, cb, loop }) => {
  const arrLen = arr.length
  let end = false
  const timedFunc = (i, arr) => {
    if (end) {
      return
    }
    const elm = arr[i]
    if (i <= arrLen - 1) {
      fn(elm, i, arr.slice(0, i + 1))
      window.requestAnimationFrame(() => timedFunc(i + 1, arr))
    } else if (loop) {
      window.requestAnimationFrame(() => timedFunc(0, arr))
    } else {
      cb && cb(arr)
    }
  }
  timedFunc(0, arr)
  return () => (end = true)
}
