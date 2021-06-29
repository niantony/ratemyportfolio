import '../styles/globals.css'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout />
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
