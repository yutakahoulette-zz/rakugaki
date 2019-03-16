// Takes a 2d array (coords) and returns a str (points)
// Useful for creating points for svg polylines
// [[1,2], [4,5]] -> '1,2 4,5'
export function coordsToPoints(coords) {
  return coords
    .reduce(function(acc, arr) {
      const points = arr.join(',')
      return `${acc} ${points}`
    }, '')
    .trim()
}
