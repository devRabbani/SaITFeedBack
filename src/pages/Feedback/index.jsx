import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './feedback.style.css'
import { motion } from 'framer-motion'
import useTitle from '../../hooks/useTitle'
import FeedbackQuestions from '../../components/feedbackQuestions'

const teachercardVariants = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      mass: 0.5,
      damping: 8,
    },
  },

  exit: {
    x: '100vw',
    transition: { ease: 'easeInOut' },
  },
}

const mainvariants = {
  exit: {
    x: '100vw',
    transition: { ease: 'easeInOut' },
  },
}

const Feedback = () => {
  //React Router tools
  const location = useLocation()
  const navigate = useNavigate()
  const scrollRef = useRef()
  // const { name, sub, uid } = location.state;

  // ------States-------
  //Name and Sub for teacher
  const [subject, setSubject] = useState({
    teacherName: '',
    subfull: '',
    subcode: '',
    teacherid: '',
    usn: '',
    branch: '',
  })

  useTitle(
    subject.teacherName
      ? `${subject.teacherName} | SaITFeedback`
      : 'Feedback | SaITFeedback'
  )

  // Side Effect
  useEffect(() => {
    // If Location State is there
    if (location.state) {
      //Getting teacher data
      const { teacherName, subfull, subcode, teacherid, usn, branch } =
        location.state

      setSubject({ teacherName, subfull, subcode, teacherid, usn, branch })
    } else {
      //Otherwise Navigate back to home
      navigate('/')
    }
  }, [])

  useEffect(() => {
    // Scroll to Top
    scrollRef.current.scrollIntoView()
  }, [])

  return (
    <>
      <div ref={scrollRef}></div>
      <motion.div className='feedback' variants={mainvariants} exit='exit'>
        <motion.div
          variants={teachercardVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='usnCard'
        >
          <p className='deptName'>DEPARTMENT OF {subject.branch}</p>
          <div className='topBar'>
            <p>Name : {subject.teacherName}</p>
            <p>
              <strong>Sub Code :</strong> {subject.subcode}
            </p>
            <p>
              <strong>Sub Name :</strong> {subject.subfull}
            </p>
          </div>
        </motion.div>
        <div className='questionHeight'>
          <FeedbackQuestions
            teacherid={subject.teacherid}
            usn={subject.usn}
            subcode={subject.subcode}
          />
        </div>
      </motion.div>
    </>
  )
}

export default Feedback
