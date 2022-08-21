import React, { useRef, useState, useEffect } from 'react'
import { auth } from '../../lib/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import './login.style.css'
import { studentWithUsn, updateInfo } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

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

const Login = ({ user, machine }) => {
  // Setting Title
  useTitle('Home | SaITFeedback')

  //States
  const [inputData, setInputData] = useState({
    usn: '',
    otp: '',
  })
  const [final, setFinal] = useState()
  const [show, setShow] = useState(false)
  // const [userData, setUserData] = useState({})
  const [error, setError] = useState('')
  const [succes, setSucces] = useState('')
  const [loading, setLoading] = useState(false)
  const [isNew, setIsNew] = useState(true)

  const inputRef = useRef()
  const { usn, otp } = inputData
  // const { user } = useAuthListner()
  const navigate = useNavigate()
  let pno = ''

  const isValid = usn === '' || usn.length < 10
  const otpInvalid = otp === '' || otp.length < 6

  //Handling Inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setError('')
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!machine) {
      toast.error('This system is not activated. Please See Docs')
      return
    }
    setLoading(true)
    const toastId = toast.loading('Collecting data from the database')
    const data = await studentWithUsn(usn)

    // If Phone Number Found
    if (data) {
      toast.success('Authentication Successfull', {
        id: toastId,
      })
      await sessionStorage.setItem('authUser', JSON.stringify(data))
      navigate('/')
    } else {
      setLoading(false)
      setSucces('')
      toast.error(<b>No data found for USN: {usn.trim().toUpperCase()}</b>, {
        id: toastId,
      })
      setError('No info found USN incorrect , Please contact department')
    }
  }

  useEffect(() => {
    if (!loading && user) {
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
          {error && <p className='errorMsg'>{error}</p>}
          {succes && <p className='succesMsg'>{succes}</p>}
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
              onChange={handleChange}
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
          <p className='captchaText'>Hidden Auto ReCaptcha Verifier</p>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
