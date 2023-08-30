import { db } from '../../../utils/firebase/index';
import { collection, query, where, getDocs, addDoc, doc} from "firebase/firestore";

export default async function (req, res) {
    const id_course = req.query.id_course
    const email = req.query.email
    const courseRef = doc(db, "courses", id_course) 
    console.log(courseRef)
    const collectionRef = collection(db, "user_progress")
    const docSnap = query(collectionRef, where("id_course", "==", id_course), where("user_email", "==", email));
    try {
        const querySnap = await getDocs(docSnap);
        if (querySnap.empty) {
            if (courseRef?.title?.lenght > 0) {
                const docRef = await addDoc(collectionRef, {
                    user_email: email,
                    id_course: id_course,
                    active_step: 0,
                    limit_step: 0
                })
                const updatedQuerySnap = await getDocs(docSnap)
                res.status(200).json({ progress : updatedQuerySnap.docs[0].data() })
            } else {
                res.status(200).json({ fakeCourse : true })
            }
        } else {
            res.status(200).json({ progress: querySnap.docs[0].data() })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
