import { ArrowUpRight, Film } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className="site-footer"><div className="footer-main"><Link className="brand" to="/"><span className="brand-mark"><Film size={20}/></span><span>Cine<span>V</span>erse<small>Your Ticket to a Bigger World</small></span></Link><p>Your favourite movies, one click away.<br/>Find the story. Pick your seat. Enjoy the show.</p><div className="footer-links"><Link to="/movies">Browse movies <ArrowUpRight size={14}/></Link><a href="/#offers">Offers <ArrowUpRight size={14}/></a><Link to="/login">My account <ArrowUpRight size={14}/></Link></div></div><div className="footer-bottom"><span>© 2026 CineVerse · A frontend booking demo</span><span>For the love of the big screen <b>♥</b></span></div></footer>
}
