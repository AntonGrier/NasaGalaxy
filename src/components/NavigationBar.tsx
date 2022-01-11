import { FunctionComponent } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Typography } from '@mui/material'

export const NavigationBar: FunctionComponent = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#5C5C5C',
        marginBottom: '20px',
      }}
    >
      <div>
        <Typography color='white' variant='h5' component='h1'>
          Starbound
        </Typography>
      </div>
      <div>
        <FavoriteBorderIcon /> <BookmarkBorderIcon />
      </div>
    </div>
  )
}
