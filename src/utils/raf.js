export const raf = (fn) => {
  let end = false
  const run = () => {
    window.requestAnimationFrame(() => {
      if (end) {
        return
      }
      fn()
      window.requestAnimationFrame(run)
    })
  }
  run()
  return () => (end = true)
}
