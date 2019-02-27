export const delayUpdate = ({ fn, arg, update, end, ms }) => {
  let i = 0
  const timedFunc = (arg) => {
    window.setTimeout(() => {
      fn(arg)
      if (!end(arg)) {
        const updatedArg = update(arg, i)
        timedFunc(updatedArg)
        i += 1
      }
    }, ms)
  }
  timedFunc(arg)
}
