import { Fade } from '@mui/material'
import { FunctionComponent, ReactElement } from 'react'

export const FadeIn: FunctionComponent = ({ children }) => (
  <Fade in={true} children={children as ReactElement} />
)
