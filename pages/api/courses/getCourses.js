import {db} from '../../../firebase/index'
import { collection, getDocs, doc, query, where} from "firebase/firestore"

export default async function(req, res) {  
  const articlesRef = collection(db, "courses")
  const articlesSnap = query(articlesRef)
  const queryArticlesSnap = await getDocs(articlesSnap)

    const docs = []
    queryArticlesSnap.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        })
    })

    res.status(200).json({ data: docs })

}
