import React, { useState, useRef } from 'react'
import { Input, Box, useColorModeValue } from '@chakra-ui/react'
import { useFocus, useOutsideHandler, useCtrlEnterDetecter, useEnterKeyDetecter } from '@Hooks'
// import genToast from '@Components/Toast'
import IconsGroup from '@Notes/AddNoteForm/IconsGroup'
import TextareaAutosize from 'react-autosize-textarea'
import { readColorPicked } from '@Utils/funcs'
import { appColors } from '@Utils/theming'
import { AddNoteFormProps } from '@Utils/props'
// import { checkConnection } from '@Utils/connection'

const {
  containerProps,
  formContainerProps,
  contentInputPropsWhenFormClosed,
  titleInputProps,
  contentInputProps
} = AddNoteFormProps()

const borderColors = appColors.border
const bgColors = appColors.backgroundColor

const AddNoteForm = ({ addNote }) => {
  const [noteInputRef, setNoteInputFocus, setNoteInputBlur] = useFocus()
  const [newNoteContent, setNewNoteContent] = useState('')
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [pickedBgColor, setPickedBgColor] = useState('default')
  const [newPinnedStatus, setNewPinnedStatus] = useState(false)
  // const toast = useToast()

  const boxRef = useRef(null)
  const titleRef = useRef(null)

  const currentTheme = useColorModeValue('light', 'dark')

  const showMainForm = () => {
    setIsFormVisible(true)
    setTimeout(() => setNoteInputFocus(), 100)
  }

  const handleCloseForm = event => {
    handleSubmit(event)
    setIsFormVisible(false)
    setNoteInputBlur()
    setPickedBgColor('default')
  }

  const CtrlEnterHandler = event => {
    handleSubmit(event)
  }

  const enterPressedHandler = event => {
    if (document.activeElement === titleRef.current) {
      event.preventDefault()
      setNoteInputFocus()
    }
  }

  useOutsideHandler(boxRef, handleCloseForm, isFormVisible)
  useCtrlEnterDetecter(CtrlEnterHandler, isFormVisible)
  useEnterKeyDetecter(enterPressedHandler, isFormVisible)

  const handleSubmit = async event => {
    event.preventDefault()
    if (isFormVisible) {
      if (newNoteContent !== '' || newNoteTitle !== '') {
        // const state = await checkConnection()
        // if (state !== 'connected') {
        //   genToast({ toast, status: 'error', description: 'You are offline' })
        //   return
        // }

        const noteObject = {
          title: newNoteTitle,
          content: newNoteContent,
          pinned: newPinnedStatus,
          backgroundColor: pickedBgColor,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        setNewNoteContent('')
        setNewNoteTitle('')
        setIsFormVisible(false)
        setNoteInputBlur()
        setPickedBgColor('default')
        setNewPinnedStatus(false)
        // genToast({ toast, status: 'success', description: 'Note added!' })
        await addNote(noteObject)
      } else {
        setIsFormVisible(false)
      }
    } else {
      setIsFormVisible(false)
    }
  }

  const handleChangeColor = color => {
    const newBgColor = readColorPicked(color, currentTheme)
    setPickedBgColor(newBgColor)
  }

  const updateNewPinnedStatus = () => {
    setNewPinnedStatus(!newPinnedStatus)
  }

  const themeBorder = `1px solid 
    ${pickedBgColor === 'default' ? borderColors.default[currentTheme] : bgColors[pickedBgColor][currentTheme]}`

  const placeholderColor = useColorModeValue('rgba(0,0,0,0.6)', 'rgba(255,255,255,0.6)')
  const contentColor = useColorModeValue('#202124', '#e8eaed')

  const contentProps = isFormVisible
    ? contentInputProps
    : contentInputPropsWhenFormClosed

  return (
    <Box width={['90%', '70%%', '50%', '35%']} mb={[2, 4, 6, 6]}>
      <Box
        ref={boxRef}
        {...containerProps}
        border={isFormVisible && themeBorder}
        boxShadow={isFormVisible && containerProps.boxShadow}
        bg={isFormVisible && bgColors[pickedBgColor][currentTheme]}
      >
        <Box
          onFocus={!isFormVisible ? showMainForm : null}
          border={!isFormVisible && themeBorder}
          {...(!isFormVisible && formContainerProps)}
        >
          <form onSubmit={handleSubmit}>
            {isFormVisible && (
              <Input
                ref={titleRef}
                value={newNoteTitle}
                onChange={event => setNewNoteTitle(event.target.value)}
                color={contentColor}
                {...titleInputProps}
              />
            )}

            <TextareaAutosize
              ref={noteInputRef}
              value={newNoteContent}
              onChange={event => setNewNoteContent(event.target.value)}
              color={newNoteContent ? contentColor : placeholderColor}
              {...contentProps}
              style={{
                ...contentProps.style,
                fontWeight: newNoteContent ? '400' : '700'
              }}
            />

            {isFormVisible && (
              <IconsGroup
                newNoteContent={newNoteContent}
                newNoteTitle={newNoteTitle}
                newPinnedStatus={newPinnedStatus}
                handleSubmit={handleSubmit}
                handleChangeColor={handleChangeColor}
                updateNewPinnedStatus={updateNewPinnedStatus}
                launchedBy={'AddNoteForm'}
              />
            )}
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default AddNoteForm
