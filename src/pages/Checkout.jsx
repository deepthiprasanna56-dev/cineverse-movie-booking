import { useState } from 'react'
import { ArrowLeft, ArrowRight, CreditCard, LockKeyhole } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBooking, bookingTotals, createBookingReference } from '../context/BookingContext'
import { getMovie } from '../data/movies'
import BookingSummary from '../components/BookingSummary'
import PageMotion from '../components/PageMotion'

export default function Checkout() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const movie = getMovie(movieId)
  const { draft, setDraft, setConfirmation } = useBooking()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState('')
  if (!movie) return <PageMotion className="page not-found"><h1>Movie not found</h1><button className="button button-red" onClick={() => navigate('/movies')}>Browse movies</button></PageMotion>
  if (!draft.seats.length || !draft.theatre) return <PageMotion className="page not-found"><h1>Your seats are waiting.</h1><button className="button button-red" onClick={() => navigate(`/movies/${movie.id}`)}>Choose a showtime <ArrowRight size={16}/></button></PageMotion>

  const updateCustomer = (key, value) => setDraft((old) => ({ ...old, customer: { ...old.customer, [key]: value } }))
  const submit = (event) => {
    event.preventDefault()
    if (!acceptedTerms) { setError('Please accept the demo booking terms to continue.'); return }
    const totals = bookingTotals(draft.seats)
    setConfirmation({ bookingId: createBookingReference(), movieId: movie.id, theatre: draft.theatre, city: draft.city, format: draft.format, date: draft.date, time: draft.time, seats: draft.seats, customer: draft.customer, totals, createdAt: new Date().toISOString(), isDemo: true })
    navigate('/confirmation')
  }

  return <PageMotion className="page checkout-page">
    <button className="back-link" onClick={() => navigate(`/seats/${movie.id}`)}><ArrowLeft size={15}/> Back to seat selection</button>
    <div className="journey-header"><div><span className="section-kicker">STEP 3 OF 3 · ALMOST THERE</span><h1>One last <em>thing.</em></h1><p>Add your details to prepare your demo ticket.</p></div><div className="checkout-protection"><LockKeyhole size={15}/> DEMO CHECKOUT · NO PAYMENT</div></div>
    <div className="checkout-layout"><div className="checkout-form-card"><div className="checkout-form-heading"><div><span className="section-kicker">TICKET HOLDER</span><h2>Your details</h2></div><span>All fields required</span></div><form onSubmit={submit} className="customer-form"><label>Full name<input required autoComplete="name" minLength={2} value={draft.customer.name} onChange={(e) => updateCustomer('name', e.target.value)} placeholder="Your full name"/></label><label>Email address<input required type="email" autoComplete="email" value={draft.customer.email} onChange={(e) => updateCustomer('email', e.target.value)} placeholder="you@example.com"/></label><label>Mobile number<input required type="tel" autoComplete="tel" pattern="[0-9+() -]{10,16}" minLength={10} maxLength={16} value={draft.customer.mobile} onChange={(e) => updateCustomer('mobile', e.target.value)} placeholder="+91 98765 43210"/><small>Used only for this demo booking confirmation.</small></label><div className="demo-payment"><div className="demo-payment-icon"><CreditCard size={18}/></div><div><b>Demo booking · no payment gateway</b><span>Submitting creates a sample ticket only. You will not be charged.</span></div><span className="demo-badge">SAFE DEMO</span></div><label className="terms-check"><input type="checkbox" checked={acceptedTerms} onChange={(e) => { setAcceptedTerms(e.target.checked); setError('') }}/><span>I agree to the <b>demo booking terms</b> and understand this is not a real cinema reservation.</span></label>{error && <p className="inline-message" role="alert">{error}</p>}<button className="button button-red button-full confirm-button" type="submit">Confirm demo booking <ArrowRight size={17}/></button></form></div><BookingSummary movie={movie} theatre={draft.theatre} date={draft.date} time={draft.time} seats={draft.seats}/></div>
  </PageMotion>
}
