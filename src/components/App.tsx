import { ThemeProvider } from '@mui/styles'
import { Router } from '@reach/router'
import { theme } from '../ui'
import { Content } from './Content'
import { ContextProviderWrapper } from './ContextProviderWrapper'
import { LikedList } from './LikedList'
import { NavigationBar } from './NavigationBar'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ContextProviderWrapper>
        <NavigationBar>
          <Router id='router'>
            <Content path='/Starbound' />
            <LikedList path='/Starbound/liked' />
          </Router>
        </NavigationBar>
      </ContextProviderWrapper>
    </ThemeProvider>
  )
}
