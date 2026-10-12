import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export default function TrailerModal({ movie, onClose }) {
  return <AnimatePresence>{movie && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><motion.div className="trailer-modal" initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }}><div className="trailer-heading"><div><span>OFFICIAL TRAILER</span><b>{movie.title}</b></div><button aria-label="Close trailer" onClick={onClose}><X/></button></div><div className="trailer-frame"><iframe title={`${movie.title} trailer`} src={`https://www.youtube-nocookie.com/embed/${movie.trailer}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/></div></motion.div></motion.div>}</AnimatePresence>
}
