import { values } from 'ramda'
export const firstKeyVal = (obj) => {
  return [Object.keys(obj)[0], values(obj)[0]]
}
