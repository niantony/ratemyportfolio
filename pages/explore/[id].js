import { useEffect, useState } from 'react'
import firebase from '../../firebase/clientApp'
import Link from 'next/link'

const Portfolio = (props) => {
    const [portfolio, setPortfolio] = useState(null)

    useEffect(() => {
        firebase.firestore()
            .collection('portfolios')
            .doc(props.id)
            .get()
            .then(result => {
                setPortfolio(result.data())
            })
    }, [])

    if (!portfolio) {
        return(
            <h2>Loading...</h2>
        )
    }

    return (
        <div>
          <h2>{portfolio.title}</h2>
          <p>
            {portfolio.description}
          </p>
          <Link href="/explore">
            <a>Back</a>
          </Link>
        </div>
      )
}

Portfolio.getInitialProps = ({ query }) => {
    return {
        id: query.id
    }
}

export default Portfolio