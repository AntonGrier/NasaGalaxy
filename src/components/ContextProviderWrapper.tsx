import { FunctionComponent } from 'react'
import { ImageStoreProvider } from '../hooks'

// Multiple Context Providers are chained here
const PROVIDERS = [ImageStoreProvider]

export const ContextProviderWrapper: FunctionComponent = ({ children }) => (
  <>
    {PROVIDERS.reduceRight(
      (acc, Provider) => (
        <Provider>{acc}</Provider>
      ),
      children,
    )}
  </>
)
