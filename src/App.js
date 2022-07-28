import { AnimatePresence } from 'framer-motion'
import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import useAuthListner from './hooks/useAuthListner'
import RequireAuth from './components/requireAuth'
import LoaderPage from './components/loaderPage'
import { Toaster } from 'react-hot-toast'
import Webniar from './pages/Webniar'
import HomeLayout from './layout/homelayout'
import About from './pages/About'

const Feedback = lazy(() => import('./pages/Feedback'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))

const App = () => {
  const { user } = useAuthListner()
  const location = useLocation()

  return (
    <>
      <Suspense fallback={<LoaderPage />}>
        <HomeLayout user={user}>
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route element={<RequireAuth user={user} />}>
                <Route path='/' element={<Home user={user} />} />
                <Route path='/feedback' element={<Feedback />} />
                <Route path='/webniar' element={<Webniar />} />
              </Route>
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login user={user} />} />
            </Routes>
          </AnimatePresence>
        </HomeLayout>
      </Suspense>
      <Toaster />
    </>
  )
}

export default App
