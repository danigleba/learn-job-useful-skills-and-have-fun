import {db} from '../../../utils/firebase/index'
import { getDoc, doc} from "firebase/firestore";


export default async function(req, res) {
    const id_video = req.query.id_video
    const videoRef = doc(db, "content", id_video) 
    const videoSnap = await getDoc(videoRef)
    try {
        if (videoSnap.exists()) {
            res.status(200).json({video: videoSnap.data()})
        } else {
            res.status(401).json({message: "Failed! Article not found"})
        }
    } catch (error) {
        res.status(500).json({message: "Server error!"})
    }
}

