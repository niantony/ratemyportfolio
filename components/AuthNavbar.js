import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { CgMenuRight } from 'react-icons/cg'
import { FaTimes } from 'react-icons/fa'

function AuthNavbar() {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);

    return (
        <div className={styles.navbar}>
            <div className={styles.menu_icon} onClick={handleClick}>
                <i>{click ? <FaTimes /> : <CgMenuRight />}</i>
            </div>
            <div className={styles.logo}>
                <Link href='/'>
                    <img src={'/logo2.png'}/>
                </Link>
                <Link href='/'>
                    <p>RateMyPortfolio</p>
                </Link>
            </div>
            <ul className={click ? styles.menu_active : styles.menu} onClick={closeMobileMenu}>
                <li className={styles.item}>
                    <Link href='/' className={styles.nav_link}>
                        Home
                    </Link>
                </li>
                <li className={styles.item} onClick={closeMobileMenu}>
                    <Link href='/explore' className={styles.nav_link}>
                        Explore
                    </Link>
                </li>
                <li className={styles.item} onClick={closeMobileMenu}>
                    <Link href='/create' className={styles.nav_link}>
                        Create
                    </Link>
                </li>
                <li className={click ? styles.item : styles.item_profile} onClick={closeMobileMenu}>
                    <Link href='/auth' className={styles.nav_link}>
                        Profile
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AuthNavbar
