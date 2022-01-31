/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import { Input, Box, useColorModeValue, useToast } from '@chakra-ui/react'
import { useFocus, useOutsideHandler, useCtrlEnterDetecter, useEnterKeyDetecter } from '@Hooks'
import genToast from '@Components/Toast'
import IconsGroup from '@Notes/AddNoteForm/IconsGroup'
import TextareaAutosize from 'react-autosize-textarea'
import { addProps, readColorPicked } from '@Utils/funcs'
import { appColors } from '@Utils/theming'
import { AddNoteFormProps } from '@Utils/props'
import { checkConnection } from '@Utils/connection'
// import { motion, useAnimation } from 'framer-motion'

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
  const toast = useToast()

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
      console.log('titleRef is focused')
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
        const state = await checkConnection()
        if (state !== 'connected') {
          genToast({ toast, status: 'error', description: 'You are offline' })
          return
        }

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
        genToast({ toast, status: 'success', description: 'Note added!' })
        await addNote(noteObject)
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
    border: isFormVisible ? `1px solid ${themedBorderColor}` : 'none',
    boxShadow: isFormVisible ? themedboxShadow : 'none',
    bg: isFormVisible ? bgColors[pickedBgColor][currentTheme] : 'none'
  })

  const _formContainerProps = addProps(formContainerProps, {
    border: !isFormVisible ? `1px solid ${themedBorderColor}` : 'none',
    boxShadow: themedboxShadow
  })

  const contentFontWeight = newNoteContent ? '400' : '700'

  const _contentInputProps = addProps(contentInputProps, {
    style: {
      ...contentInputProps.style,
      fontWeight: contentFontWeight
    }
  })

  return (
    <Box w='35%' mb={10}>
      <Box ref={boxRef} {..._containerProps}>
        <Box
          onFocus={isFormVisible ? null : showMainForm}
          {...(!isFormVisible && _formContainerProps)}
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
              {...(!isFormVisible
                ? contentInputPropsWhenFormClosed
                : _contentInputProps)}
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
