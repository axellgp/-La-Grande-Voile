import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Calendar, Users, Mail, Phone, MessageSquare, CreditCard, Check, AlertCircle, Home } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'
import { useLogs } from '../context/LogsContext'
import { MarineElements } from '../components/MarineElements'

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.lightBlue} 0%, ${props => props.theme.colors.cream} 100%);
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const BookingForm = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`

const RoomSummary = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
`

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`

const GuestSelect = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`

const RoomImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 1rem;
`

const RoomName = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`

const RoomType = styled.span`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`

const RoomDetails = styled.div`
  margin: 1rem 0;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
`

const PriceSection = styled.div`
  background: ${props => props.theme.colors.lightBlue};
  padding: 1.5rem;
  border-radius: 15px;
  margin: 1.5rem 0;
`

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;

  &.total {
    border-top: 2px solid ${props => props.theme.colors.primary};
    padding-top: 0.5rem;
    margin-top: 1rem;
    font-weight: 600;
    font-size: 1.1rem;
  }
`

const SeasonInfo = styled.div`
  background: ${props => props.theme.colors.cream};
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.div`
  background: #fee;
  color: #d63384;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SuccessMessage = styled.div`
  background: #d1e7dd;
  color: #0f5132;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const BackButton = styled(motion.button)`
  background: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Booking = () => {
  const { id: roomId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { rooms, createBookingRequest, getRoomPrice, getCurrentSeason, isRoomAvailable } = useBooking()
  const { user } = useAuth()
  const { addLog } = useLogs()
  
  const [room, setRoom] = useState(null)
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    guestName: user?.name || '',
    email: user?.email || '',
    phone: '',
    requests: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [nights, setNights] = useState(0)
  const [season, setSeason] = useState('')

  useEffect(() => {
    // Récupérer l'ID de la chambre depuis les paramètres d'URL ou les query parameters
    let selectedRoomId = roomId
    
    if (!selectedRoomId) {
      const urlParams = new URLSearchParams(location.search)
      selectedRoomId = urlParams.get('room')
    }
    
    if (selectedRoomId) {
      const selectedRoom = rooms.find(r => r.id === parseInt(selectedRoomId))
      if (selectedRoom) {
        setRoom(selectedRoom)
      }
    }
  }, [roomId, location.search, rooms])

  useEffect(() => {
    if (room && formData.checkIn && formData.checkOut) {
      const startDate = new Date(formData.checkIn)
      const endDate = new Date(formData.checkOut)
      const nightCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      
      if (nightCount > 0) {
        setNights(nightCount)
        const price = getRoomPrice(room.id, formData.checkIn, formData.checkOut)
        setTotalPrice(price)
        setSeason(getCurrentSeason(formData.checkIn))
      }
    }
  }, [room, formData.checkIn, formData.checkOut, getRoomPrice, getCurrentSeason])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.checkIn) newErrors.checkIn = 'Date d\'arrivée requise'
    if (!formData.checkOut) newErrors.checkOut = 'Date de départ requise'
    if (!formData.guestName.trim()) newErrors.guestName = 'Nom requis'
    if (!formData.email.trim()) newErrors.email = 'Email requis'
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis'
    
    if (formData.checkIn && formData.checkOut) {
      const startDate = new Date(formData.checkIn)
      const endDate = new Date(formData.checkOut)
      
      if (startDate >= endDate) {
        newErrors.checkOut = 'La date de départ doit être après la date d\'arrivée'
      }
      
      if (startDate < new Date()) {
        newErrors.checkIn = 'La date d\'arrivée ne peut pas être dans le passé'
      }
      
      if (room && !isRoomAvailable(room.id, formData.checkIn, formData.checkOut)) {
        newErrors.availability = 'Cet appartement n\'est pas disponible pour ces dates'
      }
    }
    
    if (room && formData.guests > room.capacity) {
      newErrors.guests = `Capacité maximale : ${room.capacity} personnes`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const bookingRequest = createBookingRequest({
        roomId: room.id,
        ...formData
      })
      
      // Ajouter un log de la demande de réservation
      addLog('booking', 'request', {
        roomId: room.id,
        roomName: room.name,
        guestName: formData.guestName,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        totalPrice
      }, user?.id)
      
      setSuccessMessage('Votre demande de réservation a été envoyée ! Nous vous contacterons bientôt pour la confirmer.')
      
      // Reset form
      setFormData({
        checkIn: '',
        checkOut: '',
        guests: 2,
        guestName: user?.name || '',
        email: user?.email || '',
        phone: '',
        requests: ''
      })
      
      // Rediriger vers la page d'accueil après 3 secondes
      setTimeout(() => {
        navigate('/rooms')
      }, 3000)
      
    } catch (error) {
      setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSeasonName = (seasonKey) => {
    const seasons = {
      lowSeason: 'Basse saison',
      midSeason: 'Moyenne saison',
      highSeason: 'Haute saison'
    }
    return seasons[seasonKey] || ''
  }

  const getSeasonDates = (seasonKey) => {
    const dates = {
      lowSeason: '10 octobre - 1er mai',
      midSeason: '30 avril - 8 juillet & 28 août - 9 octobre',
      highSeason: '9 juillet - 27 août'
    }
    return dates[seasonKey] || ''
  }

  if (!room) {
    return (
      <Container>
        <MarineElements density="light" />
        <Content style={{ gridTemplateColumns: '1fr', maxWidth: '800px' }}>
          <BookingForm
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BackButton
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Retour
            </BackButton>

            <Title>Choisir un appartement</Title>
            
            <SectionTitle>
              <Home size={24} />
              Sélectionnez l'appartement de votre choix
            </SectionTitle>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {rooms.map(apartment => (
                <div
                  key={apartment.id}
                  style={{
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'white'
                  }}
                  onClick={() => {
                    const selectedRoom = rooms.find(r => r.id === apartment.id)
                    setRoom(selectedRoom)
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2c5aa0'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(44, 90, 160, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ 
                        margin: '0 0 0.5rem 0', 
                        color: '#2c5aa0',
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.5rem'
                      }}>
                        {apartment.name}
                      </h3>
                      <p style={{ 
                        margin: '0 0 1rem 0', 
                        color: '#666',
                        lineHeight: '1.6'
                      }}>
                        {apartment.description}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#666' }}>
                        <span>👥 {apartment.capacity} personnes</span>
                        <span>📐 {apartment.size} m²</span>
                        <span>🏠 {apartment.bedrooms} chambres</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2c5aa0' }}>
                        À partir de {Math.min(apartment.price.lowSeason, apartment.price.midSeason, apartment.price.highSeason)}€/nuit
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BookingForm>
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <MarineElements density="light" />
      <Content>
        <BookingForm
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BackButton
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Retour
          </BackButton>

          <Title>Demande de réservation - {room.name}</Title>

          {successMessage && (
            <SuccessMessage>
              <Check size={20} />
              {successMessage}
            </SuccessMessage>
          )}

          {errors.submit && (
            <ErrorMessage>
              <AlertCircle size={20} />
              {errors.submit}
            </ErrorMessage>
          )}

          {errors.availability && (
            <ErrorMessage>
              <AlertCircle size={20} />
              {errors.availability}
            </ErrorMessage>
          )}

          <form onSubmit={handleSubmit}>
            <SectionTitle>
              <Calendar size={24} />
              Dates de séjour
            </SectionTitle>

            <DateGrid>
              <FormGroup>
                <Label>Arrivée</Label>
                <Input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.checkIn && <ErrorMessage>{errors.checkIn}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Départ</Label>
                <Input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                />
                {errors.checkOut && <ErrorMessage>{errors.checkOut}</ErrorMessage>}
              </FormGroup>
            </DateGrid>

            <FormGroup>
              <Label>
                <Users size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Nombre de voyageurs
              </Label>
              <GuestSelect
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
              >
                {room && Array.from({ length: room.capacity }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? 'personne' : 'personnes'}
                  </option>
                ))}
              </GuestSelect>
              {errors.guests && <ErrorMessage>{errors.guests}</ErrorMessage>}
            </FormGroup>

            <SectionTitle>
              <Mail size={24} />
              Informations de contact
            </SectionTitle>

            <FormGroup>
              <Label>Nom complet</Label>
              <Input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                placeholder="Votre nom"
              />
              {errors.guestName && <ErrorMessage>{errors.guestName}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="votre@email.com"
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                <Phone size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Téléphone
              </Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="06 12 34 56 78"
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>
                <MessageSquare size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Demandes spéciales (optionnel)
              </Label>
              <TextArea
                name="requests"
                value={formData.requests}
                onChange={handleInputChange}
                placeholder="Lit bébé, arrivée tardive, régime alimentaire..."
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                'Envoi en cours...'
              ) : (
                <>
                  <CreditCard size={20} />
                  Demander la réservation
                </>
              )}
            </SubmitButton>
          </form>
        </BookingForm>

        <RoomSummary
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <RoomImage src={room.images[0]} alt={room.name} />
          <RoomName>{room.name}</RoomName>
          <RoomType>{room.type} - {room.size}</RoomType>
          
          <RoomDetails>
            <strong>Capacité :</strong> Jusqu'à {room.capacity} personnes<br />
            <strong>Equipements :</strong> {room.amenities.slice(0, 3).join(', ')}...
          </RoomDetails>

          {formData.checkIn && formData.checkOut && nights > 0 && (
            <>
              <PriceSection>
                <PriceRow>
                  <span>Prix par semaine ({getSeasonName(season)}):</span>
                  <span>{room.price[season]}€</span>
                </PriceRow>
                <PriceRow>
                  <span>Nombre de nuits:</span>
                  <span>{nights}</span>
                </PriceRow>
                <PriceRow className="total">
                  <span>Total:</span>
                  <span>{totalPrice}€</span>
                </PriceRow>
              </PriceSection>

              {season && (
                <SeasonInfo>
                  <strong>{getSeasonName(season)}</strong><br />
                  {getSeasonDates(season)}
                </SeasonInfo>
              )}
            </>
          )}

          <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
            ⚠️ Cette demande sera envoyée au propriétaire pour validation. 
            Vous recevrez une confirmation par email.
          </div>
        </RoomSummary>
      </Content>
    </Container>
  )
}

export default Booking
