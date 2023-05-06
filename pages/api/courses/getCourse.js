import {db} from '../../../firebase/index'
import { collection, getDoc, doc} from "firebase/firestore";


export default async function(req, res) {
    const id_course = req.query.id_course
    const articleRef = doc(db, "courses", id_course) 
    const articleSnap = await getDoc(articleRef)
    try {
        if (articleSnap.exists()) {
            res.status(200).json({course: articleSnap.data()})
        } else {
            res.status(401).json({message: "Failed! Article not found"})
        }
    } catch (error) {
        res.status(500).json({message: "Server error!"})
    }
    //res.status(200).json({msg: "Get Article", article})
}
