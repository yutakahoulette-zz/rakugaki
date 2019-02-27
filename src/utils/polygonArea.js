// https://www.mathopenref.com/coordpolygonarea.html
export function polygonArea(coords) {
  return Math.abs(
    [...coords].reduce((area, arrA, i) => {
      const arrB = coords[i + 1]
      if (!arrB) {
        return area
      }
      const [arrAx, arrAy] = arrA
      const [arrBx, arrBy] = arrB
      return arrAx * arrBy - arrAy * arrBx + area
    }, 0) / 2
  )
}
