'use server'

export async function getExample(): Promise<
  {
    userId: number
    id: number
    title: string
    body: string
  }[]
> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = (await res.json()) as {
    userId: number
    id: number
    title: string
    body: string
  }[]
  return data
}
