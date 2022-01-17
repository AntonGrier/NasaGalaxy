import { NasaImageMetadata } from '../models'

export const getDateString = (str: string) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const date = new Date(str)
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`
}

export const dateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month < 10 ? '0' + month : month}-${
    day < 10 ? '0' + day : day
  }`
}

export const sortNasaImageByDate = (
  i1: NasaImageMetadata,
  i2: NasaImageMetadata,
) => {
  const date1 = new Date(i1.date)
  const date2 = new Date(i2.date)
  return date2.getTime() - date1.getTime()
}
