import styles from '../styles/Navbar.module.css'
import Link from 'next/link'

function Navbar() {
    return (
        <div className={styles.navbar}>
            <ul className={styles.menu}>
                <li className={styles.item}>
                    <Link href='/'>
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
                <li className={styles.item}>
                    <Link href='/about'>
                        About Us
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
