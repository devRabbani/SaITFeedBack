import './topInfoBar.style.css'
import { motion } from 'framer-motion'

const usncardVariants = {
  hidden: {
    y: -60,
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
    y: -200,
    opacity: 0,
    transition: { ease: 'easeInOut' },
  },
}

export default function TopInfoBar({ dept, userData, status }) {
  return (
    <motion.div
      variants={usncardVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='usnCard'
    >
      <p className='deptName'>DEPARTMENT OF {dept}</p>
      <div className='topBar'>
        <p className='usnNumber'>
          <strong>USN :</strong>{' '}
          <span className='usn'>{userData.usn.toUpperCase()}</span>
        </p>
        <p>
          <strong>Sem :</strong> {userData.sem}
        </p>
        <p>
          <strong>Sec :</strong> {userData.sec.toUpperCase()}
        </p>
        <p>
          <strong> Branch :</strong> {userData.branch.toUpperCase()}
        </p>

        {status === 0 ? (
          <p>
            <strong>Feedback Status :</strong>{' '}
            <span className='status completed'>Completed</span>
          </p>
        ) : (
          <p>
            <strong>Pending Feedback :</strong>{' '}
            <span className='status'>{status}</span>
          </p>
        )}
      </div>
    </motion.div>
  )
}
