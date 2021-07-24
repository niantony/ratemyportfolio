import React, { useEffect, useState } from 'react';
import firebase from '../firebase/clientApp'
import 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Create.module.css'
import Auth from '../components/Auth'

export default function CreatePortfolio() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState('');
  const [stocks, setStocks] = useState([])
  const [input, setInput] = useState('')
  const [percent, setPercent] = useState()
  const [percentTotal, setPercentTotal] = useState(0)

  const saveInput = (e) => {
    setInput(e.target.value)
  }

  const savePercent = (e) => {
    setPercent(parseInt(e.target.value))
  }

  const addStock = (e) => {
    if (percent < 100 && percent > 0 && input !== "") {
      stocks.push({
        name: input,
        percent: percent
      })
      setPercentTotal(percentTotal + percent)
      setInput("")
      setPercent("")
    } 
    else if (percent < 1) {
      e.preventDefault()
      setNotification("Percentage needs to be at least 1")
    }
    else if (percent > 100) {
      e.preventDefault()
      setNotification("Percentage needs to be less than 100")
    }
    else if (input === "") {
      e.preventDefault()
      setNotification("Missing stock ticker/name")
    }
  }

  const handleSubmit = (e) => {
    var total = 0;
    stocks.map(stock => {
      total = total + stock.percent
    })
    if (total === 100) {
      if (stocks.length >= 5) {
        e.preventDefault();
        const uuid = uuidv4()
  
        // Adds new Portfolio to Firestore
        firebase
          .firestore()
            .collection('portfolios')
            .doc(uuid)
            .set({
              createdBy: user.displayName,
              userId: user.uid,
              title: title,
              description: description,
              stocks: stocks,
              upvotes: [],
              downvotes: [],
              date: firebase.firestore.FieldValue.serverTimestamp(),
              portfolioId: uuid,
              photoUrl: user.photoURL
          });
        
        // Adds Portfolio to user db
        firebase.firestore().collection('users').doc(user.uid).update({
          portfolios: firebase.firestore.FieldValue.arrayUnion({
              createdBy: user.displayName,
              userId: user.uid,
              title: title,
              description: description,
              stocks: stocks,
              portfolioId: uuid
          })
        })
  
        setTitle('');
        setDescription('');
        setStocks([]);
        setNotification('Portfolio created');
  
        setTimeout(() => {
          setNotification('')
        }, 2000)
      } else {
        e.preventDefault()
        setNotification('Need at least 5 stocks');
      }
    }
    else if (total < 100) {
      e.preventDefault()
      setNotification("Total percent is less than 100. Add more stocks or increase percentages.")
    }
    else {
      e.preventDefault()
      setNotification("Total is above 100. Please remove stocks or lower percentages.")
    }
  }

  if (user) {
    return (
      <div className={styles.create_container}>
        <h1>Create a Portfolio</h1>
          <div className={styles.container}>
            <div className={styles.row}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2>PORTFOLIO INFO</h2>
                <div>
                  <h4>TITLE</h4>
                  <input className={styles.input} type="text" value={title} placeholder="Title..."
                  onChange={({target}) => setTitle(target.value)} />
                </div>
                <div>
                  <h4>DESCRIPTION</h4>
                  <textarea className={styles.input_desc} value={description} placeholder="Description..."
                  onChange={({target}) => setDescription(target.value)} />
                </div> 
                <button className={styles.button} type="submit">CREATE PORTFOLIO</button>
              </form>
  
              <div className={styles.add_container}>
                <h2>ADD A STOCK</h2>
                <h4>STOCK TICKER/NAME</h4>
                <input className={styles.input} type="text" onChange={saveInput} value={input} placeholder="Stock Ticker or Name..."/>
                <h4>PERCENTAGE</h4>
                <input className={styles.input} type="number" onChange={savePercent} value={percent} placeholder="Percent..."/>
                <br />
                <button className={styles.button} onClick={addStock}>+</button>
                <p className={styles.requirements}>Portfolio must have at least 5 stocks and the sum of the percentages must equal 100.</p>
              </div>
            </div>
  
            {stocks.length > 0 ?  
              <div className={styles.table_container}>
                <div className={styles.table}>
                  <ul className={styles.heading}>
                    <li className={styles.item_one}>
                      TICKER/NAME
                    </li>
                    <li className={styles.item_two}>
                      PERCENT ({percentTotal}%)
                    </li>
                  </ul>
                </div>
  
                {stocks.map(stock => {
                      return (
                        <div>
                          <ul className={styles.menu}>
                            <li className={styles.item_name} key={stock.name}>
                              {stock.name} 
                            </li>
                            <li className={styles.item_percent} key={stock.percent}>
                              {stock.percent}%
                            </li>
                            <button className={styles.delete_button} onClick={() => {
                              setStocks(stocks.filter(data => data.name !== stock.name));
                            }}>x</button>
                          </ul>
                        </div>
                      )  
                    }
                  )}
              </div>
            : <></>}
          </div>
          <p className={styles.notification}>{notification}</p>
      </div>
    )
  } else return (
    <div className={styles.auth_container}>
      <Auth />
    </div>
  )
}