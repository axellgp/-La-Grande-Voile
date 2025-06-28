import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'
import { useLogs } from '../context/LogsContext'
import { Calendar, Users, MapPin, Euro, Clock, Filter, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const ReservationPage = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.lightBlue} 0%, ${props => props.theme.colors.cream} 100%);
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.darkGray};
  }
`

const FiltersSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  
  .filters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    
    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      label {
        font-weight: 600;
        color: ${props => props.theme.colors.darkGray};
      }
      
      input, select {
        padding: 0.75rem;
        border: 2px solid ${props => props.theme.colors.lightGray};
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
        
        &:focus {
          outline: none;
          border-color: ${props => props.theme.colors.primary};
        }
      }
    }
  }
`

const BookingForm = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-weight: 600;
      color: ${props => props.theme.colors.darkGray};
    }
    
    input, select, textarea {
      padding: 1rem;
      border: 2px solid ${props => props.theme.colors.lightGray};
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
      }
    }
    
    textarea {
      resize: vertical;
      min-height: 100px;
    }
  }
  
  .price-summary {
    background: ${props => props.theme.colors.lightBlue};
    padding: 1.5rem;
    border-radius: 10px;
    margin: 2rem 0;
    
    h3 {
      color: ${props => props.theme.colors.primary};
      margin-bottom: 1rem;
    }
    
    .price-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      
      &.total {
        font-weight: bold;
        font-size: 1.1rem;
        border-top: 1px solid ${props => props.theme.colors.mediumGray};
        padding-top: 0.5rem;
        margin-top: 1rem;
      }
    }
  }
  
  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    
    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.btn-primary {
        background: ${props => props.theme.colors.primary};
        color: white;
        
        &:hover {
          background: ${props => props.theme.colors.darkBlue};
          transform: translateY(-2px);
        }
      }
      
      &.btn-outline {
        background: transparent;
        border: 2px solid ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
        
        &:hover {
          background: ${props => props.theme.colors.primary};
          color: white;
        }
      }
    }
  }
`

const Reservations = () => {
  const { rooms, createBookingRequest } = useBooking()
  const { user } = useAuth()
  const [selectedRoom, setSelectedRoom] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [guestName, setGuestName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState('')
  const [requests, setRequests] = useState('')

  const calculatePrice = () => {
    if (!selectedRoom || !checkIn || !checkOut) return 0
    
    const room = rooms.find(r => r.id === parseInt(selectedRoom))
    if (!room) return 0
    
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    const weeks = Math.ceil(days / 7)
    
    return weeks * room.price.midSeason
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const bookingData = {
      roomId: parseInt(selectedRoom),
      checkIn,
      checkOut,
      guests,
      guestName,
      email,
      phone,
      requests,
      totalPrice: calculatePrice(),
      status: 'pending'
    }
    
    try {
      await createBookingRequest(bookingData)
      alert('Demande de réservation envoyée avec succès !')
      // Reset form
      setSelectedRoom('')
      setCheckIn('')
      setCheckOut('')
      setGuests(2)
      setRequests('')
    } catch (error) {
      alert('Erreur lors de l\'envoi de la demande')
    }
  }

  const totalPrice = calculatePrice()
  const room = rooms.find(r => r.id === parseInt(selectedRoom))

  return (
    <ReservationPage>
      <Container>
        <Header>
          <h1>Réserver votre séjour</h1>
          <p>Découvrez nos appartements d'exception à Banyuls-sur-Mer</p>
        </Header>

        <BookingForm
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Appartement</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  required
                >
                  <option value="">Choisir un appartement</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.name} - {room.capacity} personnes
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date d'arrivée</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date de départ</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nombre de voyageurs</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} personne{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Demandes spéciales</label>
                <textarea
                  value={requests}
                  onChange={(e) => setRequests(e.target.value)}
                  placeholder="Anniversaire, allergies, préférences..."
                />
              </div>
            </div>

            {room && totalPrice > 0 && (
              <div className="price-summary">
                <h3>Résumé de la réservation</h3>
                <div className="price-row">
                  <span>Appartement:</span>
                  <span>{room.name}</span>
                </div>
                <div className="price-row">
                  <span>Dates:</span>
                  <span>{checkIn} - {checkOut}</span>
                </div>
                <div className="price-row">
                  <span>Voyageurs:</span>
                  <span>{guests} personne{guests > 1 ? 's' : ''}</span>
                </div>
                <div className="price-row total">
                  <span>Prix total:</span>
                  <span>{totalPrice}€</span>
                </div>
              </div>
            )}

            <div className="actions">
              <Link to="/chambres" className="btn btn-outline">
                Voir les chambres
              </Link>
              <button type="submit" className="btn btn-primary">
                Envoyer la demande
              </button>
            </div>
          </form>
        </BookingForm>
      </Container>
    </ReservationPage>
  )
}

export default Reservations
