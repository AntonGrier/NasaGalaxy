import axios from 'axios'
import { NasaImageMetadata } from '../models'

const NASA_API_KEY = 'acPr7twdBH1nxguGu28anvKxPKuaVXbjwj0Jf8bG'
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod'

interface APODProps {
  start_date: string
  end_date: string
}

export const getImages = ({ start_date, end_date }: APODProps) =>
  axios.get<NasaImageMetadata[]>(NASA_APOD_URL, {
    params: { start_date, end_date, api_key: NASA_API_KEY, thumbs: true },
  })
