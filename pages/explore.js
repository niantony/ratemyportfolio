import styles from '../styles/Explore.module.css'
import Link from 'next/link'

const explore = ({ portfolios }) => {
    return (
        <div className={styles.card_container}> 
        {
            portfolios.map(portfolio => {
                return (
                    <Link href={`/${portfolios._id}`}>
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
    )
}

explore.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/portfolios');
    const { data } = await res.json();

    return { portfolios: data }
}

export default explore
