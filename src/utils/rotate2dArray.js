// Input:
// [[1,2,3],
//  [4,5,6]]

// Output:
// [[1,4],
//  [2,5],
//  [3,6]]
export const rotate2dArray = (arr) =>
  arr.reduce((acc, row, i) => {
    row.forEach((val, ii) => {
      acc[ii] = acc[ii] ? acc[ii] : []
      acc[ii][i] = val
    })
    return acc
  }, [])
