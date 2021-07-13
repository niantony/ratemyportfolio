import '../styles/globals.css'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import { AuthContextProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout />
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
