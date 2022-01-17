import { IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import clsx from 'clsx'
import { FunctionComponent } from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  imageThumbnail: {
    width: '100%',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
  likedImageStyle: { color: 'red' },
})

interface LikeButtonProps {
  isLiked: boolean
  handleLike: () => void
}

export const LikeButton: FunctionComponent<LikeButtonProps> = ({
  isLiked,
  handleLike,
}) => {
  const { likedImageStyle } = useStyles()

  return (
    <IconButton
      onClick={handleLike}
      className={clsx(
        isLiked ? `${likedImageStyle} likedAnimation` : 'unlikedAnimation',
      )}
      children={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    />
  )
}
