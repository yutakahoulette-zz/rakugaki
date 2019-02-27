export const actions = {
  set: (obj) => () => obj,
  setPlayingIndex: ({ stackIndex, patternIndex }) => ({
    isPlaying,
    playingIndexes
  }) => {
    if (isPlaying) {
      playingIndexes[stackIndex] = patternIndex
    }
    return { playingIndexes }
  },
  playPatternNote: ({ note, time, stackIndex }) => ({ toneStacks }) => {
    const toneStack = toneStacks[stackIndex]
    const { synth, release } = toneStack
    synth.triggerAttackRelease(note, release, time)
  },
  toggleBlockNote: ({ stackIndex, noteIndex }) => ({
    toneStacks,
    clickPlayingIndexes
  }) => {
    const isClickPlaying = Boolean(
      (clickPlayingIndexes[stackIndex] || {})[noteIndex]
    )
    const toneStack = toneStacks[stackIndex]
    const { synth } = toneStack
    if (isClickPlaying) {
      synth.triggerRelease()
    } else {
      const { notes } = toneStack
      const note = notes[noteIndex]
      synth.triggerAttack(note, undefined)
    }
    clickPlayingIndexes[stackIndex] = { [noteIndex]: !isClickPlaying }
    return {
      clickPlayingIndexes
    }
  },
  togglePlaying: () => ({ Transport, isPlaying }) => {
    if (!Transport) {
      return
    }
    if (isPlaying) {
      Transport.pause()
    } else {
      Transport.start()
    }
    return {
      isPlaying: !isPlaying,
      clickPlayingIndexes: {}
    }
  },
  reset: () => ({ Transport, toneStacks }) => {
    Transport.stop()
    Transport.swing = 0
    toneStacks.forEach(({ pattern, synth }) => {
      pattern.dispose()
      synth.dispose()
    })
    return {
      isPlaying: false,
      isShowingModal: false,
      clickPlayingIndexes: {}
    }
  },
  updateBpm: (bpm) => ({ Transport }) => {
    Transport.bpm.value = bpm
    return {
      bpm
    }
  },
  updateSwing: (swing) => ({ Transport }) => {
    Transport.swing = swing
    return {
      swing
    }
  },
  updateToneStack: ({ key, val, path, toneProp, transform }) => ({
    editIndex,
    toneStacks
  }) => {
    if (path && toneProp) {
      const obj = toneStacks[editIndex][toneProp]
      const len = path.length
      path.reduce((acc, key, i) => {
        if (i === len - 1) {
          acc[key] = transform ? transform(val) : val
        }
        return acc[key]
      }, obj)
    }
    return updateToneStacks({
      toneStacks,
      editIndex,
      key,
      val
    })
  }
}

const updateToneStacks = ({ toneStacks, editIndex, key, val }) => {
  const toneStack = toneStacks[editIndex]
  toneStack[key] = val
  toneStacks[editIndex] = toneStack
  return { toneStacks }
}
