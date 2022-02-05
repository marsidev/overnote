import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, useColorModeValue, Box, Input } from '@chakra-ui/react'
import { AddNoteFormProps } from '@Utils/props'
import { appColors } from '@Utils/theming'
import IconsGroup from '@Notes/AddNoteForm/IconsGroup'
import TextareaAutosize from 'react-autosize-textarea'
import { readColorPicked } from '@Utils/funcs'
import { floatingFormVariants } from '@Utils/animations'

const { containerProps, titleInputProps, contentInputProps } = AddNoteFormProps()

const borderColors = appColors.border
const bgColors = appColors.backgroundColor

const Content = props => {
  const {
    handleSubmit,
    noteContent,
    noteTitle,
    bgColor,
    isPinned,
    setNoteContent,
    setNoteTitle,
    setBgColor,
    setPinned
  } = props

  const currentTheme = useColorModeValue('light', 'dark')

  const handleChangeColor = color => {
    const newBgColor = readColorPicked(color, currentTheme)
    setBgColor(newBgColor)
  }

  const themeBorder = `1px solid 
    ${
      bgColor === 'default'
        ? borderColors.default[currentTheme]
        : bgColors[bgColor][currentTheme]
    }`

  const placeholderColor = useColorModeValue('rgba(0,0,0,0.6)', 'rgba(255,255,255,0.6)')
  const contentColor = useColorModeValue('#202124', '#e8eaed')

  return (
    <Box
      border={themeBorder}
      boxShadow={containerProps.boxShadow}
      bg={bgColors[bgColor][currentTheme]}
      {...containerProps}
    >
      <form onSubmit={handleSubmit}>
        <Input
          value={noteTitle}
          onChange={event => setNoteTitle(event.target.value)}
          color={contentColor}
          {...titleInputProps}
        />

        <TextareaAutosize
          value={noteContent}
          onChange={event => setNoteContent(event.target.value)}
          color={noteContent ? contentColor : placeholderColor}
          {...contentInputProps}
          maxRows={noteContent ? contentInputProps.maxRows : 1}
          style={{
            ...contentInputProps.style,
            fontWeight: noteContent ? '400' : '700'
          }}
        />

        <IconsGroup
          newNoteContent={noteContent}
          newNoteTitle={noteTitle}
          newPinnedStatus={isPinned}
          handleSubmit={handleSubmit}
          handleChangeColor={handleChangeColor}
          updateNewPinnedStatus={() => setPinned(!isPinned)}
          launchedBy={'AddNoteForm'}
        />
      </form>
    </Box>
  )
}

const FloatingForm = props => {
  const { floatingFormIsOpen, closeFloatingForm, addNote } = props

  const [noteContent, setNoteContent] = useState('')
  const [noteTitle, setNoteTitle] = useState('')
  const [bgColor, setBgColor] = useState('default')
  const [isPinned, setPinned] = useState(false)

  const handleSubmit = async event => {
    event?.preventDefault()

    if (noteContent !== '' || noteTitle !== '') {
      // const state = await checkConnection()
      // if (state !== 'connected') {
      //   genToast({ toast, status: 'error', description: 'You are offline' })
      //   return
      // }

      const noteObject = {
        title: noteTitle,
        content: noteContent,
        pinned: isPinned,
        backgroundColor: bgColor,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setNoteContent('')
      setNoteTitle('')
      setBgColor('default')
      setPinned(false)
      handleClose()
      // genToast({ toast, status: 'success', description: 'Note added!' })
      await addNote(noteObject)
    } else handleClose()
  }

  const handleClose = () => closeFloatingForm()

  const contentProps = {
    handleSubmit,
    noteContent,
    noteTitle,
    bgColor,
    isPinned,
    setNoteContent,
    setNoteTitle,
    setBgColor,
    setPinned
  }

  return (
    <Modal
      isOpen={floatingFormIsOpen}
      onClose={closeFloatingForm}
      onEsc={handleSubmit}
      onOverlayClick={handleSubmit}
      isCentered
      blockScrollOnMount={false}
      size='xs'
    >
      <ModalOverlay />
      <ModalContent
        variants={floatingFormVariants}
        initial='initial'
        animate='animate'
        borderRadius={16}
        layoutId='add-note'
      >
        <Content {...contentProps} />
      </ModalContent>
    </Modal>
  )
}

export default FloatingForm
