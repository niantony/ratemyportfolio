import React, { useState } from 'react';
import firebase from '../firebase/clientApp'
import 'firebase/firestore'

export default function CreatePortfolio() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
    .firestore()
      .collection('portfolios')
      .add({
        title: title,
        description: description,
      });

    setTitle('');
    setDescription('');
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
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
