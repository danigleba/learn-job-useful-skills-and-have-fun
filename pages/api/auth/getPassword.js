import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from '@/firebase/index'

export default async function (req, res) {
  const email = req.query.email
  const usersRef = collection(db, "users")
  const userSnap = query(usersRef, where("email", "==", email))
  const queryUserSnap = await getDocs(userSnap)
  try { 
    queryUserSnap.forEach((doc) => {   
      if (doc.id != "") {
        res.status(200).json({data: doc.data()})  
      }
    })
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" })
    }
}

