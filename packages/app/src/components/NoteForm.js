import React, { useRef, useState } from 'react'
import Togglable from './Togglable.js'
import { Form, Header } from 'semantic-ui-react'

export default function NoteForm ({ addNote }) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: false
    }

    addNote(noteObject)
    setNewNote('')
    // the following will close the togglable form
    // running the function that is referenced in the Togglable component (toggleVisibility)
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='Add a new note' ref={togglableRef}>
      <Header as='h3'>Create a new note</Header>

      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder='Write your note content'
          value={newNote}
          onChange={handleChange}
        />
        <Form.Button fluid primary type='submit' content='Save' />
      </Form>
    </Togglable>
  )
}
