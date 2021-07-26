import Head from 'next/head'
import Navbar from './Navbar'

const Layout = ({ children }) => (
    <>
        <Head>
            <title>RateMyPortfolio</title>
            <meta name="description" content="Stock Market Portfolio Sharing" />
            <link rel="shortcut icon" href="/logo2.png" />
        </Head>
        {children}
    </>
)

export default Layout
