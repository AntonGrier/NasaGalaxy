import { Typography } from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'
import { getImages, NasaImageMetadata } from '../injectables'

export const Content: FunctionComponent = () => {
  const [images, setImages] = useState<NasaImageMetadata[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await getImages({
        start_date: '2022-01-01',
        end_date: '2022-01-09',
      })
      setImages(data)
    }
    fetchImages()
  }, [])

  return (
    <>
      <Typography>LIBRARY</Typography>
      {images.map((image, idx) => (
        <div>
          <Typography key={idx}>{image.title}</Typography>
          <img src={image.url} />
        </div>
      ))}
    </>
  )
}
