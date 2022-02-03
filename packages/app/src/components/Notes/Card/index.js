import React, { useState } from 'react'
import { Box, useColorModeValue, Text, IconButton, ButtonGroup, useToast } from '@chakra-ui/react'
import { MdDelete, MdOutlinePalette, MdOutlinePushPin, MdPushPin } from 'react-icons/md'
import genToast from '@Components/Toast'
import ColorPickerLauncher from '@Notes/ColorPickerLauncher'
import { addProps, areEqual, readColorPicked } from '@Utils/funcs'
import { appColors } from '@Utils/theming'
import { CardProps } from '@Utils/props'

const { noteCardProps, noteTitleProps, noteContentProps, noteIconProps, noteIconGroupProps } = CardProps()

const CardTitle = ({ note, openNoteDetail, props }) => {
  if (note.title === '') return null
  return (
    <Box flex='1' onClick={openNoteDetail} p={0}>
      <Text {...props}>{note.title}</Text>
    </Box>
  )
}

const CardBody = ({ note, openNoteDetail, props }) => {
  if (note.content === '' && note.title !== '') return null
  const currentTheme = useColorModeValue('light', 'dark')

  return (
    <Box
      flex='1'
      h='70%'
      pt={note.title !== '' ? ['.25rem', '.55rem', '.65rem', '.75rem'] : '0'}
      onClick={openNoteDetail}
    >
      {note.content !== ''
        ? <Text {...props}>{note.content}</Text>
        : <Text
            color={currentTheme === 'light' ? 'gray.700' : 'gray.200'}
            fontStyle='italic'
            {...props}
          >
            Empty note
          </Text>
      }
    </Box>
  )
}

const CardFooter = (props) => {
  const { note, iconsOpacity, iconGroupProps, handlePinNote, iconProps, handleChangeColor, handleDelete } = props

  return (
    <Box flex='1' pt={[2, 3, 4, 4]} mb={-2}>
      <ButtonGroup opacity={iconsOpacity} {...iconGroupProps}>
        <IconButton
          icon={note.pinned ? <MdPushPin /> : <MdOutlinePushPin />}
          aria-label='Pin note'
          onClick={handlePinNote}
          {...iconProps}
        />

        <ColorPickerLauncher
          icon={<MdOutlinePalette />}
          noteIconProps={iconProps}
          handleChangeColor={handleChangeColor}
        />

        <IconButton
          icon={<MdDelete />}
          aria-label='Delete note'
          onClick={handleDelete}
          {...iconProps}
        />
      </ButtonGroup>
    </Box>
  )
}

const Card = ({ note, deleteNote, updateNote, openNoteDetail }) => {
  const toast = useToast()
  const [cardIconsOpacity, setCardIconsOpacity] = useState(0)
  const currentTheme = useColorModeValue('light', 'dark')

  const bgColors = appColors.backgroundColor
  const borderColors = appColors.border

  note = {
    title: note.title === '' ? 'Untitled' : note.title,
    backgroundColor:
      note.backgroundColor === '' ? 'default' : note.backgroundColor,
    ...note
  }

  const handleUpdate = async noteObject => {
    const { createdBy, ...prevNote } = note
    let { createdBy: createdByNew, ...newNote } = noteObject
    if (!areEqual(prevNote, newNote)) {
      console.log({ prevNote, newNote })
      newNote = {
        ...newNote,
        updatedAt: new Date().toISOString()
      }
      const updatedNote = await updateNote(note.id, newNote)
      console.log({ updatedNote })
    } else console.log('No changes')
  }

  const handleDelete = async () => {
    genToast({ toast, status: 'success', description: 'Note deleted!' })
    await deleteNote(note.id)
  }

  const handlePinNote = async () => {
    const noteObject = { ...note, pinned: !note.pinned }
    await handleUpdate(noteObject)
  }

  const handleChangeColor = async color => {
    const newBgColor = readColorPicked(color, currentTheme)
    const noteObject = { ...note, backgroundColor: newBgColor }
    await handleUpdate(noteObject)
  }

  // variable props
  const noteBoxShadow = 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'

  const noteBorderColor = note.backgroundColor === 'default'
    ? borderColors.default[currentTheme]
    : bgColors[note.backgroundColor][currentTheme]

  const iconsHoverBgColor = useColorModeValue(
    'rgba(95, 99, 104, 0.157)',
    'rgba(154, 160, 166, 0.457)'
  )
  const themedFontColor = useColorModeValue('#202124', '#e8eaed')

  // updating noteCardProps object
  const _noteCardProps = addProps(noteCardProps, {
    borderColor: noteBorderColor,
    boxShadow: noteBoxShadow,
    color: themedFontColor,
    bgColor: bgColors[note.backgroundColor][currentTheme]
  })

  const _noteIconProps = addProps(noteIconProps, {
    _hover: { ...noteIconProps._hover, bg: iconsHoverBgColor }
  })

  return (
    <Box
      display='flex'
      flexDirection='column'
      h='100%'
      p={2}
      onMouseEnter={() => setCardIconsOpacity(1)}
      onMouseLeave={() => setCardIconsOpacity(0)}
      {..._noteCardProps}
    >

      <CardTitle
        note={note}
        openNoteDetail={openNoteDetail}
        props={noteTitleProps}
      />

      <CardBody
        note={note}
        openNoteDetail={openNoteDetail}
        props={noteContentProps}
      />

      <CardFooter
        note={note}
        iconsOpacity={cardIconsOpacity}
        iconGroupProps={noteIconGroupProps}
        handlePinNote={handlePinNote}
        iconProps={_noteIconProps}
        handleChangeColor={handleChangeColor}
        handleDelete={handleDelete}
      />
    </Box>
  )
}

export default Card
