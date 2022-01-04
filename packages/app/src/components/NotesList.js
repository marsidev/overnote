import React from 'react'
import { List } from 'semantic-ui-react'
import Note from './Note'
import noteService from '../services/notes'

export default function Notes ({ notes, user, handleUpdateNotes, handleErrorMesage }) {
  const toggleImportanceOf = async id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    await noteService
      .update(id, changedNote)
      .then(returnedNote => {
        handleUpdateNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(e => {
        if (e.response.status === 401) {
          handleErrorMesage('You are not the owner of this note')
        } else {
          handleErrorMesage(e.response.data.error || 'Server error 🤷‍♂️')
        }
        setTimeout(() => {
          handleErrorMesage()
        }, 5000)
      })
  }

  const deleteNote = async id => {
    await noteService
      .deleteNote(id)
      .then(() => {
        // const index = notes.map(function (e) { return e.id }).indexOf(id)
        const index = notes.map(e => e.id).indexOf(id)
        if (index > -1) {
          notes.splice(index, 1)
          handleUpdateNotes([...notes])
        }
      })
      .catch(e => {
        if (e.response.status === 401) {
          handleErrorMesage('You are not the owner of this note')
        } else {
          handleErrorMesage(e.response.data.error || 'Server error 🤷‍♂️')
        }
      })
  }

  return (
    <List divided relaxed>
      {notes.map((note, i) => (
        <Note
          key={i}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          deleteNote={() => deleteNote(note.id)}
          user={user}
        />
      ))}
    </List>
  )
}
