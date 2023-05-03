import {storage} from '../../../firebase/index'
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default async function(req, res) { 
    const cover_url= req.query.cover_url
    const storage = getStorage()
    const storageRef = ref(storage)
    const coverRef = ref(storage, cover_url)
    getDownloadURL(coverRef)
     .then((url) => {
        res.status(200).json({ data: url })
    })
}
