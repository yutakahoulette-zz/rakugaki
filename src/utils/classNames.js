export const classNames = (obj) =>
  Object.keys(obj)
    .reduce((arr, key) => (obj[key] ? arr.concat([key]) : arr), [])
    .join(' ')
