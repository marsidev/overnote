/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { useMobileDetect } from '@Hooks/useMobileDetect'
import { Box } from '@chakra-ui/react'

export const MobileView = ({ children, ...props }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useMobileDetect(setScreenWidth)

  useEffect(() => {
    const isMobile = screenWidth <= 768
    setIsMobile(isMobile)
  }, [screenWidth, isMobile])

  if (!isMobile) return null
  return <Box {...props}>{children}</Box>
}

export const DesktopView = ({ children, ...props }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)
  useMobileDetect(setScreenWidth)

  useEffect(() => {
    const isDesktop = screenWidth > 768
    setIsDesktop(isDesktop)
  }, [screenWidth, isDesktop])

  if (!isDesktop) return null
  return <Box {...props}>{children}</Box>
}

export const isMobile = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useMobileDetect(setScreenWidth)

  useEffect(() => {
    setIsMobile(screenWidth <= 768)
  }, [screenWidth, setIsMobile])

  return !!isMobile
}
