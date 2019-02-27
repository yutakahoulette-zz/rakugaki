import { sketches } from './sketches'
import { mergeReduce } from '../utils/mergeReduce'

export const state = mergeReduce({
  obj: { params: {}, showModal: false },
  arr: sketches,
  key: 'state'
})
