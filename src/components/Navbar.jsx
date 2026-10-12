import { useState } from 'react'
import { Film, MapPin, Menu, Search, Ticket, X } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

const cities = ['Bengaluru', 'Mumbai', 'Delhi NCR']

export default function Navbar() {
  const { draft, setDraft } = useBooking()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const search = (event) => { event.preventDefault(); navigate(`/movies${query ? `?q=${encodeURIComponent(query)}` : ''}`); setMenuOpen(false) }
  return <header className="site-header">
    <div className="header-main">
      <Link className="brand" to="/"><span className="brand-mark"><Film size={20}/></span><span>Cine<span>V</span>erse<small>Your Favourite Movies, One Click Away</small></span></Link>
      <form className="nav-search" onSubmit={search}><Search size={16}/><input aria-label="Search movies" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies, theatres..."/><button aria-label="Submit search" type="submit">⌕</button></form>
      <div className="header-tools"><label className="city-select"><MapPin size={15}/><select aria-label="Select city" value={draft.city} onChange={(e) => setDraft((old) => ({ ...old, city: e.target.value, theatre: '', theatreId: '', seats: [] }))}>{cities.map((city) => <option key={city}>{city}</option>)}</select></label><Link className="profile-link" to="/login"><span className="profile-avatar">C</span><span>Login</span></Link></div>
      <button className="mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </div>
    <nav className={`primary-nav ${menuOpen ? 'nav-expanded' : ''}`} aria-label="Main navigation">
      <div className="nav-pages"><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</NavLink><NavLink to="/movies" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>Movies</NavLink><a href="/#offers" onClick={() => setMenuOpen(false)}>Offers</a><a href="/#about" onClick={() => setMenuOpen(false)}>About</a></div>
      <div className="nav-shortcuts"><Link to="/movies" onClick={() => setMenuOpen(false)}><Ticket size={15}/> Book Tickets</Link><Link to="/movies?tab=now" onClick={() => setMenuOpen(false)}>Now Showing</Link><Link to="/movies?tab=soon" onClick={() => setMenuOpen(false)}>Coming Soon</Link></div>
    </nav>
  </header>
}
