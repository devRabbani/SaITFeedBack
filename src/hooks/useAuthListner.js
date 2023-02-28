import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'

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
        } else {
          localStorage.setItem('authUser', JSON.stringify(authuser))
          setUser(authuser)
        }
      } else {
        // not have authuser means logout
        localStorage.removeItem('authUser')
        setUser(null)
      }
    })

    return () => listner()
  }, [])

  return { user, machine }
}
