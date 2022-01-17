import {
  Card,
  CardActionArea,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import VideocamTwoToneIcon from '@mui/icons-material/VideocamTwoTone'
import makeStyles from '@mui/styles/makeStyles'
import { FunctionComponent, useState } from 'react'
import { NasaImageMetadata } from '../models'
import { observer } from 'mobx-react'
import { useImageContext, useModal } from '../hooks'
import { FadeIn, LoadingImage } from '../ui'
import { LikeButton } from '../ui/LikeButton'
import { ImageModal } from './ImageModal'
import { getDateString } from '../utils'

const useStyles = makeStyles({
  root: {
    margin: '20px 0',
  },
  imageThumbnail: {
    width: '100%',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
})

interface ImageCardProps {
  image: NasaImageMetadata
  isLiked: boolean
}

const BaseImageCard: FunctionComponent<ImageCardProps> = ({
  image,
  isLiked,
}) => {
  const { root, imageThumbnail } = useStyles()
  const { open, handleOpen, handleClose } = useModal()
  const [textWrap, setTextWrap] = useState(true)
  const { likeImage, unlikeImage } = useImageContext()

  const isVideo = image.media_type === 'video'

  const handleLike = () => {
    if (isLiked) {
      unlikeImage(image.date)
    } else {
      likeImage(image.date)
    }
  }

  return (
    <Grid className={root} container item xs={12} justifyContent={'center'}>
      <FadeIn>
        <Card style={{ width: '35rem' }}>
          <ImageModal
            open={open}
            handleClose={handleClose}
            image={image}
            handleLike={handleLike}
            isLiked={isLiked}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <CardActionArea
              onClick={() => handleOpen()}
              aria-label={`Open Modal for post: ${image.title}`}
            >
              <LoadingImage
                className={imageThumbnail}
                alt={image.title}
                src={isVideo ? image.thumbnail_url : image.url}
                width='100%'
              />
              {isVideo && (
                <VideocamTwoToneIcon
                  fontSize='large'
                  style={{
                    color: 'white',
                    position: 'absolute',
                    bottom: '1%',
                    right: '1%',
                  }}
                />
              )}
            </CardActionArea>
            <div
              style={{
                background: '#777777',
                display: 'flex',
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
          <div style={{ padding: '10px' }}>
            <Typography
              variant='body1'
              component='h2'
              style={{ fontWeight: 'bold', width: '100%' }}
            >
              {image.title}
            </Typography>
            <Collapse in={!textWrap} collapsedSize={48}>
              <Typography
                onClick={() => setTextWrap((prev) => !prev)}
                variant='subtitle2'
                component='h3'
                lineHeight='normal'
              >
                {image.explanation}
              </Typography>
            </Collapse>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <IconButton
                aria-expanded={!textWrap}
                aria-label={`${
                  textWrap ? 'Expand' : 'Collapse'
                } description of post: ${image.title}`}
                size='small'
                style={{
                  transform: textWrap ? undefined : 'rotate(180deg)',
                  marginBottom: '-10px',
                  marginTop: '-5px',
                }}
                onClick={() => setTextWrap((prev) => !prev)}
                children={<ArrowDropDownIcon />}
              />
            </div>
          </div>
        </Card>
      </FadeIn>
    </Grid>
  )
}

export const ImageCard = observer(BaseImageCard)
