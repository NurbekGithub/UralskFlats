import { useState, useEffect } from "react"
import getFirebase from "../config/firebase"

export function useFirestoreCollection(collectionName) {
  const [data, setData] = useState([])
  const db = getFirebase().firestore()
  useEffect(() => {
    db.collection(collectionName)
      .get()
      .then(snap => {
        const result = []
        snap.forEach(doc => {
          const obj = doc.data()
          result.push({ id: doc.id, ...obj })
        })
        setData(result)
      })
  }, [])
  return data
}
