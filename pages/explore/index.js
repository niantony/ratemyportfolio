import styles from '../../styles/Explore.module.css'
import Link from 'next/link'
import firebase from '../../firebase/clientApp'
import { useState, useEffect } from 'react';

const explore = () => {
    const [portfolios, setPortfolios] = useState([])

    useEffect(() => {
        firebase.firestore()
          .collection('portfolios')
          .get()
          .then(snap => {
            const portfolios = snap.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setPortfolios(portfolios);
          });
      }, []);

    return (
        <div className={styles.page_container}>
            <div className={styles.title_container}>
                <h1 className={styles.title}>
                    Explore all Portfolios
                </h1>
            </div>
            <div className={styles.card_container}> 
                {
                    portfolios.map(portfolio => {
                        return (
                            <Link href={`/explore/${portfolio.id}`}>
                                <div className={styles.card}>
                                    <div key={portfolio.id}>
                                        <div>
                                            <h2>{portfolio.title}</h2>
                                        </div>
                                        <div>
                                            <h4>{portfolio.stocks[0].name.toUpperCase()}, {portfolio.stocks[1].name.toUpperCase()}, {portfolio.stocks[2].name.toUpperCase()}...</h4>
                                        </div>
                                        <div>
                                            <p>{portfolio.description}</p>
                                        </div>
                                        <div className={styles.votes}>
                                            <p>{portfolio.upvotes.length}</p>
                                            <img className={styles.image} src="https://img.icons8.com/material-rounded/96/000000/thick-arrow-pointing-up.png"/>
                                        </div>
                                        <div className={styles.profile_container}>
                                            <img src={portfolio.photoUrl} alt="Profile pic"/>
                                            <p>{portfolio.createdBy}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div> 
        </div>
        
    )
}

export default explore
