export function handleClickIndex({ clickIndex, data, inc = 1 }) {
  return Object.assign(data, {
    clickIndex: clickIndex + inc,
    isEvenClick: clickIndex % 2 === 0
  })
}
