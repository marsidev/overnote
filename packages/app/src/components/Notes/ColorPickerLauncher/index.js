// TODO: make my own color picker
import React from 'react'
import { Menu, MenuButton, MenuList, useColorModeValue, IconButton } from '@chakra-ui/react'
import { appColors } from '@Utils/theming'
import ColorPicker from '@uiw/react-color-github'

const colors = appColors.backgroundColor

const ColorPickerLauncher = ({ icon, handleChangeColor, noteIconProps }) => {
  const theme = useColorModeValue('light', 'dark')
  const colorArray = Object.keys(colors).map(color => {
    if (color === 'default') return 'default'
    return colors[color][theme]
  })

  const bgColor = useColorModeValue('#fff', '#1A202C')
  return (
    <Menu preventOverflow='bottom' placement='bottom-start' strategy='fixed'>
      <MenuButton
        as={IconButton}
        icon={icon}
        aria-label='Background color'
        transition='all 0.2s'
        {...noteIconProps}
      />
      <MenuList zIndex={10} height='40px' p={0} m={0} border={0}>
        <ColorPicker
          placement='TL'
          colors={colorArray}
          style={{
            width: '100%',
            height: '100%',
            marginTop: '0px',
            backgroundColor: bgColor,
            opacity: '0.8'
          }}
          onChange={color => handleChangeColor(color)}
        />
      </MenuList>
    </Menu>
  )
}

export default ColorPickerLauncher
