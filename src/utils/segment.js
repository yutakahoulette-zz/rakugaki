// segment(3, [1,2,3,4,5,6,7]) -> [[1,2,3], [4,5,6], [7]]
export const segment = (n, arr) => {
  let result = []
  let len = arr.length
  for (let i = 0; i < len; i++) {
    const elm = arr[i]
    let last = result[result.length - 1]
    if (last && last.length < n) {
      last.push(elm)
    } else {
      result.push([elm])
    }
  }
  return result
}
