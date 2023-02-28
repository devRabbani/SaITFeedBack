import { motion } from 'framer-motion'
import Star from '../star'

const optionvariants = {
  hover: {
    borderWidth: '2px',
    padding: '9px 19px 9px 14px',
  },
}

const Options = ({ label, value, clickFxn, flag }) => {
  return (
    <motion.button
      className={flag ? 'active' : ''}
      onClick={() => clickFxn(value)}
    >
      {label}
      <span className="star">
        <Star rating={value} />
      </span>
    </motion.button>
  )
}

export default Options
