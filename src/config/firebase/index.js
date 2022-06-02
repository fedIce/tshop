import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser } from 'firebase/auth'
import { getFirestore, collection, getDocs, query, where, getDoc, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0QHvw2qGHlQk7gOa9sN-CjijXmaWYMXk",
    authDomain: "t-shop-dfad7.firebaseapp.com",
    projectId: "t-shop-dfad7",
    storageBucket: "t-shop-dfad7.appspot.com",
    messagingSenderId: "717527352703",
    appId: "1:717527352703:web:346c6d8105b27e1add464a",
    measurementId: "G-GX1ZTJSLDP"
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
