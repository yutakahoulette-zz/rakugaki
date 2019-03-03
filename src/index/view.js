import { h } from 'hyperapp'
import { sketches } from './sketches'
import { firstKeyVal } from '../utils/firstKeyVal'
import { isTouchDevice } from '../utils/isTouchDevice'
import { getHeightById } from '../utils/getHeightById'
import { getParams } from '../utils/getParams'
import { Modal } from '../ui/modal'
import { NavButton } from '../ui/navButton'

const sketchesLen = sketches.length - 1

const setHeight = (id) => () => {
  window.ENV[`${id}Height`] = getHeightById(id)
}

const srcUrl = (path = '') =>
  `https://github.com/yutakahoulette/rakugaki/tree/master/src/sketches/${path}`

// History link used for managing pushState
const HistoryLink = ({ to, fn }, children) => {
  const onclick = (ev) => {
    ev.preventDefault()
    history.pushState(location.pathname, '', to)
    fn()
  }
  return (
    <a href={to} onclick={onclick}>
      {children}
    </a>
  )
}

const sketchLi = (actions) => {
  return sketches.map((sketch, i) => {
    const [_, val] = firstKeyVal(sketch)
    return val.wip ? null : (
      <li>
        <span>
          <HistoryLink to={`?sketch=${sketchesLen - i}`} fn={actions.setParams}>
            {val.title}
          </HistoryLink>
          <p class="f6 mt1 gray">{val.date.toLocaleDateString()}</p>
        </span>
      </li>
    )
  })
}

const Index = ({ actions }) => (
  <div class="container--narrow ph3 pv5">
    <nav>
      <h1 class="mb0">Rakugaki</h1>
      <p class="mb4">Creative coding sketches by Yutaka Houlette.</p>
      <p class="mb0 f6">
        These sketches are for learning and experimentation, so third-party
        libraries are generally not used, unless noted.
      </p>
      <p class="mb5">
        <a class="f6" target="_blank" href={srcUrl()}>
          Source code
        </a>
      </p>
      <ul>{sketchLi(actions)}</ul>
    </nav>
  </div>
)

const disclaimerText = `This sketch is best experienced on a non touch screen device 🙃`
const Disclaimer = () => (
  <div
    id="disclaimer"
    oncreate={setHeight('disclaimer')}
    class="pv2 ph3 f6 bb b--moon-gray bg-washed-red tc fixed top-0 left-0 right-0"
  >
    <p class="ma0">{disclaimerText}</p>
  </div>
)

const navClasses =
  'fixed bottom-0 left-0 right-0 bt b--moon-gray bg-white z-999'
const navContentClasses =
  'container ph3 pv2 flex items-center justify-between tc f6'
const Nav = ({ actions, title, description, showModal, path }) => (
  <nav
    id="nav"
    class={navClasses}
    ondestroy={actions.hideModal}
    oncreate={setHeight('nav')}
  >
    <div class={navContentClasses}>
      <HistoryLink to={`?`} fn={actions.setParams}>
        <NavButton>{'<'}</NavButton>
      </HistoryLink>
      <div class="truncate ph3">{title}</div>
      <NavButton onclick={actions.showModal}>?</NavButton>
    </div>
    <Modal isShowing={showModal} title={title} hideFn={actions.hideModal}>
      <p>{description}</p>
      {path && (
        <div class="pt4">
          <p>
            <a class="f6" target="_blank" href={srcUrl(path)}>
              Source code
            </a>
          </p>
        </div>
      )}
    </Modal>
  </nav>
)

const SketchWrapper = (
  { title, description, actions, showModal, noTouch, path = '' },
  children
) => {
  const showDisclaimer = noTouch && isTouchDevice()
  return (
    <div>
      {children}
      {showDisclaimer && <Disclaimer />}
      <Nav
        actions={actions}
        title={title}
        description={description}
        path={path}
        showModal={showModal}
      />
    </div>
  )
}

export const view = (state, actions) => {
  const sketchId = getParams().sketch || actions.params
  const sketch = sketchId && sketches[sketchesLen - Number(sketchId)]
  let page
  if (sketch) {
    const [key, val] = firstKeyVal(sketch)
    page = (
      <SketchWrapper
        actions={actions}
        title={val.title}
        description={val.description}
        showModal={state.showModal}
        noTouch={val.noTouch}
        path={val.path}
      >
        {val.view(state[key], actions[key])}
      </SketchWrapper>
    )
  } else {
    page = <Index actions={actions} />
  }
  return (
    <div
      oncreate={() => {
        window.addEventListener('pushstate', actions.setParams)
        window.addEventListener('popstate', actions.setParams)
      }}
      onremove={() => {
        window.removeEventListener('pushstate', actions.setParams)
        window.removeEventListener('popstate', actions.setParams)
      }}
    >
      {page}
    </div>
  )
}
