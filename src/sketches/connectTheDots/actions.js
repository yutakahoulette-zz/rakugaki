export const actions = {
  set: (obj) => () => obj,
  get: (key) => (state) => state[key],
  reset: () => () => {
    return {
      clickIndex: 0,
      grid: [],
      isDrawing: false,
      isEvenClick: true,
      points: [],
      previewPoints: [],
      savedPoints: [],
      isLoading: true
    }
  },
  stop: () => ({ savedPoints, enders }) => {
    enders.map((end) => end())
    return {
      isShaking: false,
      points: savedPoints
    }
  }
}
