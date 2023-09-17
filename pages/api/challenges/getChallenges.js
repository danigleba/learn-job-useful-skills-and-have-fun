import {db} from '../../../utils/firebase/index'
import { collection, getDocs, doc, query, where} from "firebase/firestore"

export default async function(req, res) {  
  const challengesRef = collection(db, "challenges")
  const challengesSnap = query(challengesRef)
  const queryChallengesSnap = await getDocs(challengesSnap)

  try {
    const docs = []
    queryChallengesSnap.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        })
      
    })
    res.status(200).json({ data: docs })
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Server error."})
  }

}