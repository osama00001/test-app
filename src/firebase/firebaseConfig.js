import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMCscMwpwVq0YangAnHpcndAWZr7SQSXE",
  authDomain: "quizzz-me-e5d75.firebaseapp.com",
  databaseURL: "https://quizzz-me-e5d75-default-rtdb.firebaseio.com",
  projectId: "quizzz-me-e5d75",
  storageBucket: "quizzz-me-e5d75.appspot.com",
  messagingSenderId: "762945314237",
  appId: "1:762945314237:web:0c0469b7724253dbbd46d4",
  measurementId: "G-XCH82EPTJX"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const store = firebase.storage();
export default db




