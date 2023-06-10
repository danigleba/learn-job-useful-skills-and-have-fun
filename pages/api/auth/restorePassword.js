import {sign} from 'jsonwebtoken'
import { serialize } from "cookie";
import { getFirestore, collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import crypyo from "crypto";
import {db} from '../../../firebase/index'

const secret = process.env.SECRET;
const crypto = require('crypto')

export default async function (req, res) {
  const { email, password } = req.body
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  const usersRef = collection(db, "users")
  const userSnap = query(usersRef, where("email", "==", email), where("password", "==", hashedPassword))
  const queryUserSnap = await getDocs(userSnap)
  let userFound = false
  queryUserSnap.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data())
    try {    
      if (doc.id !== "") {
          userFound = true
      } 
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" })
      }
  })
} 
