import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MarketShare</title>
        <meta name="description" content="Stock Market Portfolio Sharing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Share and Explore <br /> Investment Portolios
        </h1>

        <p className={styles.description}>
          Stock market portfolio sharing made easy
        </p>

        <div className={styles.button}>
          Explore
        </div>
      </main>
    </div>
  )
}
