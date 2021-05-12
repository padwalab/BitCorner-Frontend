import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDrjNe1cuim6KW8B9kYpVNkNox0iNWz748",
  authDomain: "login-eda54.firebaseapp.com",
  projectId: "login-eda54",
  storageBucket: "login-eda54.appspot.com",
  messagingSenderId: "737560064896",
  appId: "1:737560064896:web:95696c673784da6d230765",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
