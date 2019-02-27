import { randomElm } from '../../utils/randomElm'

const ozuMovies = [
  'The Flavor of Green Tea over Rice, 1952',
  'Tokyo Story, 1953',
  'Early Spring, 1956',
  'Tokyo Twilight, 1957',
  'Equinox Flower, 1958',
  'Good Morning, 1959',
  'Floating Weeds, 1959',
  'Late Autumn, 1960',
  'The End of Summer, 1961',
  'An Autumn Afternoon, 1962'
]

export const state = {
  grid: [],
  ends: [],
  rawInput: randomElm(ozuMovies).toUpperCase(),
  dimensions: {
    px: {},
    unit: {}
  }
}
