import { Link, NavLink } from 'react-router-dom'
import {
  FaHome,
  FaUserTie,
  FaSignOutAlt,
  FaSignInAlt,
  FaLaptopCode,
  FaInfo,
} from 'react-icons/fa'
import './homeLayout.style.css'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import logo from '../assets/logo.webp'
import toast from 'react-hot-toast'

export default function HomeLayout({ children, user }) {
  const handleSignout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      toast.error('Error in signout, Try again!')
      console.log(error)
    }
  }
  return (
    <>
      <div className="admin">
        <div className="adminGrid">
          <div className="sideMenu">
            <div className="sideLogo">
              <Link to="/" className="logo">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <p className="sublogo">Student Feedback</p>
            <div className="menuItemsWrapper">
              <NavLink to="" end={true}>
                <FaHome /> Home
              </NavLink>
              <NavLink to="webniar" end={true}>
                <FaLaptopCode />
                Webniar
              </NavLink>
              <NavLink to="docs" end={true}>
                <FaInfo />
                Docs
              </NavLink>

              <a
                href="https://saitdashboard.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaUserTie />
                Admin
              </a>
            </div>
            <div className="logOutDiv">
              {user ? (
                <button className="logOut" onClick={handleSignout}>
                  Logout <FaSignOutAlt />
                </button>
              ) : (
                <Link to="/login">
                  Login <FaSignInAlt />
                </Link>
              )}
            </div>
            <p className="developer">
              Developed By{' '}
              <a
                href="https://www.canwebe.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                CanWeBe!
              </a>
            </p>
          </div>
          <div className="mainContent">{children}</div>
        </div>
      </div>
      <div className="mobileLayout wrapper">
        Not supported in this width.Please view in full screen
      </div>
    </>
  )
}
