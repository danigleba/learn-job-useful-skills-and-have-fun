
import {db} from '../../../firebase/index'
import crypyo from "crypto";
import { collection, getDocs, doc, query, where} from "firebase/firestore";

const crypto = require('crypto')

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
        res.status(500).json(error)
    }
}