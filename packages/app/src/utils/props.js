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
    align: 'left',
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 4px 12px, rgba(0, 0, 0, 0.23) 0px 4px 4px'
  }

  const formContainerProps = {
    borderRadius: 8,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: '.00625em',
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 4px 12px, rgba(0, 0, 0, 0.23) 0px 4px 4px'
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
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: '.875rem',
      lineHeight: '1.25rem',
      letterSpacing: '.01428571em',
      marginBottom: 5,
      resize: 'none',
      width: '100%'
    }
  }

  const contentInputPropsWhenFormClosed = {
    type: 'text',
    placeholder: 'Take a note...',
    maxRows: 2,
    rows: 1,
    style: {
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
    p: [3, 3, 4, 4],
    width: ['100%', '160px', '200px', '240px'],
    // h: ['100px', '150px', '200px', '250px'],
    border: '1px solid',
    borderRadius: 8,
    boxSizing: 'border-box',
    transition: 'background-color 220ms ease-in-out, box-shadow 220ms ease-in-out, border-color 220ms ease-in-out',
    overflow: 'hidden',
    position: 'relative',
    align: 'left',
    whiteSpace: 'pre-line',
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
  }

  const noteTitleProps = {
    fontWeight: '700',
    fontSize: ['.860rem', '.885rem', '.900rem', '.915rem'],
    lineHeight: [1, 1.5, 1.75, 1.5],
    // letterSpacing: '.00625em',
    fontFamily: '"Open Sans", Roboto, Helvetica, Arial, sans-serif',
    noOfLines: [1, 2, 2, 3]
  }

  const noteContentProps = {
    fontWeight: '400',
    fontSize: '.850rem',
    lineHeight: [1, 1.25, 1.50, 1.25],
    // letterSpacing: '.01428571em',
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
