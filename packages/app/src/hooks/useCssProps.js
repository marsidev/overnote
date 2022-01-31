import { useEffect } from 'react'

export const useCssProps = theme =>
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--placeholder-color',
      theme === 'light' ? 'rgba(0, 0, 0, 0.62)' : 'rgba(255, 255, 255, 0.62)'
    )

    document.documentElement.style.setProperty(
      '--scrollbar-thumb-bg',
      theme === 'light' ? 'rgba(0, 0, 0, 0.36)' : 'rgba(255, 255, 255, 0.28)'
    )

    document.documentElement.style.setProperty(
      '--scrollbar-thumb_hover-bg',
      theme === 'light' ? '#4A5568' : '#718096'
    )

    document.documentElement.style.setProperty(
      '--scrollbar-track-bg',
      theme === 'light' ? '#FFFFFF' : '#1A202C'
    )
  }, [theme])
