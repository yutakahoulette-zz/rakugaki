export const randomElm = (arr) => {
  const len = arr.length
  const i = Math.floor(Math.random() * len)
  return arr[i]
}
