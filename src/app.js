if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.dispose(function() {
      window.location.reload()
    })
  }
}

import { app } from 'hyperapp'

window.ENV = {}

import { state } from './index/state'
import { actions } from './index/actions'
import { view } from './index/view'

app(state, actions, view, document.body)
