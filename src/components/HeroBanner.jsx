import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Star, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { movieImage } from '../data/movies'
import TrailerModal from './TrailerModal'

export default function HeroBanner({ movie }) {
  const [trailerOpen, setTrailerOpen] = useState(false)
  return <>
    <section className="hero-banner" style={{ '--hero-image': `url(${movieImage(movie.image, 1900)})` }}><div className="hero-backdrop"/><div className="hero-content"><motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}><span className="section-kicker"><i/> NOW SHOWING · CINEVERSE EXCLUSIVE</span><h1>{movie.title.split(' & ').map((part, index) => <span key={part}>{part}{index === 0 && movie.title.includes(' & ') && <><br/>&amp; </>}</span>)}</h1><p className="hero-tagline">{movie.tagline}</p><div className="hero-meta"><span><Star size={15} fill="currentColor"/> {movie.rating} <small>({movie.votes})</small></span><i/>{movie.genre.slice(0, 3).join(' · ')}<i/>{movie.duration}<i/>{movie.languages.join(', ')}</div><p className="hero-synopsis">{movie.synopsis}</p><div className="hero-actions"><Link className="button button-red" to={`/movies/${movie.id}`}><Ticket size={17}/> Book tickets</Link><button className="button button-ghost" onClick={() => setTrailerOpen(true)}><Play size={16} fill="currentColor"/> Watch trailer</button></div></motion.div></div><div className="hero-bottomline"><span>01 <i/> 03</span><span>THE BIG SCREEN IS CALLING</span><span>SCROLL TO EXPLORE ↓</span></div></section>
    <TrailerModal movie={trailerOpen ? movie : null} onClose={() => setTrailerOpen(false)}/>
  </>
}
