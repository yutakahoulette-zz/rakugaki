const abbreviateWave = (wave) => {
  switch (wave) {
    case 'sine':
      return 'sin'
    case 'triangle':
      return 'tri'
    case 'square':
      return 'sqr'
    case 'pwm':
      return 'pwm'
    default:
      return ''
  }
}

export const getSynthTitle = (
  i = 0,
  { oscillator = '', modulation = '' },
  abbreviate
) =>
  `${i + 1}.${abbreviate ? abbreviateWave(oscillator) : oscillator} ${
    abbreviate ? abbreviateWave(modulation) : modulation
  }`
