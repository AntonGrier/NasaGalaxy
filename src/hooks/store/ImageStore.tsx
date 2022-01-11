import { action, makeAutoObservable, observable } from 'mobx'
import { createContext, FunctionComponent, useContext } from 'react'
import { cacheImageLike, getCachedLikes, removeImageLike } from '../../utils'

interface IImageStore {
  likedImages: Set<string>
}

export class ImageStore implements IImageStore {
  @observable likedImages: Set<string>

  constructor() {
    makeAutoObservable(this)
    this.likedImages = new Set()
    this.reloadCachedImages()
  }

  @action reloadCachedImages = () => {
    const cachedLikedImages = getCachedLikes()
    this.likedImages.clear()

    for (const cachedImage of cachedLikedImages) {
      this.likedImages.add(cachedImage)
    }
  }

  @action likeImage = (imageDate: string) => {
    cacheImageLike(imageDate)
    this.likedImages.add(imageDate)
  }

  @action unlikeImage = (imageDate: string) => {
    removeImageLike(imageDate)
    this.likedImages.delete(imageDate)
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
