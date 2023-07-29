import { NewContentType } from '@/components/InputForm'
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
  return fetch(process.env.API_BASE_URL || '', {
    method: 'GET',
    cache: 'no-cache',
  }).then<Content[]>((res) => res.json())
}

export async function getContentData(id: number): Promise<Content> {
  return fetch((process.env.API_BASE_URL || '') + `/${id}`, {
    method: 'GET',
    next: { revalidate: 0 },
  }).then<Content>((res) => res.json())
}

export async function handleLikes(id: string, likes: string) {
  return fetch((process.env.API_BASE_URL || '') + `/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      id,
      likes: likes,
    }),
  }).then((res) => res.json())
}

export async function createCamp(info: NewContentType) {
  return fetch(process.env.API_BASE_URL || '', {
    method: 'POST',
    body: JSON.stringify(info),
  }).then((res) => res.json())
}

export async function deleteCamp(id: number) {
  return fetch((process.env.API_BASE_URL || '') + `/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json())
}

export async function updateCamp(id: number, info: NewContentType) {
  return fetch((process.env.API_BASE_URL || '') + `/${id}`, {
    method: 'PUT',
    body: JSON.stringify(info),
  }).then((res) => res.json())
}
