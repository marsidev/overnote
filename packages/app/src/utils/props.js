export const AddNoteFormProps = () => {
  const iconsProps = {
    variant: 'ghost',
    borderRadius: 50,
    fontSize: '1rem',
    opacity: 0.71,
    size: 'sm',
    _hover: {
      opacity: 0.87
    }
  }

  const buttonProps = {
    variant: 'ghost',
    size: 'sm',
    position: 'absolute',
    right: '1',
    opacity: 0.71,
    borderRadius: 6,
    fontSize: '.875rem',
    fontWeight: '600',
    letterSpacing: '.01785714em',
    lineHeight: '1.25rem',
    _hover: {
      opacity: 0.87
    }
  }

  const containerProps = {
    w: '100%',
    borderRadius: 8,
    p: 4,
    overflow: 'hidden',
    position: 'relative',
    align: 'left'
  }

  const formContainerProps = {
    borderRadius: 8,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '.00625em',
    mb: 2
  }

  const contentInputPropsWhenFormClosed = {
    type: 'text',
    placeholder: 'Take a note...',
    maxRows: 2,
    rows: 1,
    style: {
      fontWeight: '700',
      fontFamily: '"Open Sans", Roboto, Helvetica, Arial, sans-serif',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      letterSpacing: '.00625em',
      paddingTop: 8,
      paddingBottom: 2,
      paddingLeft: 12,
      resize: 'none',
      width: '100%'
    }
  }

  const titleInputProps = {
    type: 'text',
    placeholder: 'Title',
    fontWeight: '700',
    fontFamily: '"Open Sans", Roboto, Helvetica, Arial, sans-serif',
    variant: 'unstyled',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '.00625em',
    mb: 5
  }

  const contentInputProps = {
    type: 'text',
    placeholder: 'Take a note...',
    maxRows: 26,
    style: {
      fontWeight: 400,
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: '.875rem',
      lineHeight: '1.25rem',
      letterSpacing: '.01428571em',
      marginBottom: 5,
      resize: 'none',
      width: '100%'
    }
  }

  return {
    iconsProps,
    buttonProps,
    containerProps,
    formContainerProps,
    contentInputPropsWhenFormClosed,
    titleInputProps,
    contentInputProps
  }
}

export const CardProps = () => {
  const noteCardProps = {
    p: 4,
    maxWidth: '240px',
    w: ['8px', '100px', '150px', '240px'],
    // h: ['100px', '150px', '200px', '250px'],
    border: '1px solid',
    borderRadius: 8,
    boxSizing: 'border-box',
    transition: 'background-color 220ms ease-in-out, box-shadow 220ms ease-in-out, border-color 220ms ease-in-out',
    overflow: 'hidden',
    position: 'relative',
    align: 'left',
    whiteSpace: 'pre-line'
  }

  const noteTitleProps = {
    fontWeight: '700',
    fontSize: '.915rem',
    lineHeight: '1.5rem',
    letterSpacing: '.00625em',
    fontFamily: '"Open Sans", Roboto, Helvetica, Arial, sans-serif',
    noOfLines: [1, 2, 2, 3]
  }

  const noteContentProps = {
    fontWeight: '400',
    fontSize: '.850rem',
    lineHeight: '1.25rem',
    letterSpacing: '.01428571em',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    noOfLines: [4, 8, 10, 14]
  }

  const noteIconProps = {
    variant: 'ghost',
    borderRadius: 50,
    fontSize: '1rem',
    opacity: 0.71,
    size: 'sm',
    _hover: {
      opacity: 0.87
    }
  }

  const noteIconGroupProps = {
    variant: 'ghost',
    spacing: '0',
    // mt: -4,
    ml: -3,
    transition: 'all 180ms linear'
  }

  return {
    noteCardProps,
    noteTitleProps,
    noteContentProps,
    noteIconProps,
    noteIconGroupProps
  }
}
