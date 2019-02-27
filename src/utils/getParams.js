export const getParams = () =>
  window.location.search
    .replace('?', '')
    .split('&')
    .reduce((acc, curr) => {
      const [key, val] = curr.split('=')
      return Object.assign({ [key]: val }, acc)
    }, {})
