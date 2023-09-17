// pages/api/getUserProgress.js

import { db } from "@/utils/firebase" // Import the Firestore instance
import {getDocs, collection, where, doc, getDoc, query} from 'firebase/firestore'

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email } = req.query;
    // Query Firestore to get documents where email matches
    const collectionRef = collection(db, "user_progress");
    const queryData = query(collectionRef, where("user_email", "==", email))
    const querySnapshot = await getDocs(queryData);

    //const querySnapshot = await getDocs(collection(db, "user_progress"), where("user_email", "==", email));

    const userProgress = [];
    const coursesData = []

    //Iterate through the documents and add them to the userProgress array
    querySnapshot.forEach((doc) => { 
        userProgress.push(doc.data());
    });
    
    // Query courses collection for documents with matching userProgress IDs
    for (var i=0; i<userProgress.length; i++) {
        if (userProgress[i].active_step > 0 && userProgress[i]?.completed == true ) {

            const courseRef = doc(db, "courses", userProgress[i].id_course);
            const courseSnapshot = await getDoc(courseRef);

            if (courseSnapshot.exists() ) {
                const courseData = courseSnapshot.data();
                if (courseData.tag != "Course") {
                  coursesData.push({
                      id: userProgress[i].id_course,
                      ...courseData, 
                      })
                }
            } 
        }
    }
      
    res.status(200).json({ data: coursesData });

  } catch (error) {
    console.error("Error fetching user progress:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
