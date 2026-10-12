import { useState } from 'react'
import { Armchair } from 'lucide-react'
import { priceForSeat } from '../context/BookingContext'

const rows = 'ABCDEFGHIJ'.split('')
const booked = new Set(['A4','A9','B3','B8','C5','D10','E2','E9','F6','G4','H8','I1','J7'])
const priceLabel = (price) => `₹${price}`

export default function SeatMap({ seats, onChange }) {
  const [limitMessage, setLimitMessage] = useState('')
  const toggle = (seat) => {
    setLimitMessage('')
    if (seats.includes(seat)) { onChange(seats.filter((item) => item !== seat)); return }
    if (seats.length >= 8) { setLimitMessage('You can book up to 8 seats at a time.'); return }
    onChange([...seats, seat])
  }
  const seatType = (row) => row === 'J' ? 'recliner' : ['A','B'].includes(row) ? 'premium' : 'classic'
  return <section className="seat-selector" aria-label="Cinema seats">
    <div className="screen-glow"><div className="screen-curve"/><span>SCREEN THIS WAY</span></div>
    <div className="seat-grid-scroll"><div className="seat-map">
      {rows.map((row) => <div className="seat-row" key={row}><span className="seat-row-label">{row}</span><div className="seat-group">{Array.from({ length: 12 }, (_, index) => { const seat = `${row}${index + 1}`; const taken = booked.has(seat); const selected = seats.includes(seat); return <button type="button" key={seat} className={`seat ${seatType(row)} ${taken ? 'booked' : ''} ${selected ? 'selected' : ''}`} disabled={taken} onClick={() => toggle(seat)} aria-label={`${seat}, ${taken ? 'booked' : selected ? 'selected' : `${seatType(row)} seat costing ${priceLabel(priceForSeat(seat))}`}`} title={`${seat} · ${seatType(row)} · ${priceLabel(priceForSeat(seat))}`}>{index + 1}</button> })}</div><span className="seat-row-label">{row}</span></div>)}
    </div></div>
    <div className="seat-legend"><span><i className="legend-available"/> Available</span><span><i className="legend-selected"/> Selected</span><span><i className="legend-booked"/> Booked</span><span><i className="legend-classic"/> Classic · {priceLabel(180)}</span><span><i className="legend-premium"/> Premium · {priceLabel(260)}</span><span><i className="legend-recliner"/> Recliner · {priceLabel(380)}</span></div>
    {seats.length > 0 && <div className="seat-selection-line"><div><b>{seats.length} {seats.length === 1 ? 'seat' : 'seats'} selected</b><span>{seats.join(', ')}</span></div><b>₹{seats.reduce((sum, seat) => sum + priceForSeat(seat), 0).toLocaleString('en-IN')}</b></div>}
    {limitMessage && <p className="inline-message" role="status">{limitMessage}</p>}
    <p className="seat-note"><Armchair size={14}/> Choose up to 8 seats. A and B rows are premium; row J is recliner.</p>
  </section>
}
