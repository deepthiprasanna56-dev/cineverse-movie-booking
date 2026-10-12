import { MapPin, Ticket } from 'lucide-react'
import { bookingTotals } from '../context/BookingContext'
import { movieImage } from '../data/movies'

const rupees = (amount) => `₹${amount.toLocaleString('en-IN')}`

export default function BookingSummary({ movie, theatre, date, time, seats, compact = false }) {
  const totals = bookingTotals(seats)
  return <aside className={`booking-summary ${compact ? 'summary-compact' : ''}`}>
    <div className="summary-title"><span><Ticket size={15}/> BOOKING SUMMARY</span><span>{seats.length} {seats.length === 1 ? 'TICKET' : 'TICKETS'}</span></div>
    <div className="summary-movie"><img src={movieImage(movie.image, 220)} alt=""/><div><b>{movie.title}</b><span>{movie.genre.slice(0, 2).join(' · ')} · {movie.duration}</span>{movie.languages && <span>{movie.languages.join(', ')}</span>}</div></div>
    <div className="summary-venue"><b><MapPin size={14}/>{theatre || 'Select a cinema'}</b><span>{date}{time ? ` · ${time}` : ''}</span></div>
    {seats.length > 0 && <div className="summary-seat-list"><span>SEATS</span><b>{seats.join(', ')}</b><small>{seats.map((seat) => `${seat} ₹${bookingTotals([seat]).subtotal}`).join(' · ')}</small></div>}
    <div className="summary-costs"><div><span>Ticket price</span><b>{rupees(totals.subtotal)}</b></div><div><span>Convenience fee</span><b>{rupees(totals.convenienceFee)}</b></div></div>
    <div className="summary-payable"><span>Total amount</span><b>{rupees(totals.total)}</b></div>
    {!compact && <p className="summary-disclaimer">Demo checkout only. No payment will be collected.</p>}
  </aside>
}
