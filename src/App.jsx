import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatSelection from './pages/SeatSelection'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import AuthPage from './pages/AuthPage'
import OpeningSequence from './components/OpeningSequence'
import './App.css'
import './premium.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function SiteLayout() {
  const location = useLocation()
  return <div className="app-shell">
    <ScrollToTop/>
    <Navbar/>
    <AnimatePresence mode="wait"><div className="site-content" key={`${location.pathname}${location.search}`}><Outlet/></div></AnimatePresence>
    <Footer/>
  </div>
}

function AuthLayout({ children }) {
  const location = useLocation()
  return <div className="app-shell auth-shell"><ScrollToTop/><AnimatePresence mode="wait"><div key={location.pathname}>{children}</div></AnimatePresence></div>
}

function App() {
  return <BookingProvider><BrowserRouter><OpeningSequence/><Routes>
    <Route element={<SiteLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="movies" element={<Movies/>}/>
      <Route path="movies/:movieId" element={<MovieDetails/>}/>
      <Route path="seats/:movieId" element={<SeatSelection/>}/>
      <Route path="checkout/:movieId" element={<Checkout/>}/>
      <Route path="confirmation" element={<Confirmation/>}/>
    </Route>
    <Route path="login" element={<AuthLayout><AuthPage mode="login"/></AuthLayout>}/>
    <Route path="signup" element={<AuthLayout><AuthPage mode="signup"/></AuthLayout>}/>
    <Route path="*" element={<AuthLayout><main className="page not-found"><span className="section-kicker">404 · LOST IN THE DARK</span><h1>There’s no movie here.</h1><a className="button button-red" href="/">Back to CineVerse</a></main></AuthLayout>}/>
  </Routes></BrowserRouter></BookingProvider>
}

export default App
