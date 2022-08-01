import './webniar.style.css'
import { motion } from 'framer-motion'

const mainvariants = {
  hidden: {
    x: -200,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      opacity: { duration: 0.7, ease: 'easeInOut' },
      duration: 0.3,
    },
  },
  exit: {
    x: '100vw',
    transition: { ease: 'easeInOut' },
  },
}

export default function Webniar() {
  return (
    <motion.div
      className='webniar'
      variants={mainvariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <p>No Webniar Details</p>
    </motion.div>
  )
}
