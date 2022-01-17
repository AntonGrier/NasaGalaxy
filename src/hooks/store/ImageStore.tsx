import { action, makeAutoObservable, observable } from 'mobx'
import { createContext, FunctionComponent, useContext } from 'react'
import { NasaImageMetadata } from '../../models'
import { cacheImageLike, getCachedLikes, removeImageLike } from '../../utils'

interface IImageStore {
  allImages: NasaImageMetadata[]
  likedImages: NasaImageMetadata[]
  likedImageSet: Set<string>
}

export class ImageStore implements IImageStore {
  @observable allImages: NasaImageMetadata[]
  @observable likedImages: NasaImageMetadata[]
  @observable likedImageSet: Set<string>

  constructor() {
    makeAutoObservable(this)
    this.allImages = []
    this.likedImages = []
    this.likedImageSet = new Set()
    this.reloadCachedImages()
  }

  @action reloadCachedImages = () => {
    const cachedLikedImages = getCachedLikes()
    this.likedImageSet.clear()

    for (const cachedImage of cachedLikedImages) {
      this.likedImageSet.add(cachedImage)
    }
  }

  @action setAllImages = (images: NasaImageMetadata[]) => {
    this.allImages = images
  }

  @action setLikedImages = (images: NasaImageMetadata[]) => {
    this.likedImages = images
  }

  @action likeImage = (imageDate: string) => {
    cacheImageLike(imageDate)
    this.likedImageSet.add(imageDate)
  }

  @action unlikeImage = (imageDate: string) => {
    removeImageLike(imageDate)
    this.likedImageSet.delete(imageDate)
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
