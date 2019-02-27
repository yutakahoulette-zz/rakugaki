import { formatMatrix } from './formatMatrix'

// Fonts based on
// https://fontmeme.com/fonts/dot-matrix-font/#previewtool

const A = formatMatrix(`
 00 
0  0
0  0
0000
0  0
0  0
0  0
`)

const B = formatMatrix(`
000 
0  0
0  0
000 
0  0
0  0
000 
`)

const C = formatMatrix(`
 00 
0  0
0   
0   
0   
0  0
 00 
`)

const D = formatMatrix(`
000 
0  0
0  0
0  0
0  0
0  0
000 
`)

const E = formatMatrix(`
0000
0   
0   
000 
0   
0   
0000
`)

const F = formatMatrix(`
0000
0   
0   
000 
0   
0   
0   
`)

const G = formatMatrix(`
 00 
0  0
0   
0   
0 00
0  0
 00 
`)

const H = formatMatrix(`
0  0
0  0
0  0
0000
0  0
0  0
0  0
`)

const I = formatMatrix(`
000
 0 
 0 
 0 
 0 
 0 
000
`)

const J = formatMatrix(`
 000
  0 
  0 
  0 
  0 
0 0 
 0  
`)

const K = formatMatrix(`
0  0
0  0
0 0 
00  
0 0 
0  0
0  0
`)

const L = formatMatrix(`
0   
0   
0   
0   
0   
0   
0000
`)

const M = formatMatrix(`
0   0
00 00
0 0 0
0   0
0   0
0   0
0   0
`)

const N = formatMatrix(`
0   0
00  0
00  0
0 0 0
0  00
0  00
0   0
`)

const O = formatMatrix(`
 00 
0  0
0  0
0  0
0  0
0  0
 00 
`)

const P = formatMatrix(`
000 
0  0
0  0
000 
0   
0   
0   
`)

const Q = formatMatrix(`
 00 
0  0
0  0
0  0
0  0
0  0
 00 
   0
`)

const R = formatMatrix(`
000 
0  0
0  0
000 
0  0
0  0
0  0
`)

const S = formatMatrix(`
 000
0   
0   
 00 
   0
   0
000 
`)

const T = formatMatrix(`
00000
  0  
  0  
  0  
  0  
  0  
  0  
`)

const U = formatMatrix(`
0  0
0  0
0  0
0  0
0  0
0  0
 00 
`)

const V = formatMatrix(`
0   0
0   0
0   0
0   0
 0 0 
 0 0 
  0  
`)

const W = formatMatrix(`
0   0
0   0
0   0
0   0
0 0 0
00 00
0   0
`)

const X = formatMatrix(`
0   0
0   0
 0 0 
  0  
 0 0 
0   0
0   0
`)

const Y = formatMatrix(`
0   0
0   0
 0 0 
  0  
  0  
  0  
  0  
`)

const Z = formatMatrix(`
00000
    0
   0 
  0  
 0   
0    
00000
`)

const alpha = {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z
}

const zero = formatMatrix(`
 0 
0 0
0 0
0 0
0 0
0 0
 0 
`)

const one = formatMatrix(`
 0 
00 
 0 
 0 
 0 
 0 
000
`)

const two = formatMatrix(`
 00 
0  0
   0
  0 
 0  
0   
0000
`)

const three = formatMatrix(`
 00 
0  0
   0
  0 
   0
0  0
 00 
`)

const four = formatMatrix(`
  00
 0 0
0  0
0000
   0
   0
   0
`)

const five = formatMatrix(`
0000
0   
0   
0000
   0
0  0
 00 
`)

const six = formatMatrix(`
 00 
0   
0   
000 
0  0
0  0
 00 
`)

const seven = formatMatrix(`
0000
   0
   0
  0 
 0  
0   
0   
`)

const eight = formatMatrix(`
 000 
0   0
0   0
 000 
0   0
0   0
 000 
`)

const nine = formatMatrix(`
 000 
0   0
0   0
 0000
    0
    0
 000 
`)

const numbers = {
  '0': zero,
  '1': one,
  '2': two,
  '3': three,
  '4': four,
  '5': five,
  '6': six,
  '7': seven,
  '8': eight,
  '9': nine
}

const period = formatMatrix(`
 
 
 
 
 
 
0
`)

const comma = formatMatrix(`
 
 
 
 
 
 
 0
0 
`)

const semicolon = formatMatrix(`
  
  

 0
  
  
 0
0 
`)

const colon = formatMatrix(`
 
 
0
 
 
0
`)

const dollar = formatMatrix(`
  0 
 000
0   
 00 
   0
000 
 0  
`)

const apostrophe = formatMatrix(`
0
0


 
 
 
 
`)

const quotes = formatMatrix(`
0 0
0 0
   
   
   
   
   
`)

const bang = formatMatrix(`
0
0
0
0
0
 
0
`)

const question = formatMatrix(`
 000 
0   0
   0 
  0  
  0  
     
  0 
`)

const leftParam = formatMatrix(`
  0
 0 
0  
0  
0  
 0 
  0
`)

const rightParam = formatMatrix(`
0  
 0 
  0 
  0 
  0 
 0 
0  
`)

const symbols = {
  '.': period,
  ',': comma,
  ';': semicolon,
  ':': colon,
  $: dollar,
  "'": apostrophe,
  '"': quotes,
  '!': bang,
  '?': question,
  '(': leftParam,
  ')': rightParam
}

export const keyMap = [alpha, numbers, symbols].reduce((acc, obj) => {
  return Object.assign(acc, obj)
}, {})
