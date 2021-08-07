import { useEffect, useState } from 'react'
import firebase from '../../firebase/clientApp'
import styles from '../../styles/Portfolio.module.css'
import { PieChart } from 'react-minimal-pie-chart';
import randomColor from 'randomcolor';
import { useAuthState } from "react-firebase-hooks/auth";
import { VscLoading } from 'react-icons/vsc'
import { FaCheck, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import Footer from '../../components/Footer';

const Portfolio = (props) => {
    const [user, loading, error] = useAuthState(firebase.auth())
    const [portfolio, setPortfolio] = useState(null)
    const [upvoted, setUpvoted] = useState(false)
    const [downvoted, setDownvoted] = useState(false)
    const [upvotes, setUpvotes] = useState(0)
    const [downvotes, setDownvotes] = useState(0)
    const [getData, setGetData] = useState(true)
    const [notification, setNotification] = useState("")

    // Generating random blue colors for pie chart
    var stockList = []
    const color = randomColor({
      count: 50,
      hue: 'blue',
      luminosity: 'bright'
   });

   // Getting the portfolio based on query id
    useEffect(() => {
        firebase.firestore()
            .collection('portfolios')
            .doc(props.id)
            .get()
            .then(result => {
                setPortfolio(result.data())
                setUpvotes(result.data().upvotes.length)
                setDownvotes(result.data().downvotes.length)
            })
    }, [])

    // Loading Screen
    if (!portfolio) {
        return(
          <div className={styles.loading_container}>
            <div className={styles.loading}>
              <VscLoading />
            </div>   
          </div>  
        )
    }

    const upvote = () => {
      // Adds upvote
      firebase.firestore().collection('portfolios').doc(props.id).update({
        upvotes: firebase.firestore.FieldValue.arrayUnion(user.uid)
      })
      firebase.firestore().collection('users').doc(user.uid).update({
        upvotedPortfolios: firebase.firestore.FieldValue.arrayUnion(props.id)
      })
      setUpvotes(upvotes + 1)
      setNotification("Vote added!")

      // If user downvoted before, this will remove the downvote
      try {
        firebase.firestore().collection('portfolios').doc(props.id).update({
          downvotes: firebase.firestore.FieldValue.arrayRemove(user.uid)
        })
        firebase.firestore().collection('users').doc(user.uid).update({
          downvotedPortfolios: firebase.firestore.FieldValue.arrayRemove(props.id)
        })
        if (downvoted) {
          setDownvotes(downvotes - 1)
        }
        setGetData(true)
      } catch (error) {
        return
      }   
    }

    const downvote = () => {
      // Adds downvote
      firebase.firestore().collection('portfolios').doc(props.id).update({
        downvotes: firebase.firestore.FieldValue.arrayUnion(user.uid)
      })
      firebase.firestore().collection('users').doc(user.uid).update({
        downvotedPortfolios: firebase.firestore.FieldValue.arrayUnion(props.id)
      })
      setDownvotes(downvotes + 1)
      setNotification("Vote added!")

      // If user upvoted before, this will remove the upvote
      try {
        firebase.firestore().collection('portfolios').doc(props.id).update({
          upvotes: firebase.firestore.FieldValue.arrayRemove(user.uid)
        })
        firebase.firestore().collection('users').doc(user.uid).update({
          upvotedPortfolios: firebase.firestore.FieldValue.arrayRemove(props.id)
        })
        if (upvoted) {
          setUpvotes(upvotes - 1)
        }
        setGetData(true)
      } catch (error) {
        return
      }
    }

    if (user && portfolio) {
      // Checks if the current user has upvoted or downvoted already
      if (getData) {
        firebase.firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(result => {
            try {
              result.data().upvotedPortfolios.map(upvote => {
                if (upvote === props.id) {
                  setUpvoted(true)
                  setDownvoted(false)
                }
              })
              result.data().downvotedPortfolios.map(downvote => {
                if (downvote === props.id) {
                  setDownvoted(true)
                  setUpvoted(false)
                }
              })
            } catch (error) {
              return
            }
          })
        setGetData(false)
      }

      return (
        <div className={styles.container}>
          <div className={styles.contain}>
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.info_container}>
                  <h1 className={styles.title}>{portfolio.title.toUpperCase()}</h1>
                  <p className={styles.subtitle}>{portfolio.stocks[0].name.toUpperCase()}, {portfolio.stocks[1].name.toUpperCase()}, {portfolio.stocks[2].name.toUpperCase()}...</p>
                  <p className={styles.description}>
                    {portfolio.description}
                  </p>
                  <div className={styles.vote_container}>
                    {upvoted ? 
                    <div className={styles.voted_yes}>
                      <p>{upvotes}</p><span><FaCheck /></span>
                    </div>
                    :
                    <div className={styles.vote_yes} onClick={upvote}>
                      <p>{upvotes}</p><span><FaArrowUp /></span>
                    </div>
                    }
                    {downvoted ? 
                    <div className={styles.voted_no}>
                      <p>{downvotes}</p><span><FaTimes /></span>
                    </div>
                    :
                    <div className={styles.vote_no} onClick={downvote}>
                      <p>{downvotes}</p><span><FaArrowDown /></span>
                    </div>
                    }
                  </div>
                  <p className={styles.notification}>{notification}</p>
                </div>
              </div>

                // Creating pie chart data
                {
                portfolio.stocks.map(stock => {
                  const temp = {
                    title: stock.name,
                    value: stock.percent,
                    color: color[stockList.length]
                  }
                  stockList.push(temp)
                })
                }

                <div className={styles.col}>
                  <div className={styles.pie_container}>
                    <PieChart 
                      data={stockList}
                      lineWidth={65}
                      label={({ dataEntry }) => dataEntry.title + " " + dataEntry.value + "%"}
                      labelStyle={(index) => ({
                        fill: "#fff",
                        fontSize: '4px',
                        fontFamily: 'sans-serif',
                        fontWeight: "bold"
                      })}
                      labelPosition={65}
                      lengthAngle={360} 
                      animate
                      style={{ height: '450px'}}
                    />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
        </div>
      )
    }

    if (!user) {
        return (
          <div className={styles.container}>
            <div className={styles.contain}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.info_container}>
                    <h1 className={styles.title}>{portfolio.title.toUpperCase()}</h1>
                    <p className={styles.subtitle}>{portfolio.stocks[0].name.toUpperCase()}, {portfolio.stocks[1].name.toUpperCase()}, {portfolio.stocks[2].name.toUpperCase()}...</p>
                    <p className={styles.description}>
                      {portfolio.description}
                    </p>
                    <div className={styles.vote_container}>
                      <div className={styles.vote_yes} onClick={() => setNotification('Please login to vote')}>
                        <p>{upvotes}</p><span><FaArrowUp /></span>
                      </div>
                      <div className={styles.vote_no} onClick={() => setNotification('Please login to vote')}>
                        <p>{downvotes}</p><span><FaArrowDown /></span>
                      </div>
                    </div>
                    <p className={styles.error}>{notification}</p>
                  </div>
                </div>

                  // Creating pie chart data
                  {
                  portfolio.stocks.map(stock => {
                    const temp = {
                      title: stock.name,
                      value: stock.percent,
                      color: color[stockList.length]
                    }
                    stockList.push(temp)
                  })
                  }

                  <div className={styles.col}>
                    <div className={styles.pie_container}>
                      <PieChart 
                        data={stockList}
                        lineWidth={65}
                        label={({ dataEntry }) => dataEntry.title + " " + dataEntry.value + "%"}
                        labelStyle={(index) => ({
                          fill: "#fff",
                          fontSize: '4px',
                          fontFamily: 'sans-serif',
                          fontWeight: "bold"
                        })}
                        labelPosition={65}
                        lengthAngle={360} 
                        animate
                        style={{ height: '450px'}}
                      />
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
        )
    }
}

// Gets the id (portfolio id) from the query
Portfolio.getInitialProps = ({ query }) => {
    return {
        id: query.id
    }
}

export default Portfolio