import { mergeReduce } from '../utils/mergeReduce'
import { getParams } from '../utils/getParams'
import { sketches } from './sketches'

export const actions = mergeReduce({
  obj: {
    render: () => (state) => state,
    setParams: () => {
      return {
        params: getParams()
      }
    },
    showModal: () => () => ({ showModal: true }),
    hideModal: () => () => ({ showModal: false })
  },
  arr: sketches,
  key: 'actions'
})
