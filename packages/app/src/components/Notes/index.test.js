import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Note from '@Notes/NoteDetail'

test.skip('renders content', () => {
  const note = {
    content: 'This is a test',
    pinned: true
  }

  const component = render(<Note note={note} />)

  component.getByText(note.content)
  // component.getByText(note.pinned) // this can't be tested without authentication
  expect(component.container).toHaveTextContent(note.content)

  // const li = component.container.querySelector('li')
  // const pretty = prettyDOM(li)
  // console.log(pretty)
})

// this can't be tested without authentication
test.skip('clicking the button calls event handler once', () => {
  const note = {
    content: 'This is a test',
    pinned: true
  }

  const mockHandler = jest.fn()

  const component = render(<Note note={note} toggleImportance={mockHandler} />)

  const button = component.getByText('check as not important')
  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})
