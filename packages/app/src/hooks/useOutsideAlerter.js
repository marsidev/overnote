import { useEffect } from 'react'

export const useOutsideHandler = (ref, handlerFunction, condition = true) => {
  useEffect(() => {
    // Check if user clicked outside of the ref
    const handleClickOutside = event => {
      if (condition && ref.current && !ref.current.contains(event.target)) {
        // console.log('You clicked outside of me!')
        handlerFunction(event)
      }
    }

    // Check if user pressed Esc key
    const handleKeyDown = event => {
      if (condition && event.key === 'Escape') {
        // console.log('You pressed Escape!')
        handlerFunction(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [ref, handlerFunction, condition])
}
