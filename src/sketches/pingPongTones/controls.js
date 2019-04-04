import { h } from 'hyperapp'
import { COLORS, WAVES_ABBR } from './consts'
import { Modal } from '../../ui/modal'
import { SelectField } from '../../ui/selectField'
import { RangeField } from '../../ui/rangeField'

function SynthTitle(i) {
  const dotSize = '0.75em'
  const dotStyle = {
    background: COLORS[i],
    height: dotSize,
    width: dotSize,
    'border-radius': '50%'
  }
  return [<div style={dotStyle} />, <span class="pl2">{WAVES_ABBR[i]}</span>]
}

function ControlsModal({ state, actions }) {
  const { editIndex, isShowingModal } = state
  const title = <div class="flex items-center">{SynthTitle(editIndex)}</div>
  return (
    <Modal
      title={title}
      isShowing={isShowingModal}
      hideFn={() => {
        actions.set({
          isShowingModal: false
        })
      }}
    >
      asdf
    </Modal>
  )
}

export function Controls(state, actions) {
  return [
    <div id="controls" class="flex container--narrow pb4 pt3">
      {COLORS.map((_, i) => {
        return (
          <div class="w-25">
            <a
              class="flex items-center justify-center f6"
              onclick={() => {
                actions.set({
                  editIndex: i,
                  isShowingModal: true
                })
              }}
            >
              {SynthTitle(i)}
            </a>
          </div>
        )
      })}
    </div>,
    <ControlsModal actions={actions} state={state} />
  ]
}
