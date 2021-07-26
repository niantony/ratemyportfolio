import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase/app";
import 'firebase/auth'
import styles from '../styles/Login.module.css'

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            displayName: true
        }
    ],
    signInSuccessUrl: '/',
    credentialHelper: 'none',
}

const FirebaseAuth = () => {
    return (
        <div className={styles.auth_container}>
            <div className={styles.container}>
                <h1>Sign up or Login</h1>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        </div>
    )
}

export default FirebaseAuth

