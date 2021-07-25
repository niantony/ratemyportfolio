import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.main_container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Share and Rate <br /> Investment <span>Portolios</span>
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

      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h1>Explore and Rate Portfolios</h1>
            <h2>RateMyPortfolio offers the best way to explore and rate countless user created portfolios. 
              Get started by signing up! </h2>
            <div className={styles.button_container}>
              <div className={styles.signup}>
                <Link href='/auth'>
                  Sign Up
                </Link>
              </div>
              <div className={styles.login}>
                <Link href='/auth'>
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.col}>
            <img className={styles.image} src="/explore.png"/>
          </div>
        </div>
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
    </div>
  )
}
