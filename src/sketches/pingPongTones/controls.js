import { h } from 'hyperapp'
import { COLORS, WAVES_ABBR, MAX_SPEED } from './consts'
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
  const { editIndex, isShowingModal, ballsData } = state
  const ballData = ballsData[editIndex] || {}
  const { attack, xSpeed, ySpeed, volume } = ballData
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
            label="Attack"
            value={attack}
            cb={updateBallData({
              actions,
              key: 'attack',
              path: ['envelope', 'attack'],
              prop: 'synth'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="X speed"
            value={Math.abs(xSpeed)}
            max={MAX_SPEED}
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
            max={MAX_SPEED}
            cb={(val) => {
              actions.updateBallData({
                key: 'ySpeed',
                val: ySpeed >= 0 ? val : -val
              })
            }}
          />
        </Col>
      </div>
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
