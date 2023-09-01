import { GetStaticProps } from 'next'
import Head from 'next/head'

import { TodoApp } from 'app/features/home'
import { initializeStore } from 'app/zustand'

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

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export const getStaticProps: GetStaticProps = async () => {
  const zustandStore = initializeStore()

  return {
    props: {
      // the "stringify and then parse again" piece is required as next.js
      // isn't able to serialize it to JSON properly
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  }
}
