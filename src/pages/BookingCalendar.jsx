import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Edit, Trash2, Save, Calendar as CalendarIcon } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
  background: linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 100%);
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #2c5aa0;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const CalendarWrapper = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`

const CalendarHeader = styled.div`
  background: #2c5aa0;
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`

const MonthYear = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin: 0 1rem;
  min-width: 200px;
  text-align: center;
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

const FilterSelect = styled.select`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;

  option {
    color: #333;
    background: white;
  }
`

const TodayButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

const DayHeader = styled.div`
  background: #f5f5f5;
  padding: 1rem 0.5rem;
  text-align: center;
  font-weight: 600;
  color: #2c5aa0;
  border-bottom: 1px solid #e0e0e0;
`

const DayCell = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCurrentMonth', 'isToday'].includes(prop)
})`
  min-height: 120px;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  background: ${props => {
    if (!props.isCurrentMonth) return '#f8f9fa'
    if (props.isToday) return 'rgba(44, 90, 160, 0.1)'
    return 'white'
  }};
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.isCurrentMonth ? 'rgba(44, 90, 160, 0.05)' : '#f0f0f0'};
  }
`

const DayNumber = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCurrentMonth', 'isToday'].includes(prop)
})`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.isCurrentMonth ? '#2c5aa0' : '#adb5bd'};
  font-size: ${props => props.isToday ? '1.1rem' : '1rem'};
`

const BookingItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$status'].includes(prop)
})`
  background: ${props => {
    switch (props.$status) {
      case 'confirmed': return '#10b981'
      case 'pending': return '#f59e0b'
      case 'cancelled': return '#ef4444'
      default: return '#6b7280'
    }
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    transform: scale(1.02);
    opacity: 0.9;
  }
`

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const ModalTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #2c5aa0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c5aa0;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2c5aa0;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #2c5aa0;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2c5aa0;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop)
})`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${props => props.variant === 'primary' && `
    background: #2c5aa0;
    color: white;
    &:hover {
      background: #1e3a8a;
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: #f5f5f5;
    color: #666;
    &:hover {
      background: #e0e0e0;
    }
  `}

  ${props => props.variant === 'danger' && `
    background: #ef4444;
    color: white;
    &:hover {
      background: #dc2626;
    }
  `}
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`

const InfoLabel = styled.span`
  font-weight: 600;
  color: #2c5aa0;
`

const InfoValue = styled.span`
  color: #666;
`

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${props => {
    switch (props.$status) {
      case 'confirmed': return '#dcfce7'
      case 'pending': return '#fef3c7'
      case 'cancelled': return '#fee2e2'
      default: return '#f3f4f6'
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'confirmed': return '#166534'
      case 'pending': return '#92400e'
      case 'cancelled': return '#991b1b'
      default: return '#374151'
    }
  }};
`

const BookingCalendar = () => {
  const { bookings, apartments, updateBooking, deleteBooking } = useBooking()
  const { user, isAdmin } = useAuth()
  
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedApartment, setSelectedApartment] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({})

  // Initialiser à la date actuelle
  useEffect(() => {
    const today = new Date()
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
  }, [])

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const goToCurrentMonth = () => {
    const today = new Date()
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const current = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = current.getMonth() === month
      const isToday = current.toDateString() === new Date().toDateString()
      
      days.push({
        date: new Date(current),
        day: current.getDate(),
        isCurrentMonth,
        isToday
      })
      
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  const getBookingsForDay = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    
    return bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn).toISOString().split('T')[0]
      const checkOut = new Date(booking.checkOut).toISOString().split('T')[0]
      
      const matchesApartment = selectedApartment === 'all' || booking.roomId === selectedApartment
      const isInDateRange = dateStr >= checkIn && dateStr <= checkOut
      
      return matchesApartment && isInDateRange
    })
  }

  const handleBookingClick = (booking) => {
    if (isAdmin) {
      setSelectedBooking(booking)
      setEditForm({
        status: booking.status,
        checkIn: booking.checkIn.split('T')[0],
        checkOut: booking.checkOut.split('T')[0],
        adminNotes: booking.adminNotes || ''
      })
    }
  }

  const handleSaveEdit = async () => {
    try {
      const updatedBooking = {
        ...selectedBooking,
        ...editForm,
        updatedAt: new Date().toISOString()
      }
      
      await updateBooking(selectedBooking.id, updatedBooking)
      setSelectedBooking(updatedBooking)
      setIsEditing(false)
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const handleDeleteBooking = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      try {
        await deleteBooking(selectedBooking.id)
        setSelectedBooking(null)
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
      }
    }
  }

  const getApartmentName = (roomId) => {
    if (!apartments || !roomId) return 'Appartement inconnu'
    const apartment = apartments.find(apt => apt.id === roomId)
    return apartment ? apartment.name : 'Appartement inconnu'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      cancelled: 'Annulée'
    }
    return statusMap[status] || status
  }

  const calendarDays = generateCalendarDays()

  return (
    <Container>
      <Content>
        <Header>
          <Title>
            <CalendarIcon size={32} />
            Calendrier des Réservations
          </Title>
        </Header>

        <CalendarWrapper
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CalendarHeader>
            <Navigation>
              <NavButton onClick={() => navigateMonth(-1)} title="Mois précédent">
                <ChevronLeft size={20} />
              </NavButton>
              
              <MonthYear>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </MonthYear>
              
              <NavButton onClick={() => navigateMonth(1)} title="Mois suivant">
                <ChevronRight size={20} />
              </NavButton>
            </Navigation>

            <FilterContainer>
              <TodayButton onClick={goToCurrentMonth}>
                Aujourd'hui
              </TodayButton>
              
              <FilterSelect
                value={selectedApartment}
                onChange={(e) => setSelectedApartment(e.target.value)}
              >
                <option value="all">Tous les appartements</option>
                {apartments && apartments.map(apartment => (
                  <option key={apartment.id} value={apartment.id}>
                    {apartment.name}
                  </option>
                ))}
              </FilterSelect>
            </FilterContainer>
          </CalendarHeader>

          <CalendarGrid>
            {dayNames.map(day => (
              <DayHeader key={day}>{day}</DayHeader>
            ))}
            
            {calendarDays.map((day, index) => {
              const dayBookings = getBookingsForDay(day.date)
              
              return (
                <DayCell
                  key={index}
                  isCurrentMonth={day.isCurrentMonth}
                  isToday={day.isToday}
                >
                  <DayNumber isCurrentMonth={day.isCurrentMonth} isToday={day.isToday}>
                    {day.day}
                  </DayNumber>
                  
                  {dayBookings.map(booking => (
                    <BookingItem
                      key={booking.id}
                      $status={booking.status}
                      onClick={() => handleBookingClick(booking)}
                      title={isAdmin ? `${booking.guestName} - ${getApartmentName(booking.roomId)}` : getApartmentName(booking.roomId)}
                    >
                      {isAdmin 
                        ? `${booking.guestName} - ${getApartmentName(booking.roomId)}`
                        : getApartmentName(booking.roomId)
                      }
                    </BookingItem>
                  ))}
                </DayCell>
              )
            })}
          </CalendarGrid>
        </CalendarWrapper>

        {/* Modal de détails/édition pour admin */}
        <AnimatePresence>
          {selectedBooking && isAdmin && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
            >
              <ModalContent
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModalHeader>
                  <ModalTitle>
                    {isEditing ? 'Modifier la réservation' : 'Détails de la réservation'}
                  </ModalTitle>
                  <CloseButton onClick={() => setSelectedBooking(null)}>
                    <X size={20} />
                  </CloseButton>
                </ModalHeader>

                {!isEditing ? (
                  <div>
                    <InfoRow>
                      <InfoLabel>Client :</InfoLabel>
                      <InfoValue>{selectedBooking.guestName}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Email :</InfoLabel>
                      <InfoValue>{selectedBooking.guestEmail}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Téléphone :</InfoLabel>
                      <InfoValue>{selectedBooking.guestPhone}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Appartement :</InfoLabel>
                      <InfoValue>{getApartmentName(selectedBooking.roomId)}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Arrivée :</InfoLabel>
                      <InfoValue>{formatDate(selectedBooking.checkIn)}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Départ :</InfoLabel>
                      <InfoValue>{formatDate(selectedBooking.checkOut)}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Personnes :</InfoLabel>
                      <InfoValue>{selectedBooking.guests}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Prix total :</InfoLabel>
                      <InfoValue>{selectedBooking.totalPrice}€</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Statut :</InfoLabel>
                      <StatusBadge $status={selectedBooking.status}>
                        {getStatusText(selectedBooking.status)}
                      </StatusBadge>
                    </InfoRow>
                    {selectedBooking.adminNotes && (
                      <InfoRow>
                        <InfoLabel>Notes admin :</InfoLabel>
                        <InfoValue>{selectedBooking.adminNotes}</InfoValue>
                      </InfoRow>
                    )}

                    <ButtonGroup>
                      <Button variant="secondary" onClick={() => setIsEditing(true)}>
                        <Edit size={16} />
                        Modifier
                      </Button>
                      <Button variant="danger" onClick={handleDeleteBooking}>
                        <Trash2 size={16} />
                        Supprimer
                      </Button>
                    </ButtonGroup>
                  </div>
                ) : (
                  <div>
                    <FormGroup>
                      <Label>Statut</Label>
                      <Select
                        value={editForm.status}
                        onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="cancelled">Annulée</option>
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label>Date d'arrivée</Label>
                      <Input
                        type="date"
                        value={editForm.checkIn}
                        onChange={(e) => setEditForm({...editForm, checkIn: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Date de départ</Label>
                      <Input
                        type="date"
                        value={editForm.checkOut}
                        onChange={(e) => setEditForm({...editForm, checkOut: e.target.value})}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Notes administrateur</Label>
                      <TextArea
                        value={editForm.adminNotes}
                        onChange={(e) => setEditForm({...editForm, adminNotes: e.target.value})}
                        placeholder="Notes internes..."
                      />
                    </FormGroup>

                    <ButtonGroup>
                      <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button variant="primary" onClick={handleSaveEdit}>
                        <Save size={16} />
                        Enregistrer
                      </Button>
                    </ButtonGroup>
                  </div>
                )}
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </Content>
    </Container>
  )
}

export default BookingCalendar
