import firebase from '../firebase/clientApp'
import Auth from '../components/Auth'
import { useAuthState } from "react-firebase-hooks/auth";
import styles from '../styles/Auth.module.css'

export default function SignInScreen() {
    const [user, loading, error] = useAuthState(firebase.auth())

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log("Sign-out successful")
          }).catch((error) => {
            console.log(error)
          });
    }

    if (user) {
        return (
            <div className={styles.auth_container}>
                <h1>{user.displayName}</h1>
                <h2>{user.email}</h2>
                <h2>{user.uid}</h2>
                <button onClick={signOut}>Sign-out</button>
            </div>
        )
    }

    else return (
        <div className={styles.auth_container}>
            <Auth />
        </div>
    )
}