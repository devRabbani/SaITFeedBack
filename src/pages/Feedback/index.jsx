import { useEffect, useRef } from 'react'
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
  const { teacherName, subfull, subcode, id, usn, branch } =
    location?.state || {}

  useTitle(
    teacherName ? `${teacherName} | SaITFeedback` : 'Feedback | SaITFeedback'
  )

  // Side Effect
  useEffect(() => {
    // If Location State is not there
    if (!location?.state) {
      navigate('/')
    }
  }, [navigate, location?.state])

  useEffect(() => {
    // Scroll to Top
    scrollRef.current?.scrollIntoView()
  }, [])

  return !location?.state ? null : (
    <>
      <div ref={scrollRef}></div>
      <motion.div className="feedback" variants={mainvariants} exit="exit">
        <motion.div
          variants={teachercardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="usnCard"
        >
          <p className="deptName">DEPARTMENT OF {branch}</p>
          <div className="topBar">
            <p>Name : {teacherName}</p>
            <p>
              <strong>Sub Code :</strong> {subcode}
            </p>
            <p>
              <strong>Sub Name :</strong> {subfull}
            </p>
          </div>
        </motion.div>
        <div className="questionHeight">
          <FeedbackQuestions teacherid={id} usn={usn} subcode={subcode} />
        </div>
      </motion.div>
    </>
  )
}

export default Feedback
