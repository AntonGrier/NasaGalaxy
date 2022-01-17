import { Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { NasaImageMetadata } from '../models'
import { LikeButton } from '../ui/LikeButton'
import { LoadingImage, UIModal, YoutubeEmbed } from '../ui'
import { getDateString } from '../utils'

interface ImageModalProps {
  image: NasaImageMetadata
  isLiked: boolean
  handleLike: () => void
  open: boolean
  handleClose: () => void
}

export const ImageModal: FunctionComponent<ImageModalProps> = ({
  image,
  isLiked,
  handleLike,
  open,
  handleClose,
}) => {
  const isVideo = image.media_type === 'video'

  return (
    <UIModal open={open} handleClose={handleClose}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '70%',
              height: '100%',
            }}
          >
            {isVideo ? (
              <YoutubeEmbed url={image.url} />
            ) : (
              <LoadingImage
                style={{
                  objectFit: 'cover',
                  maxWidth: '100%',
                  width: 'auto',
                  height: 'auto',
                }}
                alt={image.title}
                src={
                  image.media_type === 'video'
                    ? image.thumbnail_url
                    : image.hdurl
                }
              />
            )}
            <div
              style={{
                display: 'flex',
                background: '#777777',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '0.5px solid black',
              }}
            >
              <LikeButton
                title={image.title}
                isLiked={isLiked}
                handleLike={handleLike}
              />
              <Typography
                variant='caption'
                component='h3'
                style={{
                  fontWeight: 'bold',
                  marginRight: '10px',
                }}
              >
                {getDateString(image.date)}
              </Typography>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='body1'
            component='h2'
            style={{ fontWeight: 'bold' }}
          >
            {image.title}
          </Typography>
          <Typography variant='subtitle2' component='h3'>
            {image.explanation}
          </Typography>
        </div>
      </div>
    </UIModal>
  )
}
