import { h } from 'hyperapp'
import picostyle from 'picostyle'

const style = picostyle(h)

const StyledNavButton = style('button')({
  border: 'none',
  background: 'none',
  cursor: 'pointer'
})

export const NavButton = ({ onclick, fontSize = '1.25rem' }, children) => (
  <StyledNavButton style={{ fontSize }} onclick={onclick}>
    {children}
  </StyledNavButton>
)
