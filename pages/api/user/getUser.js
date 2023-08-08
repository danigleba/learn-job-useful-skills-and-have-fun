import {db} from '../../../firebase/index'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { verify } from 'jsonwebtoken';
import { parse } from 'cookie';

const secret = process.env.FIREBASE_KEY;

export default async function (req, res) {
  const token = parse(req.headers.cookie).kualifyApp;
  if (token) {
    const decoded = verify(token, secret);
    const email = decoded.email;

    const usersRef = collection(db, "users")
    const userSnap = query(usersRef, where("email", "==", email))
    const queryUserSnap = await getDocs(userSnap)
    try {
        queryUserSnap.forEach((doc) => {
            res.status(200).json({data: doc.data()})
        })
    } catch (error) {
            console.log(error)
            res.status(500).json({message: "Server error"})
        }
  } else {
    res.status(401).json({message: "Token not found"})
  }
}