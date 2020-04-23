import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD0K5SEPDT9O2PXXPnzBDhkhsEr8Sw6NbI",
  authDomain: "diary-75135.firebaseapp.com",
  databaseURL: "https://diary-75135.firebaseio.com/",
  projectId: "diary-75135",
  storageBucket: "diary-75135.appspot.com",
  messagingSenderId: "84549357659",
  appId: "1:84549357659:web:7063e3459d598f1b30af7e"
};
firebase.initializeApp(firebaseConfig);

// > Exports

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

export { db, auth, functions };
