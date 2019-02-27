import { firstKeyVal } from './firstKeyVal'

// Takes an array of objects like:
// [{grid1: {state, actions, view}}]
export const mergeReduce = ({ arr, key, obj }) => {
  return arr.reduce((acc, curr) => {
    const [currKey, val] = firstKeyVal(curr)
    return Object.assign({ [currKey]: val[key] }, acc)
  }, obj)
}
