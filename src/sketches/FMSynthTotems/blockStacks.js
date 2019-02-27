import { h } from 'hyperapp'

const coordsToStr = (coords) => {
  return coords.reduce((acc, arr) => {
    const points = arr.join(',')
    return `${acc} ${points}`
  }, '')
}

export const BlockStacks = ({ actions, state }) => {
  const { coordStacks, playingIndexes, clickPlayingIndexes, isPlaying } = state
  return coordStacks.map((coordStack, i) =>
    coordStack.map((coords, ii) => {
      const playingIndex = playingIndexes[i]
      const points = coordsToStr(coords)
      let fill = false
      if (isPlaying) {
        fill = ii === playingIndex
      } else {
        fill = Boolean((clickPlayingIndexes[i] || {})[ii])
      }
      const fillColor = fill ? 'black' : 'white'
      // Takes 4 points and draws them like:
      // 4----3
      // |    |
      // |    |
      // 1----2
      return (
        <polygon
          class={isPlaying ? '' : 'pointer'}
          onclick={() => {
            if (isPlaying) {
              return
            }
            actions.toggleBlockNote({ stackIndex: i, noteIndex: ii })
          }}
          points={points}
          fill={fillColor}
          stroke="black"
        />
      )
    })
  )
}
