export const actions = {
  set: (obj) => () => obj,
  updateZIndex: ({ i }) => ({ windosData }) => {
    const maxZIndex = windosData.length - 1
    const targetZIndex = windosData[i].zIndex
    const updatedWindowsData = windosData.map((data) => {
      const zIndex = data.zIndex
      if (zIndex === targetZIndex) {
        data.zIndex = maxZIndex
      } else if (zIndex > targetZIndex) {
        data.zIndex--
      }
      return data
    })
    return {
      windosData: updatedWindowsData
    }
  },
  setWindoProps: ({ i, props }) => ({ windosData }) => {
    const data = Object.assign(windosData[i], props)
    windosData[i] = data
    return {
      windosData
    }
  }
}
