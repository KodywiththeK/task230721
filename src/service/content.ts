import { NewContentType } from '@/components/InputForm'
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
  likes: boolean
}

export const getAllContents = async () => {
  // const filePath = path.join(process.cwd(), 'data', 'content.json')
  // return readFile(filePath, 'utf-8').then<Content[]>(JSON.parse)
  return fetch('https://jgt0ls7201.execute-api.ap-northeast-2.amazonaws.com/dev/camps').then<Content[]>((res) => res.json())
}

export async function getContentData(id: number): Promise<Content> {
  console.log(id)
  // const contents = await getAllContents()
  // const content = contents.find((content) => content.id === id)
  // if (!content) throw new Error(`${id}번에 해당하는 콘텐츠를 찾을 수 없음`)
  return fetch(`https://jgt0ls7201.execute-api.ap-northeast-2.amazonaws.com/dev/camps/${id}`, { cache: 'no-store' }).then<Content>((res) => res.json())
}

export async function handleLikes(id: string, likes: string) {
  return fetch(`https://jgt0ls7201.execute-api.ap-northeast-2.amazonaws.com/dev/camps/${id}`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      likes: likes,
    }),
  }).then((res) => res.json())
}

export async function createCamp(info: NewContentType) {
  return fetch('https://jgt0ls7201.execute-api.ap-northeast-2.amazonaws.com/dev/camps', {
    method: 'POST',
    body: JSON.stringify(info),
  }).then((res) => res.json())
}

export async function deleteCamp(id: string) {
  return fetch(`https://jgt0ls7201.execute-api.ap-northeast-2.amazonaws.com/dev/camps/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json())
}

export async function updateCamp(id: string) {
  return fetch(`https://jgt0ls7201.execute-api.ap-northeast-2.amazonaws.com/dev/camps/${id}`, {
    method: 'PUT',
  }).then((res) => res.json())
}
