import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  FaHome,
  FaUserGraduate,
  FaUserTie,
  FaBook,
  FaSignOutAlt,
  FaSignInAlt,
  FaStar,
  FaLaptopCode,
} from 'react-icons/fa'
import './homeLayout.style.css'
import { signOut } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import { auth } from '../lib/firebase'
import logo from '../assets/logo.webp'

export default function HomeLayout({ children, user }) {
  const navigate = useNavigate()
  const handleSignout = () => {
    sessionStorage.removeItem('authUser')
    navigate('/login')
  }
  return (
    <>
      <div className='admin'>
        <div className='adminGrid'>
          <div className='sideMenu'>
            <div className='sideLogo'>
              <Link to='/' className='logo'>
                <img src={logo} alt='logo' />
              </Link>
            </div>
            <div className='menuItemsWrapper'>
              <NavLink to='' end={true}>
                <FaHome /> Home
              </NavLink>
              <NavLink to='webniar' end={true}>
                <FaLaptopCode />
                Webniar
              </NavLink>

              <a
                href='https://saitdashboard.netlify.app'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaUserTie />
                Admin
              </a>

              <NavLink to='about' end={true}>
                <FaBook /> About
              </NavLink>
            </div>
            <div className='logOutDiv'>
              {user ? (
                <button className='logOut' onClick={() => signOut(auth)}>
                  Logout <FaSignOutAlt />
                </button>
              ) : (
                <Link to='/login'>
                  Login <FaSignInAlt />
                </Link>
              )}
            </div>
            <p className='developer'>
              Developed By{' '}
              <a
                href='https://canwebe.tech'
                target='_blank'
                rel='noopener noreferrer'
              >
                CanWeBe!
              </a>
            </p>
          </div>
          <div className='mainContent'>{children}</div>
        </div>
      </div>
      <div className='mobileLayout wrapper'>
        Not supported in this width.Please view in full screen
      </div>
    </>
  )
}
