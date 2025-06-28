import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Settings, 
  Home,
  CheckCircle,
  XCircle,
  Clock,
  Euro,
  Camera,
  Edit3,
  Save,
  Plus,
  Trash2,
  MessageSquare,
  FileText,
  Image
} from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'
import { useLogs } from '../context/LogsContext'

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.lightBlue};
  padding: 2rem 0;
`

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Header = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.darkGray};
`

const TabsContainer = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`

const TabsList = styled.div`
  display: flex;
  background: ${props => props.theme.colors.primary};
  overflow-x: auto;
`

const Tab = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop)
})`
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : 'white'};
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255,255,255,0.1)'};
  }
`

const TabContent = styled.div`
  padding: 2rem;
  min-height: 500px;
`

// Composants pour la navigation secondaire des filtres
const TabNavigation = styled.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 0.25rem;
  gap: 0.25rem;
  margin-bottom: 1rem;
`

const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop)
})`
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : '#6b7280'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.875rem;
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};

  &:hover {
    background: ${props => props.active ? 'white' : '#e5e7eb'};
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const StatInfo = styled.div`
  flex: 1;
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
`

const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const BookingCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  align-items: center;
`

const BookingInfo = styled.div`
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.primary};
    font-size: 1.1rem;
  }
  
  p {
    margin: 0.2rem 0;
    color: ${props => props.theme.colors.darkGray};
    font-size: 0.9rem;
  }
`

const StatusBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  
  ${props => {
    switch (props.$status) {
      case 'confirmed':
        return `
          background: #d1e7dd;
          color: #0f5132;
        `;
      case 'pending':
        return `
          background: #fff3cd;
          color: #664d03;
        `;
      case 'cancelled':
        return `
          background: #f8d7da;
          color: #721c24;
        `;
      default:
        return `
          background: #e2e3e5;
          color: #41464b;
        `;
    }
  }}
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop)
})`
  background: ${props => props.variant === 'confirm' ? '#28a745' : props.variant === 'cancel' ? '#dc3545' : '#6c757d'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SettingsSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SubSection = styled.div`
  margin-bottom: 2rem;
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
`

const SubSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.lightGray};
`

const SubSectionTitle = styled.h4`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CountBadge = styled.span`
  background: ${props => {
    switch (props.type) {
      case 'pending': return '#fef3c7'
      case 'confirmed': return '#dcfce7'
      case 'cancelled': return '#fee2e2'
      case 'past': return '#f3f4f6'
      default: return '#f3f4f6'
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'pending': return '#92400e'
      case 'confirmed': return '#166534'
      case 'cancelled': return '#991b1b'
      case 'past': return '#374151'
      default: return '#374151'
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.darkGray};
  font-style: italic;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
  }
`

const SaveButton = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const RoomCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`

const RoomImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const RoomContent = styled.div`
  padding: 1.5rem;
`

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`

const RoomTitle = styled.h4`
  margin: 0;
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
`

const EditButton = styled.button`
  background: transparent;
  border: 2px solid ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.secondary};
  padding: 0.3rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: white;
  }
