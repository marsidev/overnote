import { useEffect } from 'react'

export const useMobileDetect = (setScreenWidth) => {
  const handleResize = () => setScreenWidth(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setScreenWidth])
}
