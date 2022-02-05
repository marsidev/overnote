export const basicButtonVariants = {
  initial: { scale: 1 },
  tap: { scale: 0.9, transition: { duration: 0.1, ease: 'easeOut' } },
  hover: { scale: 1.1, transition: { duration: 0.1, ease: 'easeOut' } }
}

export const notesContainerVariants = {
  initial: {
    scale: 0.4,
    opacity: 0.8,
    width: '90%',
    y: 600
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

export const floatingFormVariants = {
  initial: {
    top: '29%',
    left: '35%',
    width: '48px',
    height: '48px',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  animate: {
    left: '-1%',
    top: '0%',
    width: 'auto',
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

export const floatingButtonVariants = {
  initial: {
    opacity: 1,
    scale: 1,
    top: '80%',
    left: '80%'
  },
  animate: {
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.1, ease: 'easeOut' }
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.1, ease: 'easeOut' }
  }
}

export const signContainerVariants = {
  pre_launch: {
    scale: 0.4,
    opacity: 0.8,
    y: 600
  },
  launch: {
    scale: 1,
    opacity: 1,
    y: 65,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  pre_flip: {
    scale: 1,
    opacity: 1,
    y: 65
  },
  flip: {
    scale: 1,
    opacity: 1,
    y: 65,
    rotateY: 360,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}
