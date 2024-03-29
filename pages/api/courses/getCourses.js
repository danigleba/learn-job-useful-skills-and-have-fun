import {db} from '../../../utils/firebase/index'
import { collection, getDocs, doc, query, where} from "firebase/firestore"

export default async function(req, res) {  
  const articlesRef = collection(db, "courses")
  const articlesSnap = query(articlesRef)
  const queryArticlesSnap = await getDocs(articlesSnap)

  try {
    const docs = []
    queryArticlesSnap.forEach((doc) => {
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
