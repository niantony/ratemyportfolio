import { useEffect, useState } from 'react'
import firebase from '../../firebase/clientApp'
import Link from 'next/link'
import styles from '../../styles/Portfolio.module.css'
import { PieChart } from 'react-minimal-pie-chart';
import randomColor from 'randomcolor';

const Portfolio = (props) => {
    const [portfolio, setPortfolio] = useState(null)
    var stockList = []
    const color = randomColor({
      count: 200,
      hue: 'blue'
   });

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
          <div>
            <h2>Loading...</h2>
            <h2>Loading...</h2>
            <h2>Loading...</h2>
            <h2>Loading...</h2>
            <h2>Loading...</h2>
            <h2>Loading...</h2>
          </div>     
        )
    }

      return (
        <div className={styles.container}>
          {console.log(portfolio)}
          <div className={styles.info_container}>
            <h1 className={styles.title}>{portfolio.title.toUpperCase()}</h1>
            <p className={styles.subtitle}>{portfolio.stocks[0].name.toUpperCase()}, {portfolio.stocks[1].name.toUpperCase()}, {portfolio.stocks[2].name.toUpperCase()}...</p>
            <p className={styles.description}>
              {portfolio.description}
            </p>

            {
            portfolio.stocks.map(stock => {
              const temp = {
                title: stock.name,
                value: parseInt(stock.percent),
                color: color[stockList.length]
              }
              stockList.push(temp)
            })
            }

            <PieChart 
              data={stockList}
            />
            <Link href="/explore">
              <a>Back</a>
            </Link>
          </div>
        </div>
      )
}

Portfolio.getInitialProps = ({ query }) => {
    return {
        id: query.id
    }
}

export default Portfolio