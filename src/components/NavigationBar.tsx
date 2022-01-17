import { FunctionComponent, ReactElement } from 'react'
import { navigate } from '@reach/router'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import Slide from '@mui/material/Slide'

const HideOnScroll: FunctionComponent = ({ children }) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children as ReactElement}
    </Slide>
  )
}

export const NavigationBar: FunctionComponent = ({ children }) => {
  return (
    <>
      <HideOnScroll>
        <AppBar
          style={{
            backgroundColor: 'black',
          }}
        >
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Button
                onClick={() => navigate('/')}
                style={{ padding: '0 10px' }}
                aria-label={'Navigate Home'}
              >
                <Typography
                  style={{ fontFamily: 'fantasy' }}
                  color='white'
                  variant='h4'
                  component='h1'
                >
                  Starbound
                </Typography>
              </Button>
              <Link
                href='#main'
                className='skip-to-content-link'
                underline='none'
              >
                <Typography
                  className='skip-to-content-text'
                  variant='h6'
                  component='h2'
                >
                  Skip to Content
                </Typography>
              </Link>
            </div>
            <IconButton
              onClick={() => navigate('/liked')}
              aria-label='Navigate to Liked posts'
              style={{ color: 'white' }}
              children={<FavoriteBorderIcon />}
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {children}
    </>
  )
}
