import { useState } from 'react'
import { ArrowRight, ChevronRight, Clapperboard, Headphones, MapPin, ShieldCheck, Sparkles, TicketPercent } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { movies, featuredMovie } from '../data/movies'
import HeroBanner from '../components/HeroBanner'
import MovieCard from '../components/MovieCard'
import PageMotion from '../components/PageMotion'

const genres = ['Action', 'Comedy', 'Drama', 'Adventure', 'Animation', 'Thriller', 'Family', 'Sci-Fi', 'Horror', 'Fantasy', 'History', 'Sport']

function MovieShelf({ title, subtitle, items, compact = false, link = '/movies' }) {
  return <section className="content-section"><div className="section-heading"><div><span className="section-kicker">{subtitle}</span><h2>{title}</h2></div><Link to={link} className="section-link">See all <ArrowRight size={16}/></Link></div><div className={`movie-grid ${compact ? 'movie-grid-compact' : ''}`}>{items.map((movie, index) => <MovieCard key={movie.id} movie={movie} index={index} compact={compact}/>)}</div></section>
}

export default function Home() {
  const [offerCopied, setOfferCopied] = useState(false)
  const showing = movies.filter((movie) => movie.release === 'Now showing').sort((a, b) => parseInt(b.votes, 10) - parseInt(a.votes, 10))
  const coming = movies.filter((movie) => movie.release === 'Coming soon')
  const trending = movies.filter((movie) => movie.trending).sort((a, b) => parseInt(b.votes, 10) - parseInt(a.votes, 10)).slice(0, 5)
  return <PageMotion className="page home-page">
    <HeroBanner movie={featuredMovie}/>
    <section className="quick-points"><span><Clapperboard/> Big-screen stories</span><i/><span><MapPin/> Cinemas near you</span><i/><span><Sparkles/> Memorable nights</span></section>
    <MovieShelf title="Now Showing" subtitle="PICK YOUR NEXT ESCAPE" items={showing.slice(0, 12)}/>
    <MovieShelf title="Trending this week" subtitle="THE CROWD HAS SPOKEN" items={trending} compact/>
    <section className="offer-banner" id="offers"><div className="offer-art"><span>CV</span><span>01</span></div><div className="offer-copy"><span className="section-kicker">A LITTLE SOMETHING EXTRA</span><h2>Your next movie night<br/><em>comes with a perk.</em></h2><p>Take ₹100 off your first booking. Because the best stories deserve a great seat.</p><button className="button button-red" onClick={() => { navigator.clipboard?.writeText('CINE100'); setOfferCopied(true) }}><TicketPercent size={16}/>{offerCopied ? 'Code copied: CINE100' : 'Copy code CINE100'}</button></div><div className="offer-stamp">FIRST<br/>BOOKING<br/><b>₹100 OFF</b></div></section>
    <MovieShelf title="Coming Soon" subtitle="SAVE THE DATE" items={coming} link="/movies?tab=soon"/>
    <section className="genre-section"><div className="section-heading"><div><span className="section-kicker">WHAT ARE YOU IN THE MOOD FOR?</span><h2>Browse by genre</h2></div></div><div className="genre-cloud">{genres.map((genre, index) => <motion.div key={genre} whileHover={{ y: -4 }} transition={{ duration: .18 }}><Link to={`/movies?genre=${encodeURIComponent(genre)}`} className={`genre-tile genre-tone-${index % 4}`}><span>0{index + 1}</span><b>{genre}</b><ChevronRight size={17}/></Link></motion.div>)}</div></section>
    <section className="why-section" id="about"><div className="why-heading"><span className="section-kicker">THE CINEVERSE DIFFERENCE</span><h2>Make the night<br/><em>part of the story.</em></h2></div><div className="why-points"><article><span><Clapperboard/></span><h3>More than a movie</h3><p>Find the right film for every mood, from big-screen spectacle to little-known gems.</p></article><article><span><ShieldCheck/></span><h3>Your plans, sorted</h3><p>Pick a date, choose your cinema, and settle in with your favourite seat.</p></article><article><span><Headphones/></span><h3>Here for the experience</h3><p>A smooth booking flow, clear prices, and a ticket that’s ready when you are.</p></article></div></section>
  </PageMotion>
}
