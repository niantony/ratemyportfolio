import React, { useState } from 'react';
import firebase from '../firebase/clientApp'
import 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth";

export default function CreatePortfolio() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState('');
  const [stocks, setStocks] = useState([])
  const [input, setInput] = useState('')

  const saveInput = (e) => {
    console.log(e.target.value)
    setInput(e.target.value)
  }

  const addStock = () => {
    stocks.push(input)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
    .firestore()
      .collection('portfolios')
      .add({
        createdBy: user.displayName,
        userId: user.uid,
        title: title,
        description: description,
        stocks: stocks,
        date: Date.now()
      });

    setTitle('');
    setDescription('');
    setStocks([]);
    setNotification('Portfolio created');

    setTimeout(() => {
      setNotification('')
    }, 2000)
  }

  return (
    <div>
      <h2>Create Portfolio</h2>
      {notification}
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
        <div>
          Add Stock<br />
          <input type="text" onChange={saveInput}/>
          <button onClick={addStock}>Add Stock</button>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
