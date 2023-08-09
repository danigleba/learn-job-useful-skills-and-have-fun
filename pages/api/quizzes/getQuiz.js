import {db} from '../../../utils/firebase/index'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export default async function (req, res) {
    const id_course = req.query.id_course
    const quizRef = collection(db, "quizzes")
    const quizSnap = query(quizRef, where("id_course", "==", id_course))
    const queryQuizSnap = await getDocs(quizSnap)
    queryQuizSnap.forEach((doc) => {
        try {
            if (doc.id !== "") {
                res.status(200).json({data: doc.data()})
             } else {
                res.status(401).json({message: "Quiz not found in database."})
             }
        } catch (error) {
            res.status(500).json({message: "Server error."})
        }
    })      
} 