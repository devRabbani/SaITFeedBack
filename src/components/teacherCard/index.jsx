import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const teachercardVariants = {
  hidden: { opacity: 0, scale: 0.6, rotateX: -180 },

  visible: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.45,
    },
  },
}

const TeacherCard = ({ subjectData, usn, mark, branch }) => {
  // Object Destruction subjectData
  const { teacherName, subfull, subshort, subcode, teacherid, img } =
    subjectData

  return (
    <motion.div variants={teachercardVariants}>
      <Link
        to='feedback'
        onClick={(e) => mark && e.preventDefault()}
        state={{
          teacherName,
          teacherid,
          subcode,
          subfull,
          usn,
          branch,
        }}
        className={`teacherCard ${mark && 'done'}`}
      >
        <div className='img'>{img && <img src={img} alt='Avatar Img' />}</div>
        <div className='right'>
          <p className='subcodeName'>{subcode}</p>
          <div className='flexGroup'>
            <p className='teacherName'>{teacherName} ,</p>
            <p className='subName'>
              <strong>Subject : </strong>
              {subshort}
            </p>
          </div>

          <p className='subFull'>{subfull}</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default TeacherCard
