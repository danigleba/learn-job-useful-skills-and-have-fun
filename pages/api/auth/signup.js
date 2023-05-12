import {db} from '../../../firebase/index'
import { collection, addDoc, query, where, getDocs, doc} from "firebase/firestore"; 
import {sign} from 'jsonwebtoken'
import { serialize } from "cookie";
import crypyo from "crypto";

const secret = process.env.SECRET;
const crypto = require('crypto')

export default async function (req, res) {
    const seed = Math.floor(Math.random() * 4) + 1
    const profile_url = `https://firebasestorage.googleapis.com/v0/b/kualify-web-fb.appspot.com/o/profile%2F${seed}.png?alt=media&token=24e34565-6693-475a-8a72-f691e8d5ca4d`
    const { email, password, first_name, last_name, language } = req.body
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    //check weather email is alrady registred in database
    const usersRef = collection(db, "users")
    const userSnap = query(usersRef, where("email", "==", email))
    const queryUserSnap = await getDocs(userSnap)
    let userExists = false
    queryUserSnap.forEach((doc) => {
        if (doc.id !== "") {
            userExists = true
        }})
        if (userExists) {
            res.json({message: "Email already is registred"})
        } else {
            //add user to firestore database
            const docRef = addDoc(collection(db, "users"), {
                    email: email,
                    password: hashedPassword,
                    first_name: first_name,
                    last_name: last_name,
                    country: language,
                    profile_url: profile_url,
                    premium: false
            })
            //create a cookie
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
            res.status(200).json({message: "User added to database"})
        }
}
 