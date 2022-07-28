import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'

const useData = (uid) => {
  const [userData, setUserData] = useState({})
  const [subLists, setSubLists] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'students'), where('uid', '==', uid), limit(1)),
      (snapshot) => {
        if (!snapshot.empty) {
          setUserData(snapshot.docs[0].data())
        }
      }
    )
    return () => unsub()
  }, [uid])

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
