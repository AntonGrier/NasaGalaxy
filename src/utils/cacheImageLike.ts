const LIKED_IMAGE_STORE = 'LIKED_IMAGES'

export const cacheImageLike = (imageDate: string) => {
  const prevStore = JSON.parse(localStorage.getItem(LIKED_IMAGE_STORE) || '{}')
  const newStore = JSON.stringify({ ...prevStore, [imageDate]: true })
  localStorage.setItem(LIKED_IMAGE_STORE, newStore)
}

export const removeImageLike = (imageDate: string) => {
  const prevStore = JSON.parse(localStorage.getItem(LIKED_IMAGE_STORE) || '{}')
  if (imageDate in prevStore) {
    delete prevStore[imageDate]
  }
  const newStore = JSON.stringify(prevStore)
  localStorage.setItem(LIKED_IMAGE_STORE, newStore)
}

export const getCachedLikes = (): string[] => {
  const prevStore = JSON.parse(localStorage.getItem(LIKED_IMAGE_STORE) || '{}')
  return Object.keys(prevStore)
}
