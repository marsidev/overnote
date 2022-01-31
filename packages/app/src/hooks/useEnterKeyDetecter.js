import { useEffect } from 'react'

export const useEnterKeyDetecter = (handlerFunction, condition = true) => {
  useEffect(() => {
    // Check if user pressed Enter
    const handleKeyDown = event => {
      if (condition && event.key === 'Enter' && !event.ctrlKey) {
        // console.log('You pressed Enter!')
        handlerFunction(event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlerFunction, condition])
}
