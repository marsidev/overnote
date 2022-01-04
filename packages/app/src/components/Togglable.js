import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '../i18n/index'
import { Button, Segment } from 'semantic-ui-react'

// This component is used to show/hide any children
// It's useful because it's reusable and can be used in multiple places
// it's useful to show/hide modals and forms
const Togglable = forwardRef(({ children, buttonLabel = 'show' }, ref) => {
  const [visible, setVisible] = useState(false)

  // the following is the logic for the toggleVisibility function - both components will be rendered but only one will be visible at a time
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Segment>
      <div style={hideWhenVisible}>
        <Button color='teal' onClick={toggleVisibility} fluid>
          {buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {/* show the children prop */}
        {children}
        <Button onClick={toggleVisibility} color='teal' fluid>
          {i18n.TOGGABLE.CANCEL_BUTTON}
        </Button>
      </div>
    </Segment>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string
}

export default Togglable
