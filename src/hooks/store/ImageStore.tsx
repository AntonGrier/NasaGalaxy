import { action, makeAutoObservable, observable } from 'mobx'
import { createContext, FunctionComponent, useContext } from 'react'

interface IImageStore {}

export class ImageStore implements IImageStore {
  constructor() {
    makeAutoObservable(this)
  }
}

const imageStore = new ImageStore()
export const ImageStoreContext = createContext<ImageStore>(imageStore)
export const useImageContext = () => useContext(ImageStoreContext)

export const ImageStoreProvider: FunctionComponent = ({ children }) => (
  <ImageStoreContext.Provider value={imageStore}>
    {children}
  </ImageStoreContext.Provider>
)
