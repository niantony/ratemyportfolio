import React, { useState } from 'react';
import firebase from '../firebase/clientApp'
import 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Create.module.css'

export default function CreatePortfolio() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState('');
  const [stocks, setStocks] = useState([])
  const [input, setInput] = useState('')
  const [percent, setPercent] = useState(0)

  const saveInput = (e) => {
    setInput(e.target.value)
  }

  const savePercent = (e) => {
    setPercent(parseInt(e.target.value))
  }

  const addStock = () => {
    stocks.push({
      name: input,
      percent: percent
    })
    setInput("")
    setPercent(0)
    console.log(stocks)
  }

  const handleSubmit = (e) => {
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
            date: firebase.firestore.FieldValue.serverTimestamp(),
            portfolioId: uuid
        });
      
      // Adds Portfolio ID to user
      firebase.firestore().collection('users').doc(user.uid).update({
        portfolios: firebase.firestore.FieldValue.arrayUnion(uuid)
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

  return (
    <div>
      <h2>Create Portfolio</h2>
      {notification}
      <div>
          Add Stock<br />
          <input type="text" onChange={saveInput} value={input} placeholder="Stock Ticker or Name..."/>
          <br/>
          <input type="number" onChange={savePercent} value={percent} placeholder="Percent..."/>
          <br/>
          <button onClick={addStock}>Add Stock</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          Title<br />
          <input type="text" value={title} 
           onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          Description<br />
          <textarea value={description} 
           onChange={({target}) => setDescription(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
      <ul>
        {stocks.map(stock => {
            return (
              <li key={stock.name}>
                {stock.name} 
                {stock.percent}
              </li>
            )  
          }
        )}
      </ul>
    </div>
  )
}