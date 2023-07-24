import { Content } from '@/service/content'
import { useQuery, useMutation } from '@tanstack/react-query'

const updateLikes = async (id: string, likes: string) => {
  const data = await fetch('/api/likes', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      likes: `${likes}`,
    }),
  })
  return data.json()
}

export function useContents() {
  const { data: contents, isLoading: contentsLoading } = useQuery<Content[]>({
    queryKey: ['contents'],
    queryFn: () => fetch('/api/contents').then((res) => res.json()),
  })

  const { mutateAsync } = useMutation((item: { id: string; likes: string; newList: Content[] }) => updateLikes(String(item.id), `${item.likes}`), {
    onMutate: (item) => {
      return item.newList
    },
  })

  const setLike = async (content: Content) => {
    const { id, likes } = content
    const newContent = {
      ...content,
      likes: likes ? false : true,
    }
    const newContentList = contents?.map((item) => (item.id === content.id ? newContent : item)) || []

    return await mutateAsync({
      id: String(id),
      likes: `${likes}`,
      newList: newContentList,
    })
  }

  return { contents, contentsLoading, setLike }
}
