export const classNames = (obj, additionalClassNames = '') => {
  const classNames = Object.keys(obj)
    .reduce((arr, key) => (obj[key] ? arr.concat([key]) : arr), [])
    .join(' ')
  return additionalClassNames
    ? `${classNames} ${additionalClassNames.trim()}`
    : classNames
}
