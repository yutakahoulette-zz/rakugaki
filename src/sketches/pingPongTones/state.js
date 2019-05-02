import { SCALE_NAMES } from './consts'

export const defaultState = {
  segmentCoords: [],
  ballsData: [],
  ballsCollisions: {},
  cornerCoords: [],
  isShowingModal: false,
  editIndex: 0,
  isPlaying: false,
  isMuted: false,
  selectedScale: SCALE_NAMES[0]
}
export const state = { ...defaultState }
