import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { FunctionComponent } from 'react'

interface ModalProps {
  open: boolean
  handleClose: () => void
  fullscreen?: boolean
}

export const UIModal: FunctionComponent<ModalProps> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'fixed',
            overflowY: 'auto',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxHeight: '80%',
            bgcolor: 'background.paper',
            border: '2px solid #000000',
            boxShadow: 24,
            padding: 4,
          }}
        >
          {children}
        </Box>
      </Modal>
    </div>
  )
}
