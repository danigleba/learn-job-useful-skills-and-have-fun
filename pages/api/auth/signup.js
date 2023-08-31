import {db} from '../../../utils/firebase/index'
import { collection, addDoc, query, where, getDocs} from "firebase/firestore"; 

export default async function (req, res) {
    const profile_url = req.query.profile_url
    const email = req.query.email
    const username = req.query.username
    const lang = req.query.lang

    //Check if user already exists
    const usersRef = collection(db, "users")
    const userSnap = query(usersRef, where("email", "==", email))
    const queryUserSnap = await getDocs(userSnap)
    let userExists = false
    queryUserSnap.forEach((doc) => {
        if (doc.id !== "") {
            userExists = true
        }})

    if (userExists) {
        res.status(200).json({userCreated: true})
    } else {
        try {
            const newUser = await addDoc(collection(db, "users"), {
                    email: email,
                    username: username,
                    country: lang,
                    profile_url: profile_url,
                    premium: false
                })
            res.status(200).json({userCreated: true})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
