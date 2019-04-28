import { h } from 'hyperapp'
import { NavButton } from './navButton'

export const Modal = ({ isShowing, title, hideFn }, children) => {
  let keyPressEv
  const classes =
    'top-0 bottom-0 left-0 right-0 bg-white fixed z-max overflow-auto'
  return (
    isShowing && (
      <div
        class={classes}
        style={{ opacity: 0.9 }}
        oncreate={() => {
          keyPressEv = window.addEventListener('keypress', (ev) => {
            if (ev.key && ev.key.toLowerCase() === 'x') {
              hideFn()
            }
          })
        }}
        ondestroy={() => {
          window.removeEventListener('keypress', keyPressEv)
        }}
      >
        <div class="container ph3 pt4 flex items-end flex-column">
          <NavButton fontSize="2rem" onclick={hideFn}>
            ×
          </NavButton>
        </div>
        <div class="container--narrow pa3">
          <h2 class="pb3">{title}</h2>
          {children}
        </div>
      </div>
    )
  )
}
