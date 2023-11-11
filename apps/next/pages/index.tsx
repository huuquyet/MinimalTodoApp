import { TodoApp } from 'app/features/home'
import Head from 'next/head'

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
