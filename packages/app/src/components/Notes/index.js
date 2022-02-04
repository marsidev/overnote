import React, { useState, useEffect } from 'react'
import { Box, Flex, Text, Divider, useDisclosure } from '@chakra-ui/react'
import noteService from '@Services/notes'
import Card from '@Notes/Card'
import AddNoteForm from '@Notes/AddNoteForm'
import { v4 as uuidv4 } from 'uuid'
import { sortNotes } from '@Utils/funcs'
import NoteDetail from '@Notes/NoteDetail'
import { motion } from 'framer-motion'
import { isMobile } from '@Components/DeviceDetect'
import FloatingAddButton from '@Notes/FloatingAddButton'
import FloatingForm from '@Notes/AddNoteForm/FloatingForm'

const NotesSegment = (props) => {
  const { title, notes, setSelectedId, deleteNote, updateNote, openNoteDetail } = props

  const pinnedNotes = notes.filter(note => note.pinned)
  const unpinnedNotes = notes.filter(note => !note.pinned)
  const notesToShow = title === 'Pinned' ? pinnedNotes : unpinnedNotes
  const notesNotShown = title === 'Pinned' ? unpinnedNotes.length : pinnedNotes.length
  const showTitle = notesNotShown > 0

  if (notesToShow.length === 0) return null

  return (
    <Box px={[0, 2, 3, 4]} pb={[6, 7, 8, 10]}>
      <Flex
        alignItems='center'
        justifyContent='center'
        flexWrap='wrap'
        direction={['column', 'row', 'row', 'row']}
      >
        {showTitle && (
          <Box w={'100%'}>
            <Text
              fontSize='xs'
              fontWeight='bold'
              align='left'
              color='var(--placeholder-color)'
              textTransform='uppercase'
            >
              {title}
            </Text>
            <Divider />
          </Box>
        )}

        {notesToShow.map(note => (
          <Box
            w={['100%', 'auto', 'auto', 'auto']}
            py={2}
            px={[0, 2, 2, 2]}
            key={note.id}
            onClick={() => setSelectedId(note.id)}
          >
            <Card
              note={note}
              deleteNote={deleteNote}
              updateNote={updateNote}
              openNoteDetail={openNoteDetail}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

const Notes = (props) => {
  const { user, notes, setNotes, handleLogout } = props
  const mobile = isMobile()

  const [selectedId, setSelectedId] = useState(null)

  const {
    isOpen: modalNoteIsOpen,
    onOpen: openNoteDetail,
    onClose: closeNoteDetail
  } = useDisclosure()

  const {
    isOpen: floatingFormIsOpen,
    onOpen: openFloatingForm,
    onClose: closeFloatingForm
  } = useDisclosure()

  const updateNotesLocally = notes => {
    notes = sortNotes(notes)
    setNotes(notes)
    window.localStorage.setItem('AppNoteNotes', JSON.stringify(notes))
    return notes
  }

  const injectNote = noteToInject => {
    if (!noteToInject) return
    const localNotes = JSON.parse(localStorage.getItem('AppNoteNotes'))
    const updatedLocalNotes = localNotes.map(note => {
      if (note.id === noteToInject.id) return noteToInject
      return note
    })
    updateNotesLocally(updatedLocalNotes)
  }

  const handleErrors = async error => {
    if (error?.response?.status === 401) {
      console.log('Unauthorized')
      window.localStorage.removeItem('AppNoteNotes')
      await handleLogout()
    } else {
      console.log(error?.response?.data?.error || `Server error 🤷‍♂️ ${error}`)
    }
  }

  const fetchNotes = async () => {
    try {
      let notes = await noteService.getAll({ user })
      notes = updateNotesLocally(notes)
      return notes
    } catch (error) {
      handleErrors(error)
    }
  }

  const addNote = async noteObject => {
    try {
      const newNoteId = uuidv4()
      const newNote = {
        ...noteObject,
        id: newNoteId
      }
      const newNotes = [...notes, newNote]

      updateNotesLocally(newNotes)
      console.log(`note ${newNoteId} saved on LS`)

      if (user) {
        // save note on server db
        const savedNote = await noteService.create(newNote)
        console.log(`note ${savedNote.id} saved on server`)

        // inject updated server note to the store
        injectNote(savedNote)
        console.log('LS updated with server note')
      }
    } catch (error) {
      handleErrors(error)
    }
  }

  const deleteNote = async id => {
    try {
      setSelectedId(null)
      const newNotes = notes.filter(e => e.id !== id)
      updateNotesLocally(newNotes)

      if (user) {
        await noteService.deleteNote(id)
        console.log(`Note ${id} deleted`)
      }
    } catch (error) {
      handleErrors(error)
    }
  }

  const updateNote = async (id, noteObject) => {
    try {
      const newNotes = notes.map(note => (note.id !== id ? note : noteObject))
      updateNotesLocally(newNotes)

      if (user) {
        const savedNote = await noteService.update(id, noteObject)
        injectNote(savedNote)
        console.log(`Note ${id} updated`)
        return savedNote
      } else {
        return noteObject
      }
    } catch (error) {
      handleErrors(error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchNotes().then(n => console.log('Notes fetched'))
    }
  }, [user])

  const containerVariants = {
    initial: {
      scale: 0.4,
      opacity: 0.8,
      width: '90%',
      y: '100%',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    animate: {
      scale: 1,
      opacity: 1,
      width: '90%',
      y: '0%',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial='initial'
      animate='animate'
    >
      <Box justify='center' align='center' mt={4}>
        <AddNoteForm addNote={addNote} />

        <Box pb={6}>
          <NotesSegment
            title='Pinned'
            notes={notes}
            setSelectedId={setSelectedId}
            deleteNote={deleteNote}
            updateNote={updateNote}
            openNoteDetail={openNoteDetail}
          />

          <NotesSegment
            title='Others'
            notes={notes}
            setSelectedId={setSelectedId}
            deleteNote={deleteNote}
            updateNote={updateNote}
            openNoteDetail={openNoteDetail}
          />
        </Box>

        {mobile && (
          <>
            <FloatingAddButton
              openFloatingForm={openFloatingForm}
              display={floatingFormIsOpen ? 'none' : 'flex'}
            />
            <FloatingForm
              addNote={addNote}
              floatingFormIsOpen={floatingFormIsOpen}
              closeFloatingForm={closeFloatingForm}
            />
          </>
        )}
      </Box>

      {selectedId && (
        <NoteDetail
          modalNoteIsOpen={modalNoteIsOpen}
          closeNoteDetail={closeNoteDetail}
          note={selectedId ? notes.find(note => note.id === selectedId) : null}
          updateNote={updateNote}
          setSelectedId={setSelectedId}
        />
      )}
    </motion.div>
  )
}

export default Notes