`

const AdminDashboard = () => {
  const { user } = useAuth()
  const { addLog } = useLogs()
  const { 
    bookings, 
    bookingRequests,
    rooms, 
    hotelSettings, 
    siteContent,
    confirmBooking, 
    cancelBooking, 
    approveBookingRequest,
    rejectBookingRequest,
    updateHotelSettings,
    updateSiteContent,
    updateRoom 
  } = useBooking()
  
  const [activeTab, setActiveTab] = useState('overview')
  const [editingRoom, setEditingRoom] = useState(null)
  const [hotelForm, setHotelForm] = useState(hotelSettings)
  const [contentForm, setContentForm] = useState(siteContent)
  const [rejectionReason, setRejectionReason] = useState('')
  const [allReservationsFilter, setAllReservationsFilter] = useState('all')

  // Vérifier si l'utilisateur est admin
  if (!user || user.role !== 'admin') {
    return (
      <Container>
        <Content>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h1>Accès non autorisé</h1>
            <p>Vous devez être administrateur pour accéder à cette page.</p>
          </div>
        </Content>
      </Container>
    )
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending')
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed')
  const pendingRequests = bookingRequests.filter(r => r.status === 'pending')
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0)

  const handleConfirmBooking = (bookingId) => {
    confirmBooking(bookingId)
  }

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId)
  }

  const handleApproveRequest = (requestId) => {
    const request = bookingRequests.find(r => r.id === requestId)
    if (request) {
      addLog('booking', 'confirm', {
        guestName: request.guestName,
        apartmentName: rooms.find(r => r.id === request.roomId)?.name || 'Appartement inconnu',
        checkIn: request.checkIn,
        checkOut: request.checkOut
      }, user.id)
    }
    approveBookingRequest(requestId)
  }

  const handleRejectRequest = (requestId) => {
    const request = bookingRequests.find(r => r.id === requestId)
    if (request) {
      addLog('booking', 'cancel', {
        guestName: request.guestName,
        apartmentName: rooms.find(r => r.id === request.roomId)?.name || 'Appartement inconnu',
        reason: rejectionReason
      }, user.id)
    }
    rejectBookingRequest(requestId, rejectionReason)
    setRejectionReason('')
  }

  // Filtrer les réservations par statut
  const getPendingRequests = () => {
    return bookingRequests.filter(request => request.status === 'pending')
  }

  const getConfirmedBookings = () => {
    return bookings.filter(booking => booking.status === 'confirmed')
  }

  const getCancelledBookings = () => {
    return bookings.filter(booking => booking.status === 'cancelled')
  }

  const getPastBookings = () => {
    const today = new Date()
    return bookings.filter(booking => {
      const checkOut = new Date(booking.checkOut)
      return checkOut < today
    })
  }

  const handleSaveHotelSettings = () => {
    updateHotelSettings(hotelForm)
    alert('Paramètres sauvegardés !')
  }

  const handleSaveContent = (section) => {
    updateSiteContent(section, contentForm[section])
    alert('Contenu sauvegardé !')
  }

  const handleHotelFormChange = (field, value) => {
    setHotelForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleContentFormChange = (section, field, value) => {
    setContentForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      cancelled: 'Annulée'
    }
    return statusMap[status] || status
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  // Fonction pour obtenir toutes les réservations selon le filtre
  const getAllReservationsForFilter = () => {
    switch (allReservationsFilter) {
      case 'requests':
        return bookingRequests
      case 'bookings':
        return bookings
      case 'all':
      default:
        return [...bookingRequests, ...bookings].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )
    }
  }

  const renderOverviewTab = () => (
    <>
      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatIcon>
            <MessageSquare size={28} />
          </StatIcon>
          <StatInfo>
            <StatValue>{pendingRequests.length}</StatValue>
            <StatLabel>Nouvelles demandes</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatIcon>
            <Calendar size={28} />
          </StatIcon>
          <StatInfo>
            <StatValue>{pendingBookings.length}</StatValue>
            <StatLabel>Demandes en attente</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatIcon>
            <CheckCircle size={28} />
          </StatIcon>
          <StatInfo>
            <StatValue>{confirmedBookings.length}</StatValue>
            <StatLabel>Réservations confirmées</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatIcon>
            <Euro size={28} />
          </StatIcon>
          <StatInfo>
            <StatValue>{totalRevenue.toLocaleString()}€</StatValue>
            <StatLabel>Chiffre d'affaires</StatLabel>
          </StatInfo>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <StatIcon>
            <Home size={28} />
          </StatIcon>
          <StatInfo>
            <StatValue>{rooms.length}</StatValue>
            <StatLabel>Appartements disponibles</StatLabel>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <SectionTitle>
        <Clock size={20} />
        Demandes en attente
      </SectionTitle>
      <BookingsList>
        {pendingBookings.map(booking => {
          const room = rooms.find(r => r.id === booking.roomId)
          return (
            <BookingCard key={booking.id}>
              <BookingInfo>
                <h4>{booking.guestName}</h4>
                <p><strong>{room?.name}</strong></p>
                <p>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
                <p>{booking.guests} personne(s) • {booking.totalPrice}€</p>
                <p>Email: {booking.email}</p>
                {booking.requests && <p>Demandes: {booking.requests}</p>}
              </BookingInfo>
              <StatusBadge $status={booking.status}>
                {getStatusText(booking.status)}
              </StatusBadge>
              <ActionButtons>
                <ActionButton
                  variant="confirm"
                  onClick={() => handleConfirmBooking(booking.id)}
                >
                  <CheckCircle size={14} />
                  Confirmer
                </ActionButton>
                <ActionButton
                  variant="cancel"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  <XCircle size={14} />
                  Refuser
                </ActionButton>
              </ActionButtons>
            </BookingCard>
          )
        })}
        {pendingBookings.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
            Aucune demande en attente
          </p>
        )}
      </BookingsList>

      {/* Section Toutes les réservations */}
      <SectionTitle>
        <Calendar size={20} />
        Toutes les Réservations - Aperçu Global
      </SectionTitle>
      
      <div style={{ marginBottom: '2rem' }}>
        <TabNavigation>
          <TabButton 
            active={allReservationsFilter === 'all'} 
            onClick={() => setAllReservationsFilter('all')}
          >
            Toutes ({[...bookingRequests, ...bookings].length})
          </TabButton>
          <TabButton 
            active={allReservationsFilter === 'requests'} 
            onClick={() => setAllReservationsFilter('requests')}
          >
            Demandes ({bookingRequests.length})
          </TabButton>
          <TabButton 
            active={allReservationsFilter === 'bookings'} 
            onClick={() => setAllReservationsFilter('bookings')}
          >
            Réservations ({bookings.length})
          </TabButton>
        </TabNavigation>
      </div>

      <BookingsList>
        {getAllReservationsForFilter().map(reservation => {
          const room = rooms.find(r => r.id === reservation.roomId)
          const isRequest = bookingRequests.includes(reservation)
          
          return (
            <BookingCard key={`${isRequest ? 'req' : 'book'}-${reservation.id}`}>
              <BookingInfo>
                <h4>{reservation.guestName}</h4>
                <p><strong>{room?.name}</strong></p>
                <p>{formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}</p>
                <p>{reservation.guests} personne(s) • {reservation.totalPrice}€</p>
                <p>Email: {reservation.email}</p>
                {reservation.requests && <p>Demandes: {reservation.requests}</p>}
                <p><small>{isRequest ? 'Demande créée' : 'Réservation créée'} le {formatDate(reservation.createdAt)}</small></p>
              </BookingInfo>
              <StatusBadge $status={reservation.status}>
                {getStatusText(reservation.status)}
              </StatusBadge>
              {reservation.status === 'pending' && (
                <ActionButtons>
                  {isRequest ? (
                    <>
                      <ActionButton
                        variant="confirm"
                        onClick={() => handleApproveRequest(reservation.id)}
                      >
                        <CheckCircle size={14} />
                        Approuver
                      </ActionButton>
                      <ActionButton
                        variant="cancel"
                        onClick={() => handleRejectRequest(reservation.id)}
                      >
                        <XCircle size={14} />
                        Rejeter
                      </ActionButton>
                    </>
                  ) : (
                    <>
                      <ActionButton
                        variant="confirm"
                        onClick={() => handleConfirmBooking(reservation.id)}
                      >
                        <CheckCircle size={14} />
                        Confirmer
                      </ActionButton>
                      <ActionButton
                        variant="cancel"
                        onClick={() => handleCancelBooking(reservation.id)}
                      >
                        <XCircle size={14} />
                        Refuser
                      </ActionButton>
                    </>
                  )}
                </ActionButtons>
              )}
            </BookingCard>
          )
        })}
        {getAllReservationsForFilter().length === 0 && (
          <EmptyState>Aucune réservation pour ce filtre</EmptyState>
        )}
      </BookingsList>
    </>
  )

  const renderRequestsTab = () => {
    const pendingRequests = getPendingRequests()
    const confirmedBookings = getConfirmedBookings()
    const cancelledBookings = getCancelledBookings()
    const pastBookings = getPastBookings()

    return (
      <>
        <SectionTitle>
          <MessageSquare size={20} />
          Gestion des Réservations
        </SectionTitle>

        {/* Demandes en attente */}
        <SubSection>
          <SubSectionHeader>
            <SubSectionTitle>
              <Clock size={18} color="#f59e0b" />
              Demandes en attente
            </SubSectionTitle>
            <CountBadge type="pending">{pendingRequests.length}</CountBadge>
          </SubSectionHeader>
          {pendingRequests.length > 0 ? (
            <BookingsList>
              {pendingRequests.map(request => {
                const room = rooms.find(r => r.id === request.roomId)
                return (
                  <BookingCard key={request.id}>
                    <BookingInfo>
                      <h4>{request.guestName}</h4>
                      <p><strong>{room?.name}</strong></p>
                      <p>{formatDate(request.checkIn)} - {formatDate(request.checkOut)}</p>
                      <p>{request.guests} personne(s) • {request.totalPrice}€</p>
                      <p>Email: {request.email} • Tél: {request.phone}</p>
                      {request.requests && <p>Demandes spéciales: {request.requests}</p>}
                      <p><small>Demandée le {formatDate(request.createdAt)}</small></p>
                    </BookingInfo>
                    <StatusBadge $status="pending">
                      En attente
                    </StatusBadge>
                    <ActionButtons>
                      <ActionButton
                        variant="confirm"
                        onClick={() => handleApproveRequest(request.id)}
                      >
                        <CheckCircle size={14} />
                        Approuver
                      </ActionButton>
                      <ActionButton
                        variant="cancel"
                        onClick={() => {
                          const reason = prompt('Raison du refus (optionnel):')
                          if (reason !== null) {
                            setRejectionReason(reason)
                            handleRejectRequest(request.id)
                          }
                        }}
                      >
                        <XCircle size={14} />
                        Refuser
                      </ActionButton>
                    </ActionButtons>
                  </BookingCard>
                )
              })}
            </BookingsList>
          ) : (
            <EmptyState>Aucune demande en attente</EmptyState>
          )}
        </SubSection>

        {/* Réservations validées */}
        <SubSection>
          <SubSectionHeader>
            <SubSectionTitle>
              <CheckCircle size={18} color="#10b981" />
              Réservations validées
            </SubSectionTitle>
            <CountBadge type="confirmed">{confirmedBookings.length}</CountBadge>
          </SubSectionHeader>
          {confirmedBookings.length > 0 ? (
            <BookingsList>
              {confirmedBookings.map(booking => {
                const room = rooms.find(r => r.id === booking.roomId)
                return (
                  <BookingCard key={booking.id}>
                    <BookingInfo>
                      <h4>{booking.guestName}</h4>
                      <p><strong>{room?.name}</strong></p>
                      <p>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
                      <p>{booking.guests} personne(s) • {booking.totalPrice}€</p>
                      <p>Email: {booking.email} • Tél: {booking.phone}</p>
                      {booking.requests && <p>Demandes: {booking.requests}</p>}
                      <p><small>Confirmée le {formatDate(booking.updatedAt || booking.createdAt)}</small></p>
                    </BookingInfo>
                    <StatusBadge $status="confirmed">
                      Confirmée
                    </StatusBadge>
                    <ActionButtons>
                      <ActionButton
                        variant="cancel"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        <XCircle size={14} />
                        Annuler
                      </ActionButton>
                    </ActionButtons>
                  </BookingCard>
                )
              })}
            </BookingsList>
          ) : (
            <EmptyState>Aucune réservation validée</EmptyState>
          )}
        </SubSection>

        {/* Réservations refusées */}
        <SubSection>
          <SubSectionHeader>
            <SubSectionTitle>
              <XCircle size={18} color="#ef4444" />
              Réservations refusées
            </SubSectionTitle>
            <CountBadge type="cancelled">{cancelledBookings.length}</CountBadge>
          </SubSectionHeader>
          {cancelledBookings.length > 0 ? (
            <BookingsList>
              {cancelledBookings.map(booking => {
                const room = rooms.find(r => r.id === booking.roomId)
                return (
                  <BookingCard key={booking.id}>
                    <BookingInfo>
                      <h4>{booking.guestName}</h4>
                      <p><strong>{room?.name}</strong></p>
                      <p>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
                      <p>{booking.guests} personne(s) • {booking.totalPrice}€</p>
                      <p>Email: {booking.email} • Tél: {booking.phone}</p>
                      {booking.cancelReason && <p>Raison: {booking.cancelReason}</p>}
                      <p><small>Annulée le {formatDate(booking.updatedAt || booking.createdAt)}</small></p>
                    </BookingInfo>
                    <StatusBadge $status="cancelled">
                      Refusée
                    </StatusBadge>
                  </BookingCard>
                )
              })}
            </BookingsList>
          ) : (
            <EmptyState>Aucune réservation refusée</EmptyState>
          )}
        </SubSection>

        {/* Réservations passées */}
        <SubSection>
          <SubSectionHeader>
            <SubSectionTitle>
              <Calendar size={18} color="#6b7280" />
              Réservations passées
            </SubSectionTitle>
            <CountBadge type="past">{pastBookings.length}</CountBadge>
          </SubSectionHeader>
          {pastBookings.length > 0 ? (
            <BookingsList>
              {pastBookings.slice(0, 10).map(booking => {
                const room = rooms.find(r => r.id === booking.roomId)
                return (
                  <BookingCard key={booking.id}>
                    <BookingInfo>
                      <h4>{booking.guestName}</h4>
                      <p><strong>{room?.name}</strong></p>
                      <p>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
                      <p>{booking.guests} personne(s) • {booking.totalPrice}€</p>
                      <p>Email: {booking.email} • Tél: {booking.phone}</p>
                      <p><small>Séjour terminé le {formatDate(booking.checkOut)}</small></p>
                    </BookingInfo>
                    <StatusBadge $status="past">
                      Terminé
                    </StatusBadge>
                  </BookingCard>
                )
              })}
            </BookingsList>
          ) : (
            <EmptyState>Aucune réservation passée</EmptyState>
          )}
        </SubSection>
      </>
    )
  }

  const renderBookingsTab = () => (
    <>
      <SectionTitle>
        <Calendar size={20} />
        Toutes les réservations
      </SectionTitle>
      <BookingsList>
        {bookings.map(booking => {
          const room = rooms.find(r => r.id === booking.roomId)
          return (
            <BookingCard key={booking.id}>
              <BookingInfo>
                <h4>{booking.guestName}</h4>
                <p><strong>{room?.name}</strong></p>
                <p>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
                <p>{booking.guests} personne(s) • {booking.totalPrice}€</p>
                <p>Email: {booking.email} • Tél: {booking.phone}</p>
                {booking.requests && <p>Demandes: {booking.requests}</p>}
                <p><small>Créée le {formatDate(booking.createdAt)}</small></p>
              </BookingInfo>
              <StatusBadge $status={booking.status}>
                {getStatusText(booking.status)}
              </StatusBadge>
              <ActionButtons>
                {booking.status === 'pending' && (
                  <>
                    <ActionButton
                      variant="confirm"
                      onClick={() => handleConfirmBooking(booking.id)}
                    >
                      <CheckCircle size={14} />
                      Confirmer
                    </ActionButton>
                    <ActionButton
                      variant="cancel"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <XCircle size={14} />
                      Refuser
                    </ActionButton>
                  </>
                )}
                {booking.status === 'confirmed' && (
                  <ActionButton
                    variant="cancel"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    <XCircle size={14} />
                    Annuler
                  </ActionButton>
                )}
              </ActionButtons>
            </BookingCard>
          )
        })}
      </BookingsList>
    </>
  )

  const renderRoomsTab = () => (
    <>
      <SectionTitle>
        <Home size={20} />
        Gestion des appartements
      </SectionTitle>
      <RoomsGrid>
        {rooms.map(room => (
          <RoomCard key={room.id}>
            <RoomImage src={room.images[0]} alt={room.name} />
            <RoomContent>
              <RoomHeader>
                <RoomTitle>{room.name}</RoomTitle>
                <EditButton onClick={() => setEditingRoom(room.id)}>
                  <Edit3 size={16} />
                </EditButton>
              </RoomHeader>
              <p><strong>Type:</strong> {room.type} - {room.size}</p>
              <p><strong>Capacité:</strong> {room.capacity} personnes</p>
              <p><strong>Prix:</strong> {room.price.lowSeason}€ - {room.price.highSeason}€/semaine</p>
              <p><strong>Statut:</strong> {room.available ? '✅ Disponible' : '❌ Indisponible'}</p>
            </RoomContent>
          </RoomCard>
        ))}
      </RoomsGrid>
    </>
  )

  const renderContentTab = () => (
    <>
      <SectionTitle>
        <FileText size={20} />
        Gestion du contenu du site
      </SectionTitle>
      
      <SettingsSection>
        <h3>Section Héro (Page d'accueil)</h3>
        <FormGrid>
          <FormGroup>
            <Label>Titre principal</Label>
            <Input
              value={contentForm.hero.title}
              onChange={(e) => handleContentFormChange('hero', 'title', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Sous-titre</Label>
            <Input
              value={contentForm.hero.subtitle}
              onChange={(e) => handleContentFormChange('hero', 'subtitle', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>Description</Label>
            <TextArea
              value={contentForm.hero.description}
              onChange={(e) => handleContentFormChange('hero', 'description', e.target.value)}
              rows={4}
            />
          </FormGroup>
          
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>Image d'arrière-plan (URL)</Label>
            <Input
              value={contentForm.hero.backgroundImage}
              onChange={(e) => handleContentFormChange('hero', 'backgroundImage', e.target.value)}
            />
          </FormGroup>
        </FormGrid>
        
        <SaveButton
          onClick={() => handleSaveContent('hero')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={16} />
          Sauvegarder la section Héro
        </SaveButton>
      </SettingsSection>

      <SettingsSection>
        <h3>Section À propos</h3>
        <FormGrid>
          <FormGroup>
            <Label>Titre</Label>
            <Input
              value={contentForm.about.title}
              onChange={(e) => handleContentFormChange('about', 'title', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>Description</Label>
            <TextArea
              value={contentForm.about.description}
              onChange={(e) => handleContentFormChange('about', 'description', e.target.value)}
              rows={4}
            />
          </FormGroup>
        </FormGrid>
        
        <SaveButton
          onClick={() => handleSaveContent('about')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={16} />
          Sauvegarder la section À propos
        </SaveButton>
      </SettingsSection>

      <SettingsSection>
        <h3>Section Contact</h3>
        <FormGrid>
          <FormGroup>
            <Label>Titre</Label>
            <Input
              value={contentForm.contact.title}
              onChange={(e) => handleContentFormChange('contact', 'title', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup style={{ gridColumn: '1 / -1' }}>
            <Label>Description</Label>
            <TextArea
              value={contentForm.contact.description}
              onChange={(e) => handleContentFormChange('contact', 'description', e.target.value)}
              rows={3}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Adresse</Label>
            <Input
              value={contentForm.contact.address}
              onChange={(e) => handleContentFormChange('contact', 'address', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Téléphone</Label>
            <Input
              value={contentForm.contact.phone}
              onChange={(e) => handleContentFormChange('contact', 'phone', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input
              value={contentForm.contact.email}
              onChange={(e) => handleContentFormChange('contact', 'email', e.target.value)}
            />
          </FormGroup>
        </FormGrid>
        
        <SaveButton
          onClick={() => handleSaveContent('contact')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={16} />
          Sauvegarder la section Contact
        </SaveButton>
      </SettingsSection>
    </>
  )

  const renderLogsTab = () => {
    const { logs, getRecentLogs, exportLogs, clearLogs } = useLogs()
    const recentLogs = getRecentLogs(50)
    
    return (
      <>
        <SectionTitle>
          <Clock size={20} />
          Journal d'activité
        </SectionTitle>
        
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <ActionButton variant="confirm" onClick={exportLogs}>
            Exporter les logs
          </ActionButton>
          <ActionButton 
            variant="cancel" 
            onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir effacer tous les logs ?')) {
                clearLogs()
              }
            }}
          >
            Vider les logs
          </ActionButton>
        </div>

        <SubSection>
          <SubSectionHeader>
            <SubSectionTitle>
              <Clock size={18} />
              Activités récentes ({recentLogs.length})
            </SubSectionTitle>
          </SubSectionHeader>
          
          {recentLogs.length > 0 ? (
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {recentLogs.map(log => (
                <div 
                  key={log.id} 
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid #e0e0e0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                      {log.details}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#666' }}>
                      Type: {log.type} • Action: {log.action}
                      {log.userId && ` • User ID: ${log.userId}`}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666', whiteSpace: 'nowrap' }}>
                    {new Date(log.timestamp).toLocaleString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState>Aucun log disponible</EmptyState>
          )}
        </SubSection>
      </>
    )
  }

  const renderSettingsTab = () => (
    <>
      <SettingsSection>
        <SectionTitle>
          <Settings size={20} />
          Paramètres de l'hôtel
        </SectionTitle>
        
        <FormGrid>
          <FormGroup>
            <Label>Nom de l'établissement</Label>
            <Input
              value={hotelForm.name}
              onChange={(e) => handleHotelFormChange('name', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Téléphone</Label>
            <Input
              value={hotelForm.phone}
              onChange={(e) => handleHotelFormChange('phone', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input
              value={hotelForm.email}
              onChange={(e) => handleHotelFormChange('email', e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Site web</Label>
            <Input
              value={hotelForm.website}
              onChange={(e) => handleHotelFormChange('website', e.target.value)}
            />
          </FormGroup>
        </FormGrid>
        
        <FormGroup>
          <Label>Adresse</Label>
          <Input
            value={hotelForm.address}
            onChange={(e) => handleHotelFormChange('address', e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Description</Label>
          <TextArea
            value={hotelForm.description}
            onChange={(e) => handleHotelFormChange('description', e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Slogan</Label>
          <TextArea
            value={hotelForm.tagline}
            onChange={(e) => handleHotelFormChange('tagline', e.target.value)}
          />
        </FormGroup>

        <SaveButton
          onClick={handleSaveHotelSettings}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={18} />
          Sauvegarder les modifications
        </SaveButton>
      </SettingsSection>
    </>
  )

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3, content: renderOverviewTab },
    { id: 'requests', label: 'Demandes', icon: MessageSquare, content: renderRequestsTab },
    { id: 'bookings', label: 'Réservations', icon: Calendar, content: renderBookingsTab },
    { id: 'rooms', label: 'Appartements', icon: Home, content: renderRoomsTab },
    { id: 'content', label: 'Contenu site', icon: FileText, content: renderContentTab },
    { id: 'logs', label: 'Logs', icon: Clock, content: renderLogsTab },
    { id: 'settings', label: 'Paramètres', icon: Settings, content: renderSettingsTab },
  ]

  return (
    <Container>
      <Content>
        <Header>
          <Title>Tableau de bord administrateur</Title>
          <Subtitle>Bienvenue, {user.name} • Gestion de La Grande Voile</Subtitle>
        </Header>

        <TabsContainer>
          <TabsList>
            {tabs.map(tab => (
              <Tab
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={18} />
                {tab.label}
              </Tab>
            ))}
          </TabsList>

          <TabContent>
            {tabs.find(tab => tab.id === activeTab)?.content()}
          </TabContent>
        </TabsContainer>
      </Content>
    </Container>
  )
}

export default AdminDashboard
