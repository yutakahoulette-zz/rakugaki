export function downloadSVG({ svgData, title }) {
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)
  const downloadLink = document.createElement('a')
  downloadLink.href = svgUrl
  downloadLink.download = `${title}.svg`
  downloadLink.click()
}
