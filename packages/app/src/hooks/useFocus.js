import { useRef } from 'react'

export const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus()
  }
  const setBlur = () => {
    htmlElRef.current && htmlElRef.current.blur()
  }
  return [htmlElRef, setFocus, setBlur]
}
