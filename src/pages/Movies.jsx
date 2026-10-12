import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownWideNarrow, Search, SlidersHorizontal, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { movies } from '../data/movies'
import MovieCard from '../components/MovieCard'
import PageMotion from '../components/PageMotion'

const genres = [...new Set(movies.flatMap((movie) => movie.genre))].sort()
const languages = [...new Set(movies.flatMap((movie) => movie.languages))].sort()
const ratingOptions = ['Any rating', '6+', '7+', '8+']

export default function Movies() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [genre, setGenre] = useState(params.get('genre') || 'All genres')
  const [language, setLanguage] = useState('All languages')
  const [rating, setRating] = useState('Any rating')
  const [sort, setSort] = useState('Popularity')
  const [tab, setTab] = useState(params.get('tab') === 'soon' ? 'Coming soon' : 'Now showing')

  const results = useMemo(() => {
    const minimumRating = rating === 'Any rating' ? 0 : Number(rating[0])
    return movies.filter((movie) => movie.release === tab && movie.title.toLowerCase().includes(query.toLowerCase()) && (genre === 'All genres' || movie.genre.includes(genre)) && (language === 'All languages' || movie.languages.includes(language)) && movie.rating >= minimumRating).sort((a, b) => sort === 'Rating' ? b.rating - a.rating : sort === 'Title' ? a.title.localeCompare(b.title) : sort === 'Popularity' ? Number(b.trending) - Number(a.trending) || parseInt(b.votes, 10) - parseInt(a.votes, 10) : 0)
  }, [genre, language, query, rating, sort, tab])

  const clearFilters = () => { setQuery(''); setGenre('All genres'); setLanguage('All languages'); setRating('Any rating'); setSort('Popularity'); setParams({ tab: tab === 'Coming soon' ? 'soon' : 'now' }) }
  const changeTab = (next) => { setTab(next); setParams({ ...(query ? { q: query } : {}), tab: next === 'Coming soon' ? 'soon' : 'now' }) }

  return <PageMotion className="page listing-page">
    <section className="listing-head"><div><span className="section-kicker">YOUR FRONT ROW STARTS HERE</span><h1>All the movies.<br/><em>All the magic.</em></h1><p>Find your story, then find your seat.</p></div><div className="listing-count"><b>{String(results.length).padStart(2, '0')}</b><span>FILMS TO<br/>DISCOVER</span></div></section>
    <div className="listing-tabs"><button className={tab === 'Now showing' ? 'active' : ''} onClick={() => changeTab('Now showing')}>Now Showing</button><button className={tab === 'Coming soon' ? 'active' : ''} onClick={() => changeTab('Coming soon')}>Coming Soon</button><span className="listing-tabs-underline"/></div>
    <div className="filter-panel"><label className="filter-search"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by movie title"/><kbd>⌘ K</kbd></label><div className="filter-selects"><label><SlidersHorizontal size={14}/><select aria-label="Filter by genre" value={genre} onChange={(e) => setGenre(e.target.value)}><option>All genres</option>{genres.map((item) => <option key={item}>{item}</option>)}</select></label><label><select aria-label="Filter by language" value={language} onChange={(e) => setLanguage(e.target.value)}><option>All languages</option>{languages.map((item) => <option key={item}>{item}</option>)}</select></label><label><select aria-label="Filter by rating" value={rating} onChange={(e) => setRating(e.target.value)}>{ratingOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label><ArrowDownWideNarrow size={14}/><select aria-label="Sort movies" value={sort} onChange={(e) => setSort(e.target.value)}><option>Popularity</option><option>Rating</option><option>Title</option></select></label><button className="clear-filters" onClick={clearFilters}><X size={14}/> Clear</button></div></div>
    <div className="results-row"><span>{tab} <i/> {results.length} results</span><span>Showing in <b>your selected city</b></span></div>
    <AnimatePresence mode="wait"><motion.div key={`${tab}-${genre}-${language}-${rating}-${sort}-${query}`} className="movie-grid listing-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>{results.map((movie, index) => <MovieCard key={movie.id} movie={movie} index={index}/>)}</motion.div></AnimatePresence>
    {results.length === 0 && <div className="empty-results"><div><Search size={23}/></div><h2>No movies found</h2><p>Try a different title or clear some filters to see more films.</p><button className="button button-outline" onClick={clearFilters}>Clear all filters</button></div>}
  </PageMotion>
}
