import styles from '../styles/Explore.module.css'
import Link from 'next/link'

const explore = ({ portfolios }) => {
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

explore.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/portfolios');
    const { data } = await res.json();

    return { portfolios: data }
}

export default explore
