import React from 'react'
import { Button, List, Icon } from 'semantic-ui-react'

const Note = ({ note, toggleImportance, user, deleteNote }) => {
  const label = note.important
    ? 'check as not important'
    : 'check as important'

  return (
    <List.Item>
      <List.Content floated='right'>
        {!user
          ? null
          : (
            <>
              <Button size='mini' animated='vertical' onClick={deleteNote} id={'delete-' + note.id}>
                <Button.Content hidden>Delete</Button.Content>
                <Button.Content visible>
                  <Icon name='trash' />
                </Button.Content>
              </Button>

              <Button color='pink' size='mini' onClick={toggleImportance} id={`important-${note.id}`}>
                {label}
              </Button>
            </>
            )}
      </List.Content>
      <List.Content className='note' id={`note-${note.id}`}>{note.content}</List.Content>
    </List.Item>
  )
}

export default Note
