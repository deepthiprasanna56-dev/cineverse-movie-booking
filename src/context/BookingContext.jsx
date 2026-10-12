/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const BookingContext = createContext(null)
const initialDraft = { city: 'Bengaluru', theatre: '', theatreId: '', date: '', time: '', format: '2D', seats: [], customer: { name: '', email: '', mobile: '' } }

function readSession(key, fallback) {
  try { return JSON.parse(sessionStorage.getItem(key)) || fallback } catch { return fallback }
}

export function BookingProvider({ children }) {
  const [draft, setDraft] = useState(() => readSession('cineverse-draft', initialDraft))
  const [confirmation, setConfirmation] = useState(() => readSession('cineverse-confirmation', null))
  useEffect(() => { sessionStorage.setItem('cineverse-draft', JSON.stringify(draft)) }, [draft])
  useEffect(() => { if (confirmation) sessionStorage.setItem('cineverse-confirmation', JSON.stringify(confirmation)) }, [confirmation])
  const value = useMemo(() => ({ draft, setDraft, confirmation, setConfirmation }), [draft, confirmation])
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const value = useContext(BookingContext)
  if (!value) throw new Error('useBooking must be used inside BookingProvider')
  return value
}

export function getNextDates(count = 5) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return { iso: date.toISOString().slice(0, 10), day: date.toLocaleDateString('en-IN', { weekday: 'short' }).toUpperCase(), number: date.getDate(), label: date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }) }
  })
}

export function priceForSeat(seat) {
  if (seat?.startsWith('J')) return 380
  if (seat?.startsWith('A') || seat?.startsWith('B')) return 260
  return 180
}

export function bookingTotals(seats = []) {
  const subtotal = seats.reduce((sum, seat) => sum + priceForSeat(seat), 0)
  const convenienceFee = seats.length ? 60 : 0
  return { subtotal, convenienceFee, total: subtotal + convenienceFee }
}

export function createBookingReference() {
  return `CV${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 90 + 10)}`
}
