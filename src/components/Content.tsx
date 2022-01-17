import { Grid } from '@mui/material'
import { RouteComponentProps } from '@reach/router'
import { observer } from 'mobx-react'
import { FunctionComponent, useEffect, useState } from 'react'
import { useImageContext } from '../hooks'
import { getImages } from '../injectables'
import { UISkeleton } from '../ui'
import { dateToYYYYMMDD, sortNasaImageByDate } from '../utils'
import { ImageCard } from './ImageCard'

const BaseContent: FunctionComponent<RouteComponentProps> = () => {
  const {
    likedImageSet: likedImages,
    allImages,
    setAllImages,
  } = useImageContext()
  const [fetchingImages, setFetchingImages] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      setFetchingImages(true)

      const today = new Date()
      const lastMonth = new Date()
      lastMonth.setMonth(lastMonth.getMonth() - 1)
      const start_date = dateToYYYYMMDD(lastMonth)
      const end_date = dateToYYYYMMDD(today)

      const { data } = await getImages({
        start_date,
        end_date,
      })
      const sortedImages = data.sort(sortNasaImageByDate)
      setFetchingImages(false)
      setAllImages(sortedImages)
    }
    if (!allImages.length) fetchImages()
  }, [allImages, setAllImages])

  return fetchingImages ? (
    <div
      id='main'
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <UISkeleton heights={Array(2).fill(600)} />
    </div>
  ) : (
    <Grid container spacing={4} style={{ marginTop: '4%' }}>
      {allImages.map((image) => (
        <ImageCard
          key={image.date}
          image={image}
          isLiked={likedImages.has(image.date)}
        />
      ))}
    </Grid>
  )
}

export const Content = observer(BaseContent)
