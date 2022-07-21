import { AnimatePresence } from 'framer-motion'
import React, { Suspense, lazy, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import useAuthListner from './hooks/useAuthListner'
import RequireAuth from './components/requireAuth'
import LoaderPage from './components/loaderPage'
import Nav from './components/nav'
import Footer from './components/footer'
import { Toaster } from 'react-hot-toast'
import Bottombar from './components/bottombar'
import Webniar from './pages/Webniar'
import HomeLayout from './layout/homelayout'

const Feedback = lazy(() => import('./pages/Feedback'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))

const App = () => {
  const user = JSON.parse(sessionStorage.getItem('authUser'))
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
              <Route path='/login' element={<Login user={user} />} />
            </Routes>
          </AnimatePresence>
        </HomeLayout>
      </Suspense>
      <Toaster />

      {/* <Nav />
      <Toaster />
      <div ref={scrollRef} className='navMargin'></div>
      <div className='mainBody'>
        <Suspense fallback={<LoaderPage />}>
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route
                path='/'
                element={
                  <RequireAuth user={user} redirectTo='/login'>
                    <Home user={user} />
                  </RequireAuth>
                }
              />
              <Route
                path='/feedback'
                element={
                  <RequireAuth user={user} redirectTo='/login'>
                    <Feedback scrollRef={scrollRef} />
                  </RequireAuth>
                }
              />
              <Route
                path='/webniar'
                element={
                  <RequireAuth user={user} redirectTo='/login'>
                    <Webniar user={user} />
                  </RequireAuth>
                }
              />
              <Route path='/login' element={<Login user={user} />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
      {(location.pathname === '/' || location.pathname === '/webniar') && (
        <Bottombar />
      )} */}

      {/* <Footer /> */}
    </>
  )
}

export default App
