import { readFile } from 'fs/promises'
import path from 'path'
import { cache } from 'react'

export interface Content {
  id: number
  title: string
  description: string
  event: string
  company: string
  stack: string[]
  deadline: string
  start: string
  end: string
  like: boolean
}

export const getAllContents = cache(async () => {
  const filePath = path.join(process.cwd(), 'data', 'content.json')
  return readFile(filePath, 'utf-8').then<Content[]>(JSON.parse)
})

export async function getContentData(id: number): Promise<Content> {
  const contents = await getAllContents()
  const content = contents.find((content) => content.id === id)
  if (!content) throw new Error(`${id}번에 해당하는 콘텐츠를 찾을 수 없음`)
  return content
}
