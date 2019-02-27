export const swapProps = ({ a, b, props }) => {
  const copyA = Object.assign({}, a)
  const copyB = Object.assign({}, b)
  props.forEach((prop) => {
    copyA[prop] = b[prop]
    copyB[prop] = a[prop]
  })
  return {
    a: copyA,
    b: copyB
  }
}
