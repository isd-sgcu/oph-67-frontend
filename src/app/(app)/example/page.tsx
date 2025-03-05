import React from 'react'

import { getExample } from '@/app/actions/example/example'

const Page = async (): Promise<React.ReactNode> => {
  const data = await getExample()
  return (
    <div>
      <h1>Example</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Page
