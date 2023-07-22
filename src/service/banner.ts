import { cache } from 'react'
import { readFile } from 'fs/promises'
import path from 'path'

export type Banner = {
  title: string
  path: string
}

export const getAllBanners = cache(async () => {
  const filePath = path.join(process.cwd(), 'data', 'banners.json')
  return readFile(filePath, 'utf-8').then<Banner[]>(JSON.parse)
})
