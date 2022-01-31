import React from 'react'
import { Box, IconButton, ButtonGroup, Button, useColorModeValue } from '@chakra-ui/react'
import { MdOutlinePalette, MdOutlinePushPin, MdPushPin } from 'react-icons/md'
import ColorPickerLauncher from '@Notes/ColorPickerLauncher'
import { addProps } from '@Utils/funcs'
import { AddNoteFormProps } from '@Utils/props'

const { iconsProps, buttonProps } = AddNoteFormProps()

const IconsGroup = (props) => {
  const {
    newNoteContent,
    newNoteTitle,
    newPinnedStatus,
    handleSubmit,
    handleChangeColor,
    updateNewPinnedStatus,
    launchedBy
  } = props

  const bgColor = useColorModeValue(
    'rgba(95, 99, 104, 0.157)',
    'rgba(154, 160, 166, 0.157)'
  )

  const _iconsProps = addProps(iconsProps, { _hover: { ...iconsProps._hover, bg: bgColor } })
  const _buttonProps = addProps(buttonProps, { _hover: { ...buttonProps._hover, bg: bgColor } })

  return (
    <Box display='flex' zIndex={3}>
      <ButtonGroup variant='ghost' spacing='0' ml={-2}>
        <IconButton
          icon={newPinnedStatus ? <MdPushPin /> : <MdOutlinePushPin />}
          aria-label={'Pin note'}
          onClick={updateNewPinnedStatus}
          {..._iconsProps}
        />

        <ColorPickerLauncher
          icon={<MdOutlinePalette />}
          noteIconProps={_iconsProps}
          handleChangeColor={handleChangeColor}
        />

        <Button
          type='submit'
          size={buttonProps.size}
          onClick={handleSubmit}
          {..._buttonProps}
        >
          {(newNoteContent?.length > 0 || newNoteTitle?.length > 0) &&
          launchedBy !== 'NoteDetail'
            ? 'Save note'
            : 'Close'}
        </Button>
      </ButtonGroup>
    </Box>
  )
}

export default IconsGroup
