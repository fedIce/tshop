import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, where, getDoc, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app)
export {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateCurrentUser,
    onAuthStateChanged,
    collection,
    getDocs,
    getDoc,
    query,
    where,
    addDoc,
    doc,
    setDoc,
    deleteDoc
}
