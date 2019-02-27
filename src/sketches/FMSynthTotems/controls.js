import { h } from 'hyperapp'

import { init } from './init'
import { RangeField } from '../../ui/rangeField'
import { ControlsModal } from './controlsModal'
import { getSynthTitle } from './getSynthTitle'
import { COUNT, COL_WIDTH } from './consts'

export const Controls = ({ state, actions }) => {
  const { isPlaying, toneStacks, bpm, swing } = state
  return [
    <div id="controls">
      <div class="flex pb3">
        {new Array(COUNT).fill().map((_, i) => {
          return (
            <div class="tc" style={{ width: `${COL_WIDTH}%` }}>
              <a
                onclick={() => {
                  actions.set({
                    editIndex: i,
                    isShowingModal: true
                  })
                }}
                class="f6"
              >
                {getSynthTitle(i, toneStacks[i] || {}, true)}
              </a>
            </div>
          )
        })}
      </div>
      <div class="flex flex-wrap pa3">
        <Col>
          <button
            style={{ width: '67px' }}
            class="button button--small"
            onclick={actions.togglePlaying}
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>
          <button
            class="button button--small"
            onclick={() => {
              actions.reset()
              init(actions)
            }}
          >
            Reshuffle
          </button>
        </Col>
        <Col>
          <RangeField
            label="BPM"
            value={bpm}
            min={30}
            max={300}
            cb={actions.updateBpm}
          />
          <RangeField
            label="Swing"
            isPercent={true}
            value={swing}
            cb={actions.updateSwing}
          />
        </Col>
      </div>
    </div>,
    <ControlsModal actions={actions} state={state} />
  ]
}

const Col = ({}, children) => {
  return (
    <div class="flex justify-between justify-around-ns w-100 w-50-ns pt3">
      {children}
    </div>
  )
}
