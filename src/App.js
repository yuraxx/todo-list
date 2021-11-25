import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';




firebase.initializeApp({
  apiKey: "AIzaSyCKXATCMweAXugFhqR5yiHgDQnv9NHH35Y",
  authDomain: "ringed-reserve-186212.firebaseapp.com",
  databaseURL: "https://ringed-reserve-186212-default-rtdb.firebaseio.com",
  projectId: "ringed-reserve-186212",
  storageBucket: "ringed-reserve-186212.appspot.com",
  messagingSenderId: "473227228545",
  appId: "1:473227228545:web:25ec55a76dc45675c0e480",
  measurementId: "G-7S56B1N4XW"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();




function App() {

  const [user] = useAuthState(auth);
  

  return (
    
    <div className="App">
      <header>
        <h1>{}</h1>
        
        <img src={ahi2 || 'https://im0-tub-ru.yandex.net/i?id=61b913e550744b813ce3e9b5224f532d-sr&n=13'} />
        <SignOut />
      </header>
      <section>
        
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}
//Логин
function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Google авторизация</button>
      
    </>
  )

}
//ВЫХОД
function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Выйти</button>
  )
}



//Вывод списка записей 

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
//query 
  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const [formValue2, setFormValue2] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
//ждем кнопки для добавления
    await messagesRef.add({
      text: formValue,
      joky: formValue2,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('');
    setFormValue2('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
   
   
  }

 


    
  //prokrutka
  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Задача" />
      <p></p>
      <input value={formValue2} onChange={(e) => setFormValue2(e.target.value)} placeholder="Срок" />
      <button type="submit" disabled={!formValue && !formValue2}>+</button>
    </form>
  </>)
}

//Проверяем доставку после чего приходит ответ о доставке; выходит сообщение (READ)
var ahi2;
var vremya1;
var vremya2;
vremya1 = Date.now();
vremya2 = Date(vremya1);
const date = new Date('September 20, 2020 11:10:05');
new Intl.DateTimeFormat().format(date);





function ChatMessage(props) {

const { text, uid, photoURL, joky, status, vremya } = props.message;
ahi2 = photoURL;


  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
  
  return (<>
  
    <div className={`message ${messageClass}`}>
      
      <p>
      <img src={ahi2} />
      <h2>Задача:</h2>
      <h2>{text}</h2>
      <h2>Срок:</h2>
      <h2>{joky || 'бессрочно'}</h2>
     
      
      
      </p>
    </div>
  </>)
}



export default App;
