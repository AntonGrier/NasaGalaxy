import { Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  DetailedHTMLProps,
  FunctionComponent,
  ImgHTMLAttributes,
  useState,
} from 'react'

const useStyles = makeStyles({
  visible: {
    display: 'block',
  },
  nonVisible: {
    display: 'none',
  },
})

export const LoadingImage: FunctionComponent<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = (props) => {
  const { visible, nonVisible } = useStyles()
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Skeleton
        width='100%'
        height='100%'
        style={{
          display: loaded ? 'none' : 'block',
        }}
      />
      <img
        {...props}
        onLoad={() => setLoaded(true)}
        className={loaded ? visible : nonVisible}
      />
    </>
  )
}
