import { FunctionComponent } from 'react'

interface YoutubeEmbedProps {
  url: string
}

export const YoutubeEmbed: FunctionComponent<YoutubeEmbedProps> = ({ url }) => (
  <div className='video-responsive' style={{ height: '20rem', width: '100%' }}>
    <iframe
      width='100%'
      height='100%'
      src={url}
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title='Embedded youtube'
    />
  </div>
)
