import { appColors } from '@Utils/theming'
const bgColors = appColors.backgroundColor

export const addProps = (object, props = {}) => {
  const _object = JSON.parse(JSON.stringify(object))
  return { ..._object, ...props }
}

export const getRandomKeyFromObject = obj => {
  const keys = Object.keys(obj)
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return randomKey
}

export const areEqual = (obj1, obj2) => {
  if (typeof obj1 !== typeof obj2) return false
  if (typeof obj1 === 'function') return obj1.toString() === obj2.toString()
  if (obj1 instanceof Object && obj2 instanceof Object) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false
    for (const p in obj1) {
      if (!areEqual(obj1[p], obj2[p])) return false
    }
    return true
  } else return obj1 === obj2
}

export const readColorPicked = (color, theme) => {
  const hexPickedColor = color.hex.toUpperCase()
  const newBgColor = hexPickedColor === '#000000'
    ? 'default'
    : Object.keys(bgColors).find(key => bgColors[key][theme].toUpperCase() === hexPickedColor)
  return newBgColor
}

export const sortNotes = notes => {
  // sort by updatedAt
  notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

  // move pinned notes to the top
  const pinnedNotes = notes.filter(note => note.pinned)
  const unpinnedNotes = notes.filter(note => !note.pinned)
  return [...pinnedNotes, ...unpinnedNotes]
}
