import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { atom, useAtom } from 'jotai'
import { useAtomValue, useHydrateAtoms } from 'jotai/utils'

const countAtom = atom(0)
const doubleAtom = atom((get) => get(countAtom) * 2)

export const getServerSideProps: GetServerSideProps<{
  initialCount: number
}> = async (context) => {
  return { props: { initialCount: 42 } }
}

export default function Home({
  initialCount,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useHydrateAtoms([[countAtom, initialCount]] as const)
  const [count, setCount] = useAtom(countAtom)
  const doubleCount = useAtomValue(doubleAtom)
  return (
    <div className={styles.container}>
      <Head>
        <title>with-jotai</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>With Jotai example</h1>
      <main className={styles.main}>
        <div>Initial count from the server: {count}</div>
        <div>Double count: {doubleCount}</div>
        <button onClick={() => setCount((count) => count + 1)}>+1</button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
