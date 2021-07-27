import '../styles/globals.css'
import Layout from '../components/Layout'
import firebase from '../firebase/clientApp'
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from '../components/Navbar';
import AuthNavbar from '../components/AuthNavbar';

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(firebase.auth())

  if (user) {
    return (
      <>
        <Layout />
        <AuthNavbar />
        <Component {...pageProps} />
      </>
    )
  }

  else return (
    <>
      <Layout />
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
