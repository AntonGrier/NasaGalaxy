import axios from 'axios'
import { NasaImageMetadata } from '../models'

const NASA_API_KEY = 'acPr7twdBH1nxguGu28anvKxPKuaVXbjwj0Jf8bG'
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod'

interface APODRangeProps {
  start_date: string
  end_date: string
}

interface APODSingleProps {
  date: string
}

export const getImages = ({ start_date, end_date }: APODRangeProps) =>
  axios.get<NasaImageMetadata[]>(NASA_APOD_URL, {
    params: { start_date, end_date, api_key: NASA_API_KEY, thumbs: true },
  })

export const getImage = ({ date }: APODSingleProps) =>
  axios.get<NasaImageMetadata>(NASA_APOD_URL, {
    params: { date, api_key: NASA_API_KEY, thumbs: true },
  })
