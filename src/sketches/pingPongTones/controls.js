import { h } from 'hyperapp'
import {
  COLORS,
  WAVES_ABBR,
  MAX_SPEED,
  MIN_RELEASE,
  MAX_RELEASE
} from './consts'
import { Modal } from '../../ui/modal'
import { SelectField } from '../../ui/selectField'
import { RangeField } from '../../ui/rangeField'
import { gainToDb } from '../../utils/gainToDb'

function SynthTitle(i) {
  const dotSize = '0.75em'
  const dotStyle = {
    background: COLORS[i],
    height: dotSize,
    width: dotSize,
    'border-radius': dotSize
  }
  return [<div style={dotStyle} />, <span class="pl2">{WAVES_ABBR[i]}</span>]
}

const updateBallData = ({ actions, path, key, prop, transform }) => (val) => {
  actions.updateBallData({ path, key, val, prop, transform })
}

const Col = ({}, children) => {
  return <div class="w-50 pb3">{children}</div>
}

function ControlsModal({ state, actions }) {
  if (!state.isShowingModal) return
  const { editIndex, isShowingModal, ballsData } = state
  const ballData = ballsData[editIndex] || {}
  const {
    attack,
    xSpeed,
    ySpeed,
    volume,
    release,
    reverbRoomSize,
    reverbWet,
    chorusDelayTime,
    chorusDepth,
    chorusWet,
    delayTime,
    delayFeedback,
    delayWet,
    detune,
    portamento,
    octave
  } = ballData
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
      <div class="flex flex-wrap">
        <Col>
          <RangeField
            label="Volume"
            isPercent={true}
            value={volume}
            cb={updateBallData({
              transform: gainToDb,
              actions,
              key: 'volume',
              path: ['volume', 'value'],
              prop: 'synth'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Octave"
            value={octave}
            min={-2}
            max={2}
            cb={updateBallData({
              actions,
              key: 'octave'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Detune"
            isPercent={true}
            value={detune}
            min={-100}
            cb={updateBallData({
              actions,
              transform: (percent) => percent * 100,
              key: 'detune',
              path: ['detune', 'value'],
              prop: 'synth'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Portamento"
            isPercent={true}
            value={portamento}
            cb={updateBallData({
              actions,
              key: 'portamento',
              path: ['portamento'],
              prop: 'synth'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="X speed"
            value={Math.abs(xSpeed)}
            valueLabel={Math.abs(xSpeed) * 10}
            max={MAX_SPEED}
            step={0.1}
            cb={(val) => {
              actions.updateBallData({
                key: 'xSpeed',
                val: xSpeed >= 0 ? val : -val
              })
            }}
          />
        </Col>
        <Col>
          <RangeField
            label="Y speed"
            value={Math.abs(ySpeed)}
            valueLabel={Math.abs(ySpeed) * 10}
            max={MAX_SPEED}
            step={0.1}
            cb={(val) => {
              actions.updateBallData({
                key: 'ySpeed',
                val: ySpeed >= 0 ? val : -val
              })
            }}
          />
        </Col>
        <Col>
          <RangeField
            label="Release"
            step={100}
            value={release}
            valueLabel={release + 'ms'}
            min={MIN_RELEASE}
            max={MAX_RELEASE}
            cb={updateBallData({
              actions,
              key: 'release'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Attack"
            value={attack}
            valueLabel={attack + 'ms'}
            min={MIN_RELEASE}
            max={MAX_RELEASE}
            step={100}
            cb={updateBallData({
              actions,
              transform: (val) => val / 1000,
              key: 'attack',
              path: ['envelope', 'attack'],
              prop: 'synth'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Reverb size"
            value={reverbRoomSize}
            isPercent={true}
            cb={updateBallData({
              actions,
              key: 'reverbRoomSize',
              path: ['roomSize', 'value'],
              prop: 'reverb'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Reverb wet"
            value={reverbWet}
            isPercent={true}
            cb={updateBallData({
              actions,
              key: 'reverbWet',
              path: ['wet', 'value'],
              prop: 'reverb'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Chorus delay"
            value={chorusDelayTime}
            min={2}
            max={20}
            cb={updateBallData({
              actions,
              key: 'chorusDelayTime',
              path: ['delayTime'],
              prop: 'chorus'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Chorus depth"
            value={chorusDepth}
            isPercent={true}
            cb={updateBallData({
              actions,
              key: 'chorusDepth',
              path: ['depth'],
              prop: 'chorus'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Chorus wet"
            value={chorusWet}
            isPercent={true}
            cb={updateBallData({
              actions,
              key: 'chorusWet',
              path: ['wet', 'value'],
              prop: 'chorus'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Delay time"
            value={delayTime}
            isPercent={true}
            cb={updateBallData({
              actions,
              key: 'delayTime',
              path: ['delayTime', 'value'],
              prop: 'delay'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Delay feedback"
            value={delayFeedback}
            isPercent={true}
            cb={updateBallData({
              actions,
              key: 'delayFeedback',
              path: ['feedback', 'value'],
              prop: 'delay'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Delay wet"
            value={delayWet}
            isPercent={true}
            cb={updateBallData({
              actions,
              key: 'delayWet',
              path: ['wet', 'value'],
              prop: 'delay'
            })}
          />
        </Col>
      </div>
    </Modal>
  )
}

export function Controls(state, actions) {
  const { isPlaying, isMuted } = state
  const { togglePlay, toggleMute } = actions
  return [
    <div id="controls" class="container--narrow">
      <div class="flex pb4 pt3">
        {COLORS.map((_, i) => {
          return (
            <div class="w-25 tc" key={`synth-modal-trigger-${i}`}>
              <button
                class="flex items-center justify-center f6 ml-auto mr-auto button-link"
                onclick={() => {
                  actions.set({
                    editIndex: i,
                    isShowingModal: true
                  })
                }}
              >
                {SynthTitle(i)}
              </button>
            </div>
          )
        })}
      </div>
      <div class="flex pb4">
        <div>
          <button onclick={togglePlay} class="button" id="audio-context">
            {isPlaying ? 'Stop' : 'Play'}
          </button>
        </div>
        <div>
          <label for="mute" class="pr2">
            Mute
          </label>
          <input
            id="mute"
            type="checkbox"
            checked={isMuted}
            onchange={toggleMute}
          />
        </div>
        <SelectField options={['foo', 'bar']} label="Scale" />
      </div>
    </div>,
    <ControlsModal actions={actions} state={state} />
  ]
}
