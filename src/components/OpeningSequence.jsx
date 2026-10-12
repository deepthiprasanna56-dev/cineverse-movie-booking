import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Film, Sparkles } from 'lucide-react'
import { movies, movieImage } from '../data/movies'

const SESSION_KEY = 'cineverse-opening-seen'
const slides = [
  { movieId: 'deadpool-wolverine', eyebrow: 'THE BIG SCREEN IS CALLING', title: <>Every story<br/><em>starts somewhere.</em></>, note: 'A little anticipation. A lot of movie magic.' },
  { movieId: 'dune-part-two', eyebrow: 'YOUR NEXT GREAT ESCAPE', title: <>Find your next<br/><em>obsession.</em></>, note: 'Explore the films everyone will be talking about.' },
  { movieId: 'superman-2025', eyebrow: 'CINEVERSE PRESENTS', title: <>Make tonight<br/><em>unforgettable.</em></>, note: 'Choose your movie. Pick your seat. Let the story begin.' },
]

export default function OpeningSequence() {
  const prefersReducedMotion = useReducedMotion()
  const [open, setOpen] = useState(() => {
    try { return !window.sessionStorage.getItem(SESSION_KEY) } catch { return false }
  })
  const [active, setActive] = useState(0)

  const dismiss = useCallback(() => {
    try { window.sessionStorage.setItem(SESSION_KEY, 'true') } catch { /* Storage may be unavailable in private browsing. */ }
    setOpen(false)
  }, [])

  const next = useCallback(() => {
    if (active === slides.length - 1) dismiss()
    else setActive((current) => current + 1)
  }, [active, dismiss])

  useEffect(() => {
    if (!open) return undefined
    const timeout = window.setTimeout(next, prefersReducedMotion ? 1600 : 3000)
    return () => window.clearTimeout(timeout)
  }, [active, next, open, prefersReducedMotion])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => { if (event.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dismiss, open])

  return <AnimatePresence>
    {open && <motion.div className="opening-sequence" role="dialog" aria-modal="true" aria-label="Welcome to CineVerse" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: prefersReducedMotion ? .12 : .65, ease: 'easeInOut' }}>
      <AnimatePresence mode="wait">
        <motion.div key={active} className="opening-scene" style={{ '--opening-image': `url(${movieImage(movies.find((movie) => movie.id === slides[active].movieId)?.backdrop ?? movies[0].backdrop, 1800)})` }} initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: prefersReducedMotion ? .15 : 1.1 }} />
      </AnimatePresence>
      <div className="opening-vignette" />
      <header className="opening-header">
        <div className="opening-wordmark"><span className="opening-wordmark-icon"><Film size={20}/></span><span className="opening-wordmark-text">Cine<span>Verse</span><small>YOUR FAVOURITE MOVIES, ONE CLICK AWAY</small></span></div>
        <button className="opening-skip" onClick={dismiss}>Skip intro <ArrowRight size={15}/></button>
      </header>
      <AnimatePresence mode="wait"><motion.div className="opening-poster" key={`poster-${active}`} initial={{ opacity: 0, x: 30, scale: .97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: prefersReducedMotion ? .15 : .7 }}><img src={movieImage(movies.find((movie) => movie.id === slides[active].movieId)?.image ?? movies[0].image, 760)} alt="" /></motion.div></AnimatePresence>
      <main className="opening-content" aria-live="polite" key={`content-${active}`}>
        <motion.span className="opening-eyebrow" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }}><i/><Sparkles size={13}/>{slides[active].eyebrow}<i/></motion.span>
        <motion.h1 initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: prefersReducedMotion ? .15 : .75, delay: .18, ease: [.2, .75, .25, 1] }}>{slides[active].title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34 }}>{slides[active].note}</motion.p>
        <motion.button className="opening-enter" onClick={next} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .48 }}>{active === slides.length - 1 ? 'Enter CineVerse' : 'Discover the experience'}<ArrowRight size={16}/></motion.button>
      </main>
      <div className="opening-footer"><span>AN EXPERIENCE MADE FOR THE BIG SCREEN</span><div className="opening-indicators" aria-label={`Intro slide ${active + 1} of ${slides.length}`}>{slides.map((slide, index) => <button key={slide.movieId} className={index === active ? 'active' : ''} aria-label={`Show intro slide ${index + 1}`} onClick={() => setActive(index)}/>)}</div><span>0{active + 1} <i/> 0{slides.length}</span></div>
      <motion.div className="opening-progress" key={`progress-${active}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: prefersReducedMotion ? 1.6 : 3, ease: 'linear' }}/>
    </motion.div>}
  </AnimatePresence>
}
