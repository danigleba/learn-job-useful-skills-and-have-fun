import { db } from '../../../utils/firebase/index';
import { collection, updateDoc, getDocs, query, where} from "firebase/firestore";

export default async function handler(req, res) {
    const index = req.query.index
    const id_course = req.query.id_course
    const email = req.query.email
    const collectionRef = collection(db, "user_progress");
    const docSnap = query(collectionRef, where("id_course", "==", id_course), where("user_email", "==", email));

    try {
        const querySnap = await getDocs(docSnap);
        const updatePromises = [];

        querySnap.forEach((doc) => {
            const updatePromise = updateDoc(doc.ref, {
                active_step: index
            })
            updatePromises.push(updatePromise)
        })

        await Promise.all(updatePromises)

        res.status(200).json({ message: "OK" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error!" })
    }
}
