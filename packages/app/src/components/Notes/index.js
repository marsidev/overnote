import React, { useState, useEffect } from 'react'
import { Box, Flex, Text, Divider, useDisclosure } from '@chakra-ui/react'
import noteService from '@Services/notes'
import Card from '@Notes/Card'
import AddNoteForm from '@Notes/AddNoteForm'
import { v4 as uuidv4 } from 'uuid'
import { sortNotes } from '@Utils/funcs'
import NoteDetail from '@Notes/NoteDetail'

const NotesSegment = (props) => {
  const { title, notes, setSelectedId, deleteNote, updateNote, openNoteDetail } = props

  const pinnedNotes = notes.filter(note => note.pinned)
  const unpinnedNotes = notes.filter(note => !note.pinned)
  const notesToShow = title === 'Pinned' ? pinnedNotes : unpinnedNotes
  const notesNotShown = title === 'Pinned' ? unpinnedNotes.length : pinnedNotes.length
  const showTitle = notesNotShown > 0

  if (notesToShow.length === 0) return null

  return (
    <Box p={4}>
      <Flex
        alignItems='center'
        justifyContent='center'
        flexWrap='wrap'
        direction={{ base: 'column', md: 'row' }}
      >
        {showTitle && (
          <Box w={'100%'}>
            <Text
              fontSize='xs'
              fontWeight='bold'
              align={'left'}
              color={'var(--placeholder-color)'}
            >
              {title}
            </Text>
            <Divider />
          </Box>
        )}

        {notesToShow.map(note => (
          <div key={note.id} onClick={() => setSelectedId(note.id)}>
            <Box p={2}>
              <Card
                note={note}
                deleteNote={deleteNote}
                updateNote={updateNote}
                openNoteDetail={openNoteDetail}
              />
            </Box>
          </div>
        ))}
      </Flex>
    </Box>
  )
}

const Notes = ({ ...props }) => {
  const { user, handleLogout } = props
  const [notes, setNotes] = useState([])

  const [selectedId, setSelectedId] = useState(null)
  const {
    isOpen: modalNoteIsOpen,
    onOpen: openNoteDetail,
    onClose: closeNoteDetail
  } = useDisclosure()

  const updateNotesLocally = notes => {
    notes = sortNotes(notes)
    setNotes(notes)
    window.localStorage.setItem('AppNoteNotes', JSON.stringify(notes))
    return notes
  }

  const injectNote = noteToInject => {
    const localNotes = JSON.parse(localStorage.getItem('AppNoteNotes'))
    const updatedLocalNotes = localNotes.map(note => {
      if (note.id === noteToInject.id) return noteToInject
      return note
    })
    localStorage.setItem('AppNoteNotes', JSON.stringify(updatedLocalNotes))
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

      // save note on local storage
      updateNotesLocally(newNotes)
      console.log(`Temporary note ${newNoteId} added to LS`)

      // save note on server db
      const savedNote = await noteService.create(newNote)
      console.log(`note ${savedNote.id} saved on server`)

      // inject updated server note to the store
      injectNote(savedNote)
      console.log('LS updated with server note')
    } catch (error) {
      handleErrors(error)
    }
  }

  const deleteNote = async id => {
    try {
      setSelectedId(null)
      const newNotes = notes.filter(e => e.id !== id)
      updateNotesLocally(newNotes)
      await noteService.deleteNote(id)
      console.log(`Note ${id} deleted`)
    } catch (error) {
      handleErrors(error)
    }
  }

  const updateNote = async (id, noteObject) => {
    try {
      const newNotes = notes.map(note => (note.id !== id ? note : noteObject))
      updateNotesLocally(newNotes)
      const savedNote = await noteService.update(id, noteObject)
      injectNote(savedNote)
      console.log(`Note ${id} updated`)
      return savedNote
    } catch (error) {
      handleErrors(error)
    }
  }

  useEffect(() => {
    if (user) {
      const notes = window.localStorage.getItem('AppNoteNotes')
      if (notes) setNotes(JSON.parse(notes))
      fetchNotes()
      // .then((n) => console.log('Notes fetched', n))
    } else {
      updateNotesLocally([])
    }
  }, [user])

  return (
    <>
      <Box w='95%' justify='center' align='center' mt={4}>
        <AddNoteForm addNote={addNote} />

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

      {selectedId && (
        <NoteDetail
          modalNoteIsOpen={modalNoteIsOpen}
          closeNoteDetail={closeNoteDetail}
          note={selectedId ? notes.find(note => note.id === selectedId) : null}
          updateNote={updateNote}
          setSelectedId={setSelectedId}
        />
      )}
    </>
  )
}

export default Notes
