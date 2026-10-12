import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { movieImage } from '../data/movies'

export default function MovieCard({ movie, index = 0, compact = false }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFallback, setImageFallback] = useState(false)
  return <motion.article className={`movie-card ${compact ? 'movie-card-compact' : ''}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .4, delay: Math.min(index * .055, .28) }} whileHover={{ y: -5 }}>
    <Link to={`/movies/${movie.id}`} className={`poster-link ${imageLoaded ? 'image-loaded' : ''}`} aria-label={`View ${movie.title}`}><span className="poster-skeleton"/><img src={imageFallback ? '/poster-placeholder.svg' : movieImage(movie.image, 520)} alt={`${movie.title} artwork`} loading="lazy" onLoad={() => setImageLoaded(true)} onError={() => { if (!imageFallback) setImageFallback(true); else setImageLoaded(true) }}/><span className={`movie-chip ${movie.release === 'Coming soon' ? 'soon-chip' : ''}`}>{movie.release === 'Coming soon' ? 'COMING SOON' : movie.trending ? 'TRENDING' : 'NOW SHOWING'}</span><span className="poster-rating"><Star size={14} fill="currentColor"/>{movie.rating}</span><span className="poster-hover">View movie <span>→</span></span></Link>
    <div className="movie-card-copy"><Link to={`/movies/${movie.id}`} className="movie-card-title">{movie.title}</Link><p>{movie.genre.slice(0, 2).join(' · ')} <i/> {movie.duration}</p>{movie.release === 'Coming soon' && <span className="release-date"><CalendarDays size={12}/>{movie.releaseDate}</span>}</div>
  </motion.article>
}
