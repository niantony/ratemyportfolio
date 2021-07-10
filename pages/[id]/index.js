import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Explore.module.css'

const Portfolio = ({ portfolio }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()
    
    useEffect(() => {
        if (isDeleting) {
            deletePortfolio()
        }
    }, [isDeleting])

    const deletePortfolio = async () => {
        const portfolioId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/portfolios/${portfolioId}`, {
                method: "Delete"
            })
        alert("Portfolio deleted")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true)
    }

    const handleUpdate = async () => {
        router.push(`/${router.query.id}/edit`)
    }

    return (
        <>
            <div className={styles.card}>
                <h2>{portfolio.title}</h2>
                <p>{portfolio.description}</p>
            </div>
            {/* <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Edit</button> */}
        </>
    )
}

Portfolio.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/portfolios/${id}`);
    const { data } = await res.json();

    return { portfolio: data }
}

 export default Portfolio