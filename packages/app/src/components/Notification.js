import React from 'react'
import { Label } from 'semantic-ui-react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <Label basic color='red' style={{ width: '100%' }} size='huge'>
      {message}
    </Label>
  )
}

export default Notification
