import styles from '../styles/Explore.module.css'
import Link from 'next/link'
import firebase from '../firebase/clientApp'
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState, useEffect } from 'react';


const explore = () => {

    // const [user, loading, error] = useAuthState(firebase.auth());

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
                            <Link href={`/${portfolio._id}`}>
                                <div className={styles.card}>
                                    <div key={portfolio._id}>
                                            <h2>{portfolio.title}</h2>
                                            <p>{portfolio.description}</p>
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
