import { clamp } from 'ramda'

export const getClampedDimensions = ({
  unitSize,
  maxSize,
  maxWidth,
  maxHeight,
  offsetY = 32,
  offsetX = 32
}) => {
  const { ENV = {} } = window
  const navHeight = ENV.navHeight || 0
  const disclaimerHeight = ENV.disclaimerHeight || 0
  offsetY = offsetY + navHeight + disclaimerHeight
  maxWidth = maxWidth || maxSize
  maxHeight = maxHeight || maxSize

  const widthPx = clamp(0, maxWidth, window.innerWidth - offsetX)
  const heightPx = clamp(0, maxHeight, window.innerHeight - offsetY)

  const [widthUnit, heightUnit] = [widthPx, heightPx].map((d) =>
    Math.floor(d / unitSize)
  )
  const widthPack = getPack(widthPx, widthUnit, unitSize)
  const heightPack = getPack(heightPx, heightUnit, unitSize)
  return {
    px: {
      width: widthPx,
      height: heightPx
    },
    unit: {
      width: widthUnit,
      height: heightUnit
    },
    pack: {
      width: widthPack,
      height: heightPack
    }
  }
}

export const getPack = (px, sq, unitSize) => (px - sq * unitSize) / 2
