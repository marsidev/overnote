import React, { useState, useRef, useEffect } from 'react'
import { Modal, ModalOverlay, ModalContent, Box, Input, useColorModeValue } from '@chakra-ui/react'
import TextareaAutosize from 'react-autosize-textarea'
import IconsGroup from '@Notes/AddNoteForm/IconsGroup'
import { addProps, areEqual, readColorPicked } from '@Utils/funcs'
import { appColors } from '@Utils/theming'
import { AddNoteFormProps } from '@Utils/props'
import { useFocus, useEnterKeyDetecter, useCtrlEnterDetecter } from '@Hooks'

const { containerProps, titleInputProps, contentInputProps } = AddNoteFormProps()
const borderColors = appColors.border
const bgColors = appColors.backgroundColor

const Form = props => {
  const [noteInputRef, setNoteInputFocus] = useFocus()
  const currentTheme = useColorModeValue('light', 'dark')

  const {
    newNoteContent,
    setNewNoteContent,
    newNoteTitle,
    setNewNoteTitle,
    pickedBgColor,
    setPickedBgColor,
    newPinnedStatus,
    updateNewPinnedStatus,
    handleUpdate
  } = props

  const titleRef = useRef(null)

  useEffect(() => setNoteInputFocus(), [])

  const enterPressedHandler = event => {
    if (document.activeElement === titleRef.current) {
      event.preventDefault()
      setNoteInputFocus()
    }
  }

  const CtrlEnterHandler = event => {
    handleUpdate(event)
  }

  useEnterKeyDetecter(enterPressedHandler)
  useCtrlEnterDetecter(CtrlEnterHandler)

  const handleChangeColor = async color => {
    const newBgColor = readColorPicked(color, currentTheme)
    setPickedBgColor(newBgColor)
  }

  const themedBorderColor = pickedBgColor === 'default'
    ? borderColors.default[currentTheme]
    : bgColors[pickedBgColor][currentTheme]

  const placeholderColor = useColorModeValue('rgba(0,0,0,0.6)', 'rgba(255,255,255,0.6)')
  const contentColor = useColorModeValue('#202124', '#e8eaed')

  const themedboxShadow = useColorModeValue(
    'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
    'rgba(255, 255, 255, 0.12) 0px 4px 12px, rgba(255, 255, 255, 0.10) 0px 4px 4px'
  )

  const _containerProps = addProps(containerProps, {
    border: `1px solid ${themedBorderColor}`,
    boxShadow: themedboxShadow,
    bg: bgColors[pickedBgColor][currentTheme]
  })

  const contentFontWeight = newNoteContent ? '400' : '700'

  const _contentInputProps = addProps(contentInputProps, {
    style: {
      ...contentInputProps.style,
      fontWeight: contentFontWeight
    }
  })

  return (
    <Box {..._containerProps}>
      <form onSubmit={handleUpdate}>
        <Input
          ref={titleRef}
          value={newNoteTitle}
          onChange={event => setNewNoteTitle(event.target.value)}
          color={newNoteTitle ? contentColor : placeholderColor}
          {...titleInputProps}
        />

        <TextareaAutosize
          ref={noteInputRef}
          value={newNoteContent}
          onChange={event => setNewNoteContent(event.target.value)}
          color={newNoteContent ? contentColor : placeholderColor}
          {..._contentInputProps}
        />

        <IconsGroup
          newNoteContent={newNoteContent}
          newNoteTitle={newNoteTitle}
          newPinnedStatus={newPinnedStatus}
          handleUpdate={handleUpdate}
          handleChangeColor={handleChangeColor}
          updateNewPinnedStatus={updateNewPinnedStatus}
          launchedBy={'NoteDetail'}
        />
      </form>
    </Box>
  )
}

const NoteDetail = (props) => {
  const { modalNoteIsOpen, closeNoteDetail, note, updateNote, setSelectedId } = props

  if (!note) return null

  const [newNoteContent, setNewNoteContent] = useState(note.content || '')
  const [newNoteTitle, setNewNoteTitle] = useState(note.title || '')
  const [pickedBgColor, setPickedBgColor] = useState(note.backgroundColor || 'default')
  const [newPinnedStatus, setNewPinnedStatus] = useState(note.pinned || false)

  const updateNewPinnedStatus = () => {
    setNewPinnedStatus(!newPinnedStatus)
  }

  const handleUpdate = async event => {
    event?.preventDefault()
    const { createdBy, ...prevNote } = note
    let newNote = {
      title: newNoteTitle,
      content: newNoteContent,
      pinned: newPinnedStatus,
      backgroundColor: pickedBgColor,
      createdAt: prevNote.createdAt,
      updatedAt: prevNote.updatedAt,
      id: prevNote.id
    }
    if (!areEqual(prevNote, newNote)) {
      console.log({ prevNote, newNote })
      newNote = {
        ...newNote,
        updatedAt: new Date().toISOString()
      }
      const updatedNote = await updateNote(note.id, newNote)
      console.log({ updatedNote })
    } else console.log('No changes')
    handleClose()
  }

  const handleClose = () => {
    setSelectedId(null)
    closeNoteDetail()
  }

  const formProps = {
    newNoteContent,
    setNewNoteContent,
    newNoteTitle,
    setNewNoteTitle,
    pickedBgColor,
    setPickedBgColor,
    newPinnedStatus,
    updateNewPinnedStatus,
    handleUpdate,
    closeNoteDetail,
    note,
    updateNote
  }

  return (
    <>
      <Modal
        isOpen={modalNoteIsOpen}
        onClose={closeNoteDetail}
        onEsc={handleUpdate}
        onOverlayClick={handleUpdate}
        isCentered
        blockScrollOnMount={false}
        motionPreset='slideInBottom'
        size='xl'
      >
        <ModalOverlay />
        <ModalContent borderRadius={16}>
          <Form {...formProps} />
        </ModalContent>
      </Modal>
    </>
  )
}

export default NoteDetail
