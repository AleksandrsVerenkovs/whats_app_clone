import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyD_EsFVWds-VpZREBYnuy-VHJ6Lrj4Wgh0",
  authDomain: "whatsapp-clone-5214f.firebaseapp.com",
  projectId: "whatsapp-clone-5214f",
  storageBucket: "whatsapp-clone-5214f.appspot.com",
  messagingSenderId: "145288501214",
  appId: "1:145288501214:web:1f86dfface7f232d772f4f"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;