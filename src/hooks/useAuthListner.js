import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth, firebaseApp } from '../lib/firebase'

export default function useAuthListner() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const [machine, setMachine] = useState(
    JSON.parse(localStorage.getItem('machine'))
  )

  useEffect(() => {
    const listner = onAuthStateChanged(auth, (authuser) => {
      if (authuser) {
        // Have authuser
        const method = authuser.providerData[0].providerId
        if (method === 'password') {
          localStorage.setItem('machine', JSON.stringify(authuser))
          setMachine(authuser)
          console.count('Setup machine Complete')
        } else {
          localStorage.setItem('authUser', JSON.stringify(authuser))
          setUser(authuser)
          console.count('Set User Complete')
        }
      } else {
        // not have authuser means logout
        localStorage.removeItem('authUser')
        setUser(null)
      }
    })

    return () => listner()
  }, [firebaseApp])

  return { user, machine }
}
