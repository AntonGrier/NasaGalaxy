import { Content } from './Content'
import { ContextProviderWrapper } from './ContextProviderWrapper'

export const App = () => {
  return (
    <ContextProviderWrapper>
      <Content />
    </ContextProviderWrapper>
  )
}
