import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { CgMenuRight } from 'react-icons/cg'
import { FaTimes } from 'react-icons/fa'

function Navbar() {
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);

    return (
        <div className={styles.navbar}>
            <div className={styles.menu_icon} onClick={handleClick}>
                <i>{click ? <FaTimes /> : <CgMenuRight />}</i>
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
                    <Link href='/about' className={styles.nav_link}>
                        About
                    </Link>
                </li>
                <li className={click ? styles.item : styles.item_signup} onClick={closeMobileMenu}>
                    <Link href='/auth' className={styles.nav_link}>
                        Sign Up
                    </Link>
                </li>
                <li className={click ? styles.item : styles.item_login} onClick={closeMobileMenu}>
                    <Link href='/auth' className={styles.nav_link}>
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
