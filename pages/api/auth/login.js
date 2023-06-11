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
    try {    
      if (doc.id !== "") {
          userFound = true
      } 
    } catch (error) {
      res.status(500).json({ message: "Server error" })
      }
  })
  if (userFound) {
    //create cookie
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15, 
        email: email,
      },
      secret
      )
      const serializedCookie = serialize("kualifyApp", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60*60*24*15, 
        path: "/",
      })
      res.setHeader("Set-Cookie", serializedCookie)
      res.status(200).json({message: "User found in database!"})
  } else {
    res.json({message: "User not found in database"})
  }
}