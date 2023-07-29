
import {db} from '../../../firebase/index'
import { collection, getDocs, doc, query, where} from "firebase/firestore";


export default async function(req, res) {
    const { cookies } = req
    const jwt = cookies.kualifyApp
    if (!jwt) {
        res.json({message: "Cookie not found"})
        return
        }
    try {
        res.status(200).json({message: "User is logged in"})
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}