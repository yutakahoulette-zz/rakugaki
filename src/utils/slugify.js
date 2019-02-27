export const slugify = (st = '') =>
  st
    .trim()
    .toLowerCase()
    .replace(' ', '-')
