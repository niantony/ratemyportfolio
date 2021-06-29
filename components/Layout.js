import Head from 'next/head'
import Navbar from './Navbar'

const Layout = ({ children }) => (
    <>
        <Head>
            <title>RateMyPortfolio</title>
            <meta name="description" content="Stock Market Portfolio Sharing" />
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout
