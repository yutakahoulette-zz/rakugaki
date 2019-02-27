export const getHeightById = (id) => {
  const elm = document.getElementById(id)
  return (elm && elm.offsetHeight) || 0
}
