import { colorsLen, getColorPairs } from './consts'

export const actions = {
  set: (obj) => () => obj,
  showTriangle: ({ i }) => ({
    hexProps,
    colorRotation,
    rotation,
    colorPairs
  }) => {
    const isBeginningOfRotation = i === 0
    const isFirstRotation = rotation === 0
    const newRotation = rotation + (isBeginningOfRotation ? 1 : 0)
    const newRotationIsEven = newRotation % 2 === 0
    const oldRotationIsEven = rotation % 2 === 0
    const incrementNewColorRotation =
      !isFirstRotation && oldRotationIsEven && isBeginningOfRotation
    const newColorRotation =
      (colorRotation + (incrementNewColorRotation ? 1 : 0)) % colorsLen
    const newColorPairs =
      newColorRotation === colorsLen - 1 &&
      isBeginningOfRotation &&
      !newRotationIsEven
        ? getColorPairs()
        : colorPairs
    const colorPair = newColorPairs[newColorRotation]
    const triangle = hexProps[i]
    const opacity = triangle.opacity
    triangle.opacity = opacity ? 0 : 1
    hexProps[i] = triangle
    return {
      hexProps,
      rotation: newRotation,
      rotationIsEven: newRotationIsEven,
      colorRotation: newColorRotation,
      colorPair,
      colorPairs: newColorPairs,
      currentTriangle: triangle
    }
  },
  pushEnd: (end) => ({ ends }) => ({
    ends: [].concat(ends, end)
  }),
  clear: () => ({ ends }) => {
    ends.map((fn) => fn())
    return {
      ends: [],
      rotation: 0,
      colorRotation: 0
    }
  }
}
