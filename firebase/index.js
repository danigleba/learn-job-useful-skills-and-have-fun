import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// replace this firebase conFigvariable with your own
const firebaseConfig = {
    apiKey: "AIzaSyB8CKG_tNBPemCjwd4lQIe16lNTBP_z1Jo",
    authDomain: "kualify-web-fb.firebaseapp.com",
    projectId: "kualify-web-fb",
    storageBucket: "kualify-web-fb.appspot.com",
    messagingSenderId: "260568843965",
    appId: "1:260568843965:web:6c367d60977f856a0459d4"
}

const app =  initializeApp(firebaseConfig)
const db = getFirestore(app);
const storage = getStorage(app)

export {storage}
export { db }