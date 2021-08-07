import firebase from '../firebase/clientApp'
import Auth from '../components/Auth'
import { useAuthState } from "react-firebase-hooks/auth";
import styles from '../styles/Auth.module.css'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { RiLogoutCircleLine } from 'react-icons/ri'

export default function SignInScreen() {
    const [user, loading, error] = useAuthState(firebase.auth())
    const [userPortfolios, setUserPortfolios] = useState([])
    const [getData, setGetData] = useState(true)

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log("Sign-out successful")
          }).catch((error) => {
            console.log(error)
          });
    }

    // Will render dashboard if current user is logged in
    if (user) {
        if(getData) {
            try {
                firebase.firestore()
                    .collection('users')
                    .doc(user.uid)
                    .get()
                    .then(result => {
                        setUserPortfolios(result.data().portfolios)
                    })
                setGetData(false)
            } catch (error) {
                console.log(error)
            }
        }
        
        return (
            <div className={styles.auth_container}>
                <img
                    src={user.photoURL} 
                    alt="Google profile pic"
                    className={styles.img}
                />
                <div className={styles.tag}>
                    <p>Member</p>
                </div>
                <h1 className={styles.display_name}>{user.displayName}</h1>
                <p className={styles.email}>{user.email}</p>

                <div>
                    <h2 className={styles.heading}>My Portfolios</h2>
                    <div className={styles.line} />
                </div>
                
                // Displays current user's portfolios
                <div className={styles.card_container}>
                    {userPortfolios && userPortfolios.length > 0 ? <>{userPortfolios.map(portfolio => {
                        return (
                            <div key={portfolio.portfolioId} className={styles.card}>
                                <div key={portfolio.portfolioId}>
                                    <div>
                                        <h2>{portfolio.title}</h2>
                                    </div>
                                    <div>
                                        <h4>{portfolio.stocks[0].name.toUpperCase()}, {portfolio.stocks[1].name.toUpperCase()}, {portfolio.stocks[2].name.toUpperCase()}...</h4>
                                    </div>
                                    <div>
                                        <p>{portfolio.description}</p>
                                    </div>
                                    <div className={styles.button_container}>
                                        <div className={styles.view_button}>
                                            <Link href={`/explore/${portfolio.portfolioId}`}>
                                                <img src="https://img.icons8.com/ios-glyphs/90/4a90e2/visible--v1.png"/>
                                            </Link>
                                        </div>
                                        <div className={styles.delete_button} onClick={() => {
                                            firebase.firestore().collection('users').doc(user.uid).update({
                                                portfolios: firebase.firestore.FieldValue.arrayRemove(portfolio)
                                            })
                                            firebase.firestore().collection('portfolios').doc(portfolio.portfolioId)
                                                .delete().then(() => {
                                                    setGetData(true)
                                                })
                                            }}>
                                            <img src="https://img.icons8.com/ios/100/fa314a/delete-trash.png"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}</> :
                    <>
                        <p className={styles.no_portfolios}>You have no portfolios</p>
                    </>}
                  
                </div>
                <button className={styles.signout_button} onClick={signOut}><span>Sign-out</span> <RiLogoutCircleLine /></button>
            </div>
        )
    }

    // Show login screen if current user isn't logged in
    else return (
        <div>
            <Auth />
        </div>
    )
}