import { useState } from 'react'
import { ArrowRight, CalendarDays, CirclePlay, Clock3, MapPin, Star, Users } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBooking, getNextDates } from '../context/BookingContext'
import { getMovie, movieImage, theatresByCity } from '../data/movies'
import PageMotion from '../components/PageMotion'
import TrailerModal from '../components/TrailerModal'

export default function MovieDetails() {
  const { movieId } = useParams()
  const movie = getMovie(movieId)
  const navigate = useNavigate()
  const { draft, setDraft } = useBooking()
  const dates = getNextDates(5)
  const [date, setDate] = useState(dates[0])
  const [trailerOpen, setTrailerOpen] = useState(false)
  const cinemas = theatresByCity[draft.city] || theatresByCity.Bengaluru

  if (!movie) return <PageMotion className="page not-found"><span className="section-kicker">MOVIE NOT FOUND</span><h1>That reel went missing.</h1><button className="button button-red" onClick={() => navigate('/movies')}>Browse all movies <ArrowRight size={16}/></button></PageMotion>

  const bookShow = (cinema, showtime, format) => {
    setDraft((old) => ({ ...old, movieId: movie.id, theatre: cinema.name, theatreId: cinema.id, date: date.label, time: showtime, format, seats: [] }))
    navigate(`/seats/${movie.id}`)
  }

  return <PageMotion className="page details-page">
    <section className="movie-detail-hero" style={{ '--detail-image': `url(${movieImage(movie.image, 1800)})` }}><div className="detail-backdrop"/><div className="detail-hero-inner"><img className="detail-poster" src={movieImage(movie.image, 760)} alt={`${movie.title} poster`}/><div className="detail-copy"><span className={`movie-chip ${movie.release === 'Coming soon' ? 'soon-chip' : ''}`}>{movie.release.toUpperCase()}</span><h1>{movie.title}</h1><p className="detail-tagline">{movie.tagline}</p><div className="detail-facts"><span className="detail-rating"><Star size={15} fill="currentColor"/>{movie.rating} <small>({movie.votes} votes)</small></span><i/>{movie.genre.join(' · ')}<i/><Clock3 size={14}/>{movie.duration}<i/>{movie.certificate}<i/>{movie.languages.join(', ')}</div><p className="detail-synopsis">{movie.synopsis}</p><div className="director-line">Directed by <b>{movie.director}</b><i/> Released {movie.releaseDate}</div><div className="detail-actions">{movie.trailer && <button className="button button-outline" onClick={() => setTrailerOpen(true)}><CirclePlay size={17}/> Watch trailer</button>}<a href="#theatres" className="button button-red"><CalendarDays size={17}/> Book tickets</a></div></div></div></section>
    <section className="cast-section"><div className="detail-section-title"><span className="section-kicker">THE PEOPLE BEHIND THE STORY</span><h2><Users size={18}/> Cast &amp; crew</h2></div><div className="cast-row">{movie.cast.map((person, index) => <article className="cast-person" key={person}><div className={`cast-avatar cast-${index}`}><span>{person.split(' ').map((part) => part[0]).join('')}</span></div><b>{person}</b><small>{index === 0 ? 'Lead cast' : index === 1 ? 'Cast' : index === 2 ? 'Cast' : 'Crew'}</small></article>)}<article className="cast-person"><div className="cast-avatar director-avatar"><span>{movie.director.split(' ').map((part) => part[0]).join('')}</span></div><b>{movie.director}</b><small>Director</small></article></div></section>
    <section className="theatre-section" id="theatres"><div className="section-heading"><div><span className="section-kicker"><MapPin size={12}/> {draft.city.toUpperCase()}</span><h2>Pick your show</h2></div><div className="date-picker-row">{dates.map((item) => <button key={item.iso} className={date.iso === item.iso ? 'date-chip active' : 'date-chip'} onClick={() => setDate(item)}><small>{item.day}</small><b>{item.number}</b></button>)}</div></div>
      {movie.release === 'Coming soon' ? <div className="coming-note"><CalendarDays/><div><b>Coming to CineVerse on {movie.releaseDate}</b><span>Tickets and showtimes will be available closer to release.</span></div></div> : <div className="theatre-list">{cinemas.map((cinema) => <article className="theatre-card" key={cinema.id}><div className="theatre-card-head"><div><h3>{cinema.name}</h3><p>{cinema.area} <i/> {cinema.distance} away</p><div className="format-tags">{cinema.formats.map((format) => <span key={format}>{format}</span>)}</div></div><span className="venue-distance"><MapPin size={13}/>{cinema.distance}</span></div><div className="theatre-showtimes">{cinema.showtimes.map((time, timeIndex) => <button className="showtime-chip" key={time} onClick={() => bookShow(cinema, time, cinema.formats[timeIndex % cinema.formats.length])}><b>{time}</b><small>{timeIndex === 2 ? 'FAST FILLING' : 'AVAILABLE'}</small></button>)}</div></article>)}</div>}
    </section>
    <TrailerModal movie={trailerOpen ? movie : null} onClose={() => setTrailerOpen(false)}/>
  </PageMotion>
}
