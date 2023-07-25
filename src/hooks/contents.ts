import { NewContentType } from '@/components/InputForm'
import { Content } from '@/service/content'
import { useQuery, useMutation } from '@tanstack/react-query'

const updateLikes = async (id: number, likes: boolean) => {
  const data = await fetch('/api/likes', {
    method: 'PATCH',
    body: JSON.stringify({
      id,
      likes,
    }),
  })
  return data.json()
}

const createCamp = async (info: NewContentType) => {
  const data = { ...info, stack: info.stack.split(' ') }
  const res = await fetch('/api/contents', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return res.json()
}

const updateCamp = async (id: number, info: NewContentType) => {
  const data = { ...info, stack: info.stack.split(' ') }
  const res = await fetch(`/api/contents/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      info: data,
      id: id,
    }),
  })
  return res.json()
}

const deleteCamp = async (id: number) => {
  const res = await fetch(`/api/contents/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  })
  return res.json()
}

export function useContents() {
  const {
    data: contents,
    isLoading: contentsLoading,
    refetch: refetchContents,
  } = useQuery<Content[]>({
    queryKey: ['contents'],
    queryFn: () => fetch('/api/contents').then((res) => res.json()),
  })

  const { mutateAsync: mutateLikes } = useMutation((item: { id: number; likes: boolean; newList: Content[] }) => updateLikes(item.id, item.likes), {
    onMutate: (item) => {
      return item.newList
    },
  })

  const { mutateAsync: setCamp } = useMutation((info: NewContentType) => createCamp(info))
  const { mutateAsync: editCamp } = useMutation((data: { id: number; info: NewContentType }) => updateCamp(data.id, data.info))
  const { mutateAsync: removeCamp } = useMutation((id: number) => deleteCamp(id))

  const setLike = async (content: Content) => {
    const { id, likes } = content
    const newContent = {
      ...content,
      likes: likes ? false : true,
    }
    const newContentList = contents?.map((item) => (item.id === content.id ? newContent : item)) || []

    return await mutateLikes({
      id: id,
      likes: likes,
      newList: newContentList,
    })
  }

  return { contents, contentsLoading, refetchContents, setLike, setCamp, editCamp, removeCamp }
}
