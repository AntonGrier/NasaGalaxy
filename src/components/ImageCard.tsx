import { Grid, IconButton, Paper, Typography } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import makeStyles from '@mui/styles/makeStyles'
import { FunctionComponent } from 'react'
import { NasaImageMetadata } from '../models'
import { observer } from 'mobx-react'
import { useImageContext } from '../hooks'
import clsx from 'clsx'
import { cacheImageLike, removeImageLike } from '../utils'

const useStyles = makeStyles({
  imageThumbnail: {
    width: '100%',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
  likedImageStyle: { color: 'red' },
})

interface ImageCardProps {
  image: NasaImageMetadata
  isLiked: boolean
}

const BaseImageCard: FunctionComponent<ImageCardProps> = ({
  image,
  isLiked,
}) => {
  const { imageThumbnail, likedImageStyle } = useStyles()
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
    <Grid container item xs={12} justifyContent={'center'}>
      <Paper style={{ width: '30%' }}>
        <img
          className={imageThumbnail}
          alt={image.title}
          src={isVideo ? image.thumbnail_url : image.url}
        />
        <IconButton
          style={{}}
          onClick={handleLike}
          className={clsx(isLiked && `${likedImageStyle} likedAnimation`)}
          children={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        />
        <Typography
          variant='body1'
          component='h2'
          style={{ fontWeight: 'bold' }}
        >
          {image.title}
        </Typography>
        <Typography noWrap variant='subtitle2' component='h3'>
          {image.explanation}
        </Typography>
        <Typography
          variant='body1'
          component='h2'
          style={{ fontWeight: 'bold' }}
        >
          {image.date}
        </Typography>
      </Paper>
    </Grid>
  )
}

export const ImageCard = observer(BaseImageCard)
