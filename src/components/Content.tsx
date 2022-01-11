import { Grid, Typography } from '@mui/material'
import { observer } from 'mobx-react'
import { FunctionComponent, useEffect, useState } from 'react'
import { useImageContext } from '../hooks'
import { getImages } from '../injectables'
import { NasaImageMetadata } from '../models'
import { ImageCard } from './ImageCard'
import { NavigationBar } from './NavigationBar'

const BaseContent: FunctionComponent = () => {
  const { likedImages } = useImageContext()
  const [images, setImages] = useState<NasaImageMetadata[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await getImages({
        start_date: '2021-01-01',
        end_date: '2021-01-09',
      })
      setImages(data)
    }
    fetchImages()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#dddddd',
      }}
    >
      <NavigationBar />
      <Grid container spacing={4}>
        {images.map((image) => (
          <ImageCard
            key={image.date}
            image={image}
            isLiked={likedImages.has(image.date)}
          />
        ))}
      </Grid>
    </div>
  )
}

export const Content = observer(BaseContent)
