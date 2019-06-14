import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCguYzU9B4biCgXEhefyq88Q2Jg4NDhnCk",
  authDomain: "react-clone-82986.firebaseapp.com",
  databaseURL: "https://react-clone-82986.firebaseio.com",
  projectId: "react-clone-82986",
  storageBucket: "react-clone-82986.appspot.com",
  messagingSenderId: "34466384738",
  appId: "1:34466384738:web:74e060230b38697a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
