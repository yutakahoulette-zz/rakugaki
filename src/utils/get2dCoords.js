// Given a 2d array where the nested arrays are the same length,
// get an elements x, y coords by index.

// Example
// [[a,b,c,d],
//  [e,f,g,h],
//  [i,j,k,l]]
// - the index of f is 5 (counting from top down and left to right)
// - the width is the length of the nested arrays
// get2dCoords(5, 4) -> {y: 1, x: 1}
export const get2dCoords = (i, width) => {
  return {
    y: Math.floor(i / width),
    x: i % width
  }
}
