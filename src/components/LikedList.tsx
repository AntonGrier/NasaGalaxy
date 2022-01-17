import { Grid, Typography } from '@mui/material'
import { RouteComponentProps } from '@reach/router'
import { observer } from 'mobx-react'
import { FunctionComponent, useEffect, useState } from 'react'
import { useImageContext } from '../hooks'
import { getImage } from '../injectables'
import { UISkeleton } from '../ui'
import { sortNasaImageByDate } from '../utils'
import { ImageCard } from './ImageCard'

const BaseLikedList: FunctionComponent<RouteComponentProps> = () => {
  const [fetchingImages, setFetchingImages] = useState(false)
  const { likedImageSet, likedImages, setLikedImages } = useImageContext()

  useEffect(() => {
    const fetchLikedImages = async () => {
      setFetchingImages(true)
      const imageDates = Array.from(likedImageSet)
      const promises = imageDates.map((date) => getImage({ date }))
      const res = await Promise.all(promises)
      const dates = res
        .map((response) => response.data)
        .sort(sortNasaImageByDate)
      setLikedImages(dates)
      setFetchingImages(false)
    }
    fetchLikedImages()
  }, [likedImageSet, setLikedImages])

  return (
    <>
      <Typography
        component='h2'
        variant='h4'
        style={{
          marginTop: '100px',
          width: '100%',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Liked Posts
      </Typography>
      {fetchingImages ? (
        <div
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
        <Grid id='main' container spacing={4} style={{ marginTop: '10px' }}>
          {likedImages
            .filter((image) => likedImageSet.has(image.date))
            .map((image) => (
              <ImageCard
                key={image.date}
                image={image}
                isLiked={likedImageSet.has(image.date)}
              />
            ))}
        </Grid>
      )}
    </>
  )
}

export const LikedList = observer(BaseLikedList)
