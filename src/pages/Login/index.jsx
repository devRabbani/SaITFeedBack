import React, { useRef, useState, useEffect } from 'react'
import { auth } from '../../lib/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import './login.style.css'
import { studentWithUsn, updateInfo } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Modal from '../../components/modal'
import useTitle from '../../hooks/useTitle'
import toast from 'react-hot-toast'

const containerVariants = {
  hidden: {
    y: '-80vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.5,
      damping: 9,
    },
  },

  exit: {
    y: '80vh',
    transition: { ease: 'easeInOut' },
  },
}

const Login = ({ user }) => {
  // Setting Title
  useTitle('Home | SaITFeedback')

  //States
  const [usn, setUsn] = useState('')
  const [loading, setLoading] = useState(false)
  const isValid = usn === '' || usn.length < 10
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const toastId = toast.loading(`Collecting data for USN: ${usn}`)
    try {
      const data = await studentWithUsn(usn)
      console.log(data)
      if (data) {
        toast.success('Authentication Successfull', {
          id: toastId,
        })
        await sessionStorage.setItem('authUser', JSON.stringify(data))
        navigate('/')
      } else {
        toast.error('No Data Found for this USN', {
          id: toastId,
        })
      }
    } catch (error) {
      toast.error('Something Went Wrong, Try Again', {
        id: toastId,
      })
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <div className='loginDiv'>
      <motion.div
        variants={containerVariants}
        animate='visible'
        initial='hidden'
        exit='exit'
        className='wrapper login'
      >
        <form onSubmit={handleSubmit}>
          <h2>Authentication</h2>

          <div className='formDiv'>
            <input
              name='usn'
              className='formInput'
              placeholder=' '
              value={usn}
              required
              maxLength='10'
              autoComplete='off'
              onChange={(e) => setUsn(e.target.value)}
            />
            <label className='formLabel'>Enter Your USN</label>
          </div>

          <div id='captcha' className='captcha'></div>

          <button
            type='submit'
            className={`btn ${isValid ? 'disabled' : ''}`}
            disabled={isValid || loading}
          >
            {loading ? 'Please Wait...' : 'Next'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
