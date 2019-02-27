export const delayEach = ({ fn, arr, ms, cb, loop }) => {
  const arrLen = arr.length
  let end = false
  const timedFunc = (i, arr) => {
    window.setTimeout(() => {
      if (end) {
        return
      }
      const elm = arr[i]
      if (i <= arrLen - 1) {
        fn(elm, i, arr.slice(0, i + 1))
        timedFunc(i + 1, arr)
      } else if (loop) {
        timedFunc(0, arr)
      } else {
        cb && cb(arr)
      }
    }, ms)
  }
  timedFunc(0, arr)
  return () => (end = true)
}
