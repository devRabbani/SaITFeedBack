import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

const useData = (usn) => {
  const [userData, setUserData] = useState({})
  const [subLists, setSubLists] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'students', usn), (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.data())
      }
    })
    return () => unsub()
  }, [usn])

  useEffect(() => {
    let unsub
    if (userData) {
      const classStr = `${userData.branch}_${userData.sem}_${userData.sec}`
      unsub = onSnapshot(doc(db, 'classes', classStr), (snapshot) => {
        if (snapshot.exists()) {
          setSubLists(snapshot.data().sub)
        }
      })
    }

    return () => unsub()
  }, [userData])

  return { userData, subLists }
}

export default useData
