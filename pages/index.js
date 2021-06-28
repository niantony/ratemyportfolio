import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
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
            <Link href='/explore'>
              Explore
            </Link>
          </div>
        </main>
      </div>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <h2>Dividend Growth 🌱</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className={styles.card}>
          <h2>Aggressive Tech 💻</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className={styles.card}>
          <h2>Biden Portfolio 🔋</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </>
  )
}
