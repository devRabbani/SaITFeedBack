import { useEffect, useState } from 'react'
import './activate.style.css'
import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useNavigate } from 'react-router-dom'
import useAuthListner from '../../hooks/useAuthListner'

export default function Activate() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { machine } = useAuthListner()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const toastId = toast.loading('Setting up Please Wait')
    signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password.trim()
    )
      .then((res) => {
        toast.success('Setup Successfull', { id: toastId })
        setIsLoading(false)
        navigate('/', { replace: true })
      })
      .catch((err) => {
        toast.error('Email or Password is Wrong, Try Again!', {
          id: toastId,
        })
        setIsLoading(false)
        console.log(err.message, err?.code)
      })
  }

  useEffect(() => {
    if (!isLoading && machine) {
      navigate('/')
    }
  }, [])

  return (
    <div className='activateWrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Activate System</h1>
        <input
          required
          type='email'
          name='email'
          placeholder='Enter admin email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type='password'
          name='password'
          minLength={6}
          value={password}
          placeholder='Enter admin password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={isLoading}>
          {isLoading ? 'Loading' : 'Activate'}
        </button>
      </form>
    </div>
  )
}
