import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Footer from '../components/Footer'
import firebase from '../firebase/clientApp'
import { useState, useEffect } from 'react';

export default function Home() {
  const [featureOne, setFeatureOne] = useState({})
  const [featureOneVotes, setFeatureOneVotes] = useState(0)
  const [featureTwo, setFeatureTwo] = useState({})
  const [featureTwoVotes, setFeatureTwoVotes] = useState(0)
  const [featureThree, setFeatureThree] = useState({})
  const [featureThreeVotes, setFeatureThreeVotes] = useState(0)
  
  useEffect(() => {
    firebase.firestore()
        .collection('portfolios')
        .doc("d1242af4-7b1d-4dd6-9136-52a9a503f00d")
        .get()
        .then(result => {
            setFeatureOne(result.data())
            setFeatureOneVotes(result.data().upvotes.length)
        })
    firebase.firestore()
        .collection('portfolios')
        .doc("f15c0f76-0d4c-43b0-a8bb-641b8d655536")
        .get()
        .then(result => {
            setFeatureTwo(result.data())
            setFeatureTwoVotes(result.data().upvotes.length)
        })
    firebase.firestore()
        .collection('portfolios')
        .doc("c835bf18-be9a-46d0-b36a-f8c5cf8dfa98")
        .get()
        .then(result => {
            setFeatureThree(result.data())
            setFeatureThreeVotes(result.data().upvotes.length)
        })
  }, [])

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

      <div className={styles.featured}>
        <h1>Featured Portfolios</h1>
        <div className={styles.card_container}>
          <Link href={`/explore/${featureOne.portfolioId}`}>
            <div className={styles.card}>
              <div className={styles.votes}>
                <p>{featureOneVotes}</p>
                <img className={styles.vote_image} src="https://img.icons8.com/material-rounded/96/000000/thick-arrow-pointing-up.png"/>
              </div>
              <h2>{featureOne.title}</h2>
              <p>{featureOne.description}</p>
              <div className={styles.profile_container}>
                <img src={featureOne.photoUrl} alt="Profile pic"/>
                <p>{featureOne.createdBy}</p>
              </div>
            </div>
          </Link>
          <Link href={`/explore/${featureTwo.portfolioId}`}>
            <div className={styles.card}>
              <div className={styles.votes}>
                <p>{featureTwoVotes}</p>
                <img className={styles.vote_image} src="https://img.icons8.com/material-rounded/96/000000/thick-arrow-pointing-up.png"/>
              </div>
              <h2>{featureTwo.title}</h2>
              <p>{featureTwo.description}</p>
              <div className={styles.profile_container}>
                <img src={featureTwo.photoUrl} alt="Profile pic"/>
                <p>{featureTwo.createdBy}</p>
              </div>
            </div>
          </Link>
          <Link href={`/explore/${featureThree.portfolioId}`}>
            <div className={styles.card}>
              <div className={styles.votes}>
                <p>{featureThreeVotes}</p>
                <img className={styles.vote_image} src="https://img.icons8.com/material-rounded/96/000000/thick-arrow-pointing-up.png"/>
              </div>
              <h2>{featureThree.title}</h2>
              <p>{featureThree.description}</p>
              <div className={styles.profile_container}>
                <img src={featureThree.photoUrl} alt="Profile pic"/>
                <p>{featureThree.createdBy}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h1>Create your own Portfolio!</h1>
            <h2>You can create and share your own portfolio by logging in and
              heading over to the <Link href='/create'><span>create page</span></Link>.
            </h2>
            <div className={styles.button_container}>
              <div className={styles.signup}>
                <Link href='/create'>
                  Create
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
            <img className={styles.image} src="/create.png"/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}