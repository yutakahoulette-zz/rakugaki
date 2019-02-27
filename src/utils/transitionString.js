export const transitionString = ({ props, ms, ease = 'ease' }) =>
  props
    .map((s) => `${s} ${ms}ms ${ease}`)
    .join(', ')
    .trim()
