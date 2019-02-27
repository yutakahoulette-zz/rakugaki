// Returns an array of n sequential even numbers excluding 0
// nEvens(4) -> [2,4,6,8]
export const nEvens = (n) => {
  let arr = []
  for (let i = 2; arr.length < n; i += 2) {
    arr.push(i)
  }
  return arr
}
