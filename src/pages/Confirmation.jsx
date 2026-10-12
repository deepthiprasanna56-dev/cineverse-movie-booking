import { Check, Home, Printer, TicketCheck } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { getMovie, movieImage } from '../data/movies'
import PageMotion from '../components/PageMotion'

const money = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`

export default function Confirmation() {
  const { confirmation } = useBooking()
  if (!confirmation) return <Navigate to="/movies" replace/>
  const movie = getMovie(confirmation.movieId)
  if (!movie) return <Navigate to="/movies" replace/>
  return <PageMotion className="page confirmation-page">
    <div className="confirmation-wrap"><div className="success-orbit"><span className="success-check"><Check size={32}/></span></div><span className="section-kicker">BOOKING CONFIRMED · DEMO TICKET</span><h1>You’re going to<br/><em>the movies.</em></h1><p className="confirmation-intro">Your sample ticket is ready, {confirmation.customer.name.trim().split(/\s+/)[0]}. No reservation has been sent to a real cinema.</p>
      <article className="ticket-card"><div className="ticket-main"><img src={movieImage(movie.image, 420)} alt={`${movie.title} poster`}/><div className="ticket-info"><span className="ticket-status"><TicketCheck size={13}/> CINEVERSE DEMO TICKET</span><h2>{movie.title}</h2><p>{movie.genre.slice(0, 2).join(' · ')} <i/> {movie.duration} <i/> {confirmation.format}</p><div className="ticket-facts"><div><small>DATE &amp; SHOWTIME</small><b>{confirmation.date}<br/>{confirmation.time}</b></div><div><small>CINEMA</small><b>{confirmation.theatre}<br/>{confirmation.city}</b></div><div><small>YOUR SEATS</small><b>{confirmation.seats.join(', ')}</b></div></div></div></div><div className="ticket-stub"><span>BOOKING ID</span><b>{confirmation.bookingId}</b><div className="barcode" aria-label="Sample barcode">▌▌▏▌▌▏▏▌▌▌▏▌▏▏▌▌▏▌▌▌▏▏▌</div><small>Sample ticket · not valid for entry</small></div><div className="ticket-total"><span>{confirmation.seats.length} ticket{confirmation.seats.length === 1 ? '' : 's'} · Total amount</span><b>{money(confirmation.totals?.total)}</b></div></article>
      <div className="confirmation-actions"><button className="button button-outline" onClick={() => window.print()}><Printer size={16}/> Print ticket</button><Link className="button button-red" to="/"><Home size={16}/> Back to home</Link></div><div className="demo-disclaimer"><span><Check size={15}/></span><p><b>Frontend demonstration only.</b> No payment was processed and no actual cinema seats were reserved.</p></div>
    </div>
  </PageMotion>
}
