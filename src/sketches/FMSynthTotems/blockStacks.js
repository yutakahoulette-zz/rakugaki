import { h } from 'hyperapp'
import { coordsToPoints } from '../../utils/coordsToPoints'

export function BlockStacks({ actions, state }) {
  const { coordStacks, playingIndexes, clickPlayingIndexes, isPlaying } = state
  return coordStacks.map((coordStack, i) =>
    coordStack.map((coords, ii) => {
      const playingIndex = playingIndexes[i]
      const points = coordsToPoints(coords)
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
