import { h } from 'hyperapp'

import { Modal } from '../../ui/modal'
import { SelectField } from '../../ui/selectField'
import { RangeField } from '../../ui/rangeField'
import { getSynthTitle } from './getSynthTitle'
import { WAVES, PATTERN_TYPES } from './consts'
import { gainToDb } from '../../utils/gainToDb'

export const ControlsModal = ({ actions, state }) => {
  const { toneStacks, editIndex, isShowingModal, clickPlayingIndexes } = state
  const toneStack = toneStacks[editIndex]
  const {
    interval,
    patternType,
    release,
    volume,
    portamento,
    oscillator,
    harmonicity,
    modulation,
    modulationIndex,
    detune,
    feedback,
    delayTime
  } = toneStack || {}
  const isDroning = Object.keys(clickPlayingIndexes).length > 0
  return (
    <Modal
      title={getSynthTitle(editIndex, toneStack || {})}
      isShowing={isShowingModal}
      hideFn={() => {
        actions.set({
          isShowingModal: false
        })
      }}
    >
      <div class="flex flex-wrap">
        <Col>
          <SelectField
            options={WAVES}
            label="Oscillator wave"
            selected={oscillator}
            cb={updateToneStack({
              actions,
              path: ['oscillator', 'type'],
              key: 'oscillator',
              toneProp: 'synth'
            })}
          />
        </Col>
        <Col>
          <SelectField
            options={WAVES}
            label="Modulation wave"
            selected={modulation}
            cb={updateToneStack({
              actions,
              path: ['modulation', 'type'],
              key: 'modulation',
              toneProp: 'synth'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Volume"
            isPercent={true}
            value={volume}
            cb={updateToneStack({
              transform: gainToDb,
              actions,
              key: 'volume',
              path: ['volume', 'value'],
              toneProp: 'synth'
            })}
          />
        </Col>
        <Col hide={isDroning}>
          <RangeField
            label="Release"
            value={release}
            isPercent={true}
            min={1}
            max={200}
            cb={updateToneStack({ actions, key: 'release' })}
          />
        </Col>
        <Col hide={isDroning}>
          <SelectField
            options={PATTERN_TYPES}
            label="Pattern"
            selected={patternType}
            cb={updateToneStack({
              actions,
              key: 'patternType',
              path: ['pattern'],
              toneProp: 'pattern'
            })}
          />
        </Col>
        <Col hide={isDroning}>
          <RangeField
            label="Interval"
            value={interval}
            valueLabel={`1/${interval}`}
            min={1}
            max={32}
            cb={updateToneStack({
              actions,
              transform: (val) => `${val}n`,
              key: 'interval',
              path: ['interval'],
              toneProp: 'pattern'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Harmonicity"
            value={harmonicity}
            min={0}
            max={10}
            cb={updateToneStack({
              actions,
              key: 'harmonicity',
              path: ['harmonicity', 'value'],
              toneProp: 'synth'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Modulation index"
            value={modulationIndex}
            min={0}
            max={100}
            cb={updateToneStack({
              actions,
              key: 'modulationIndex',
              path: ['modulationIndex', 'value'],
              toneProp: 'synth'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Delay time"
            isPercent={true}
            value={delayTime}
            cb={updateToneStack({
              actions,
              key: 'delayTime',
              path: ['delayTime', 'value'],
              toneProp: 'delay'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Delay feedback"
            isPercent={true}
            value={feedback}
            max={99}
            cb={updateToneStack({
              actions,
              key: 'feedback',
              path: ['feedback', 'value'],
              toneProp: 'delay'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Portamento"
            isPercent={true}
            value={portamento}
            cb={updateToneStack({
              actions,
              key: 'portamento',
              path: ['portamento'],
              toneProp: 'synth'
            })}
          />
        </Col>
        <Col>
          <RangeField
            label="Detune"
            isPercent={true}
            value={detune}
            min={-100}
            cb={updateToneStack({
              actions,
              transform: (percent) => percent * 100,
              key: 'detune',
              path: ['detune', 'value'],
              toneProp: 'synth'
            })}
          />
        </Col>
      </div>
      <p>Tip: type 'x' on your keyboard to close the modal.</p>
    </Modal>
  )
}

const updateToneStack = ({ actions, path, key, toneProp, transform }) => (
  val
) => {
  actions.updateToneStack({ path, key, val, toneProp, transform })
}
const Col = ({ hide }, children) => {
  return !hide && <div class="w-50 pb3">{children}</div>
}
