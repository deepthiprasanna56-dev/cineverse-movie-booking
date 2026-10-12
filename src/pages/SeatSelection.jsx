import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import { useBooking, getNextDates, bookingTotals } from '../context/BookingContext'
import { getMovie } from '../data/movies'
import BookingSummary from '../components/BookingSummary'
import PageMotion from '../components/PageMotion'
import SeatMap from '../components/SeatMap'

const money = (value) => `₹${value.toLocaleString('en-IN')}`

export default function SeatSelection() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const movie = getMovie(movieId)
  const { draft, setDraft } = useBooking()
  const dates = getNextDates(5)
  if (!movie) return <PageMotion className="page not-found"><h1>Movie not found</h1><button className="button button-red" onClick={() => navigate('/movies')}>Browse movies</button></PageMotion>
  if (!draft.theatre) return <PageMotion className="page not-found"><h1>Choose a showtime first.</h1><button className="button button-red" onClick={() => navigate(`/movies/${movie.id}#theatres`)}>Select a theatre <ArrowRight size={16}/></button></PageMotion>
  const activeDate = dates.find((date) => date.label === draft.date) || dates[0]
  const selectDate = (date) => setDraft((old) => ({ ...old, date: date.label, seats: [] }))
  const setSeats = (seats) => setDraft((old) => ({ ...old, seats }))
  const totals = bookingTotals(draft.seats)
  return <PageMotion className="page seat-page">
    <button className="back-link" onClick={() => navigate(`/movies/${movie.id}#theatres`)}><ArrowLeft size={15}/> Back to showtimes</button>
    <div className="journey-header"><div><span className="section-kicker">STEP 2 OF 3 · YOUR SEATS</span><h1>Find your <em>perfect seat.</em></h1><p>Choose up to eight seats. Your ticket total updates as you go.</p></div><div className="journey-chip"><b>{movie.title}</b><span><MapPin size={13}/>{draft.theatre} · {draft.time}</span></div></div>
    <section className="seat-theatre-strip"><div><span className="section-kicker">CINEMA</span><b>{draft.theatre}</b><small>{draft.city} · {draft.format}</small></div><div className="seat-date-select"><span className="section-kicker">SHOW DATE</span><select aria-label="Show date" value={activeDate.iso} onChange={(event) => selectDate(dates.find((date) => date.iso === event.target.value))}>{dates.map((date) => <option key={date.iso} value={date.iso}>{date.label}</option>)}</select></div><div><span className="section-kicker">SHOWTIME</span><b>{draft.time}</b><small>{draft.format}</small></div></section>
    <div className="seat-layout"><div className="seat-map-card"><div className="seat-map-title"><div><span className="section-kicker">SCREEN 01</span><h2>Choose your seats</h2></div><span className="row-count">10 ROWS · 12 SEATS</span></div><SeatMap seats={draft.seats} onChange={setSeats}/></div><div className="seat-checkout"><BookingSummary movie={movie} theatre={draft.theatre} date={draft.date} time={draft.time} seats={draft.seats}/><div className="seat-checkout-bottom"><div><span>Current total</span><b>{money(totals.total)}</b></div><button className="button button-red button-full" disabled={!draft.seats.length} onClick={() => navigate(`/checkout/${movie.id}`)}>Continue to checkout <ArrowRight size={17}/></button></div></div></div>
  </PageMotion>
}
