import { Skeleton } from '@mui/material'
import { FunctionComponent } from 'react'

interface UISkeletonProps {
  heights: number[]
}
export const UISkeleton: FunctionComponent<UISkeletonProps> = ({ heights }) => {
  return (
    <>
      {heights.map((height, idx) => (
        <Skeleton
          style={{ marginBottom: '-200px' }}
          key={idx}
          width='30rem'
          height={height}
        />
      ))}
    </>
  )
}
