import React from 'react'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import { MdInfoOutline, MdCheck, MdOutlineClose } from 'react-icons/md'

const DEFAULT_TOAST_DURATION = 3000
const DEFAULT_TOAST_POSITION = 'bottom-right'
const DEFAULT_TOAST_STATUS = 'info'

const genToast = ({ ...props }) => {
  const {
    toast,
    description,
    status = DEFAULT_TOAST_STATUS,
    duration = DEFAULT_TOAST_DURATION,
    position = DEFAULT_TOAST_POSITION
  } = props

  if (!toast || !description) return

  const ToastIcon = ({ ...props }) => {
    switch (status) {
      case 'success':
        return <MdCheck {...props} />
      case 'error':
        return <MdOutlineClose {...props} />
      case 'info':
        return <MdInfoOutline {...props} />
      default:
        return <MdInfoOutline {...props } />
    }
  }

  const bgToast = () => {
    switch (status) {
      case 'success':
        return 'teal.500'
      case 'error':
        return 'red.500'
      case 'info':
        return 'purple.500'
      default:
        return 'purple.500'
    }
  }

  toast({
    position,
    duration,
    render: () => (
      <Box
        color='white'
        pt={3}
        pb={3}
        bg={bgToast()}
        borderRadius={16}
        h='3.6rem'
        alignItems='center'
        display='flex'
      >
        <Grid
          templateColumns='repeat(5, 1fr)'
          templateRows='repeat(1, 1fr)'
          gap={0}
        >
          <GridItem
            rowSpan={1}
            colSpan={1}
            alignItems='center'
            display='flex'
            ml={4}
          >
            <ToastIcon size='1.1rem' color='#e8eaed' />
          </GridItem>

          <GridItem
            colSpan={4}
            rowSpan={1}
            ml={2}
            fontSize='.9rem'
            alignItems='center'
            display='flex'
          >
            {description}
          </GridItem>

          {/* <GridItem
            rowSpan={1}
            colSpan={1}
            alignItems='center'
            textAlign='right'
            pl='1.60rem'
            display='flex'
            // border='1px solid white'
          >
            <IconButton
              onClick={() => toast.close()}
              icon={<MdClose />}
              aria-label='Close toast'
              variant='ghost'
              borderRadius={50}
              fontSize='1.1rem'
              color='#e8eaed'
              opacity={0.71}
              _hover={{
                opacity: 0.87,
                bg: 'rgba(255, 255, 255, 0.18)'
              }}
              size='sm'
            />
          </GridItem> */}

        </Grid>
      </Box>
    )
  })
}

export default genToast
