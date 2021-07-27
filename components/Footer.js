import styles from '../styles/Footer.module.css'
import Link from 'next/link'

function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.logo}>
                    <img src={'/logo2.png'}/>
                    <p>RateMyPortfolio</p>
                </div>
                <div className={styles.links_container}>
                    <div className={styles.navigation}>
                        <p className={styles.heading}>Navigation</p>
                        <ul className={styles.navigation_items}>
                            <li className={styles.item}>
                                <Link href="/">
                                    Home
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link href='/explore'>
                                    Explore
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link href='/create'>
                                    Create
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.navigation_two}>
                    <p className={styles.heading}>Useful Links</p>
                        <ul className={styles.navigation_items}>
                            <li className={styles.item}>
                                <Link href="/auth">
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Footer