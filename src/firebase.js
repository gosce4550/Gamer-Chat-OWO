import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({

    apiKey: "AIzaSyDNcN1EngK4hGi5JDZMsniJWxc3tKLlivQ",
  
    authDomain: "gamersowo-chat.firebaseapp.com",
  
    projectId: "gamersowo-chat",
  
    storageBucket: "gamersowo-chat.appspot.com",
  
    messagingSenderId: "667699948470",
  
    appId: "1:667699948470:web:5e028aedf2c4d5e88d2f17"
  
  }).auth();