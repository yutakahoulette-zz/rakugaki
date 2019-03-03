import { BPM } from './consts'

export const state = {
  isPlaying: false,
  coordStacks: [],
  playingIndexes: [],
  clickPlayingIndexes: {},
  toneStacks: [],
  bpm: BPM,
  swing: 0,
  isShowingModal: false,
  editIndex: 0,
  isLoading: true
}
