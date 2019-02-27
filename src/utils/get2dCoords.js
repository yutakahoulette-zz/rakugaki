export const get2dCoords = (i, width) => {
  return {
    y: Math.floor(i / width),
    x: i % width
  }
}
