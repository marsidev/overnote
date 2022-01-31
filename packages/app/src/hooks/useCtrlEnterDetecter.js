import { useEffect } from 'react'

export const useCtrlEnterDetecter = (handlerFunction, condition = true) => {
  useEffect(() => {
    // Check if user pressed Ctrl+Enter
    const handleKeyDown = event => {
      if (condition && event.key === 'Enter' && event.ctrlKey) {
        // console.log('You pressed Ctrl+Enter!')
        handlerFunction(event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlerFunction, condition])
}
