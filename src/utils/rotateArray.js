export const rotateArray = ({ count, arr, direction }) => {
  const len = arr.length
  const mid = direction === 'left' ? count : len - count
  const a = arr.slice(0, mid)
  const b = arr.slice(mid, len)
  return [].concat(b, a)
}
