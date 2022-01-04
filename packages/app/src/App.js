import React, { useState, useEffect } from 'react'
import { Container, Header, Button } from 'semantic-ui-react'
import Notification from './components/Notification'
import noteService from './services/notes'
import LoginForm from './components/LoginForm.js'
import NoteForm from './components/NoteForm.js'
import NotesList from './components/NotesList'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('AppNoteUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      if (user) noteService.setToken(user.token)
    }
  }, []) // empty array means that this effect will only run once

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('AppNoteUser')
  }

  const addNote = async noteObject => {
    await noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const handleLogin = ({ user, error }) => {
    setUser(user)
    window.localStorage.setItem('AppNoteUser', JSON.stringify(user))
    if (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  let notesToShow = []
  if (!user) notesToShow = []
  else {
    notesToShow = notes.filter(
      note => note.user.id === user.id || note.user === user.id
    )
    notesToShow = showAll
      ? notesToShow
      : notesToShow.filter(note => note.important)
  }

  return (
    <Container style={{ width: '40%', paddingTop: '5%' }}>
      <Header content='Notes' />

      {!errorMessage ? null : <Notification message={errorMessage} />}

      {user
        ? (
          <>
            <Button fluid color='orange' onClick={handleLogout} content='Logout' />
            <NoteForm addNote={addNote} />
          </>
          )
        : <LoginForm
            handleSubmit={handleLogin}
          />}

      <div>
        <Button fluid color='brown' onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important notes only' : 'all notes'}
        </Button>
      </div>

      <NotesList
        notes={notesToShow}
        user={user}
        handleUpdateNotes={setNotes}
        handleErrorMesage={setErrorMessage}
      />

    </Container>
  )
}

export default App
