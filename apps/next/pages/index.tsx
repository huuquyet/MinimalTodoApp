import Head from 'next/head'

import { TodoApp } from 'app/features/home'

export default function Page() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <TodoApp />
    </>
  )
}
