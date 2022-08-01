import { motion } from 'framer-motion'
import './docs.style.css'

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

export default function Docs() {
  return (
    <motion.div
      className='docs'
      variants={mainvariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <h2>Documentaion</h2>
      <div className='docSection'>
        <h3>Giving Review (For Student)</h3>
        <ol>
          <li>
            First enter your <span className='strong'>USN</span> and Click{' '}
            <span className='strong'>Next</span>
          </li>
          <li>
            Wait for recaptcha ( If you get any error please reload the app )
          </li>
          <li>
            It will send <span className='strong'>OTP</span> to registered
            mobile number
          </li>
          <li>
            Enter the <span className='strong'>OTP</span> and{' '}
            <span className='strong'>Verify</span>
          </li>
          <li>
            Now Go to <span className='strong'>Home</span> tab and Give review
            to all subjects
          </li>
          <li>
            Make sure to click <span className='strong'>submit</span> after all
            questions
          </li>
        </ol>
      </div>
      <div className='docSection'>
        <h3>Signin With Admin</h3>
        <ol>
          <li>
            Go to <span className='strong'>Admin</span> section or{' '}
            <a
              href='https://saitdashboard.netlify.app'
              target='_blank'
              rel='noopener noreferrer'
            >
              saitdashboard.netlify.app
            </a>
          </li>
          <li>
            Sign in with admin <span className='strong'>email</span> and{' '}
            <span className='strong'>password</span>
          </li>
        </ol>
      </div>
      <div className='docSection'>
        <h3>Generating Review</h3>
        <ol>
          <li>First Sign in to admin section</li>
          <li>
            Go to <span className='strong'>Home</span> and Select prefered{' '}
            <span className='strong'>Semester</span>
          </li>
          <li>
            Click <span className='strong'>Generate</span> and wait for result
          </li>
        </ol>
      </div>
      <div className='docSection'>
        <h3>Clearing Old Review and Collect new Data</h3>
        <ol>
          <li>First Sign in to admin section</li>
          <li>
            Go to <span className='strong'>Home</span> and Select prefered{' '}
            <span className='strong'>Semester</span>
          </li>
          <li>
            Click <span className='strong'>Clear and Create New Feedbacks</span>{' '}
            button
          </li>
          <li>
            Then click <span className='strong'>Ok</span> and wait for result,
            Now you can get new Feedbacks
          </li>
        </ol>
      </div>
      <div className='docSection'>
        <h3>Activating New System or fix System is not Activated error</h3>
        <ol>
          <li>
            Go to <span className='strong'>/activate</span> route (manualy type
            in the address bar)
          </li>
          <li>
            Enter admin <span className='strong'>email</span> and{' '}
            <span className='strong'>password</span>
          </li>
          <li>
            Click <span className='strong'>Activate</span> and Its Done
          </li>
          <li>
            If you get any error contact{' '}
            <a
              href='https://canwebe.tech'
              target='_blank'
              rel='noopener noreferrer'
            >
              CanWeBe!
            </a>
          </li>
        </ol>
      </div>
      <div className='docSection'>
        <h3>Other Errors</h3>
        <ol>
          <li>
            If your USN doesn't exist in the database contact your respected
            depertment
          </li>
          <li>
            If you not able to use this app or any crash contact{' '}
            <a
              href='https://canwebe.tech'
              target='_blank'
              rel='noopener noreferrer'
            >
              CanWeBe!
            </a>
          </li>
        </ol>
      </div>
    </motion.div>
  )
}
