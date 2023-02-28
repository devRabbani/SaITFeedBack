import { AnimatePresence } from 'framer-motion'
import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import useAuthListner from './hooks/useAuthListner'
import RequireAuth from './components/requireAuth'
import LoaderPage from './components/loaderPage'
import { Toaster } from 'react-hot-toast'
import HomeLayout from './layout/homelayout'

const Feedback = lazy(() => import('./pages/Feedback'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Webniar = lazy(() => import('./pages/Webniar'))
const Activate = lazy(() => import('./pages/Activate'))
const Docs = lazy(() => import('./pages/Docs'))

const App = () => {
  const { user, machine } = useAuthListner()
  const location = useLocation()

  useEffect(() => {
    console.log(
      '%cCan%cWeBe!',
      'color: #e47e24; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;',
      'color: #fff; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;'
    )
    console.log(
      '%cHey explorer!, Are you lost?? Because this is not the right place for you. If you want to work with us at CanWeBe contact us now.',
      'color: #e1e1e1; font-size: 1.5em;'
    )
  }, [])

  return (
    <>
      <HomeLayout user={user}>
        <Suspense fallback={<LoaderPage />}>
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route element={<RequireAuth user={user} />}>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/webniar" element={<Webniar />} />
              </Route>
              <Route path="/activate" element={<Activate />} />
              <Route path="/docs" element={<Docs />} />
              <Route
                path="/login"
                element={<Login user={user} machine={machine} />}
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </HomeLayout>

      <Toaster />
    </>
  )
}

export default App
