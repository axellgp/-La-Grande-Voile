import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { User, Calendar, Clock, CheckCircle, XCircle, Mail, Phone, Star, Home } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useBooking } from '../context/BookingContext'
import { useNavigate } from 'react-router-dom'

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
  margin-bottom: 3rem;
`

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #2c5aa0;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1.1rem;
`

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProfileCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #2c5aa0;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #4b5563;
`

const BookingItem = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid #3b82f6;
`

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const BookingTitle = styled.h4`
  color: #1f2937;
  margin: 0;
  font-size: 1.1rem;
`

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  background: ${props => {
    switch (props.$status) {
      case 'pending': return '#ffc107'
      case 'confirmed': return '#28a745'
      case 'cancelled': return '#dc3545'
      case 'rejected': return '#dc3545'
      default: return '#6c757d'
    }
  }};
`

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  color: ${props => props.theme.colors.darkGray};
`

const LoyaltyCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 1rem;
  text-align: center;
`

// Styles pour la section de réservation rapide
const QuickBookingCard = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const QuickBookingContent = styled.div`
  flex: 1;
`

const QuickBookingTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const QuickBookingText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
`

const QuickBookingButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`

const QuickBookingButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop)
})`
  background: ${props => props.variant === 'primary' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`

const Profile = () => {
  const { user } = useAuth()
  const { bookings, bookingRequests, rooms } = useBooking()
  const navigate = useNavigate()

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      cancelled: 'Annulée',
      rejected: 'Refusée'
    }
    return statusMap[status] || status
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  if (!user) {
    return (
      <Container>
        <Content>
          <Header>
            <Title>Accès non autorisé</Title>
            <Subtitle>Vous devez être connecté pour accéder à votre profil.</Subtitle>
          </Header>
        </Content>
      </Container>
    )
  }

  // Récupérer les réservations de l'utilisateur
  const userBookings = bookings.filter(booking => 
    booking.email === user.email || 
    (booking.guestName && user.name && booking.guestName.toLowerCase().includes(user.name.toLowerCase()))
  )

  const userRequests = bookingRequests.filter(request => 
    request.email === user.email || 
    (request.guestName && user.name && request.guestName.toLowerCase().includes(user.name.toLowerCase()))
  )

  // Calculer les points de fidélité (100 points par réservation confirmée)
  const loyaltyPoints = userBookings.filter(b => b.status === 'confirmed').length * 100

  return (
    <Container>
      <Content>
        <Header>
          <Title>Mon Profil</Title>
          <Subtitle>Bienvenue, {user.name}</Subtitle>
        </Header>

        {/* Section de réservation rapide */}
        <QuickBookingCard
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <QuickBookingContent>
            <QuickBookingTitle>
              <Calendar size={24} />
              Nouvelle Réservation
            </QuickBookingTitle>
            <QuickBookingText>
              Découvrez nos appartements et réservez votre séjour à La Grande Voile
            </QuickBookingText>
          </QuickBookingContent>
          <QuickBookingButtons>
            <QuickBookingButton 
              onClick={() => navigate('/rooms')}
              variant="primary"
            >
              <Home size={18} />
              Voir les Appartements
            </QuickBookingButton>
            <QuickBookingButton 
              onClick={() => navigate('/reservation')}
              variant="secondary"
            >
              <Calendar size={18} />
              Réserver Maintenant
            </QuickBookingButton>
          </QuickBookingButtons>
        </QuickBookingCard>

        <ProfileGrid>
          <ProfileCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle>
              <User size={24} />
              Informations personnelles
            </SectionTitle>

            <InfoRow>
              <User size={20} color="#4A90E2" />
              <div>
                <strong>Nom:</strong> {user.name}
              </div>
            </InfoRow>

            <InfoRow>
              <Mail size={20} color="#4A90E2" />
              <div>
                <strong>Email:</strong> {user.email}
              </div>
            </InfoRow>

            <InfoRow>
              <Calendar size={20} color="#4A90E2" />
              <div>
                <strong>Membre depuis:</strong> {formatDate(user.memberSince || '2024-01-01')}
              </div>
            </InfoRow>

            <LoyaltyCard>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Star size={24} />
                <strong>Programme de Fidélité</strong>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {loyaltyPoints} points
              </div>
              <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                Chaque réservation confirmée = 100 points
              </div>
            </LoyaltyCard>
          </ProfileCard>

          <ProfileCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle>
              <Calendar size={24} />
              Mes Réservations ({userBookings.length + userRequests.length})
            </SectionTitle>

            {[...userRequests, ...userBookings].length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>Aucune réservation pour le moment</p>
                <QuickBookingButton 
                  onClick={() => navigate('/rooms')}
                  variant="primary"
                  style={{ marginTop: '1rem' }}
                >
                  <Home size={18} />
                  Découvrir nos appartements
                </QuickBookingButton>
              </div>
            ) : (
              [...userRequests, ...userBookings]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((booking) => {
                const room = rooms.find(r => r.id === booking.roomId)
                return (
                  <BookingItem key={booking.id}>
                    <BookingHeader>
                      <BookingTitle>{room?.name || 'Appartement'}</BookingTitle>
                      <StatusBadge $status={booking.status}>
                        {getStatusText(booking.status)}
                      </StatusBadge>
                    </BookingHeader>

                    <BookingDetails>
                      <div>
                        <strong>Dates:</strong><br />
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </div>
                      <div>
                        <strong>Invités:</strong><br />
                        {booking.guests} personne(s)
                      </div>
                      <div>
                        <strong>Prix total:</strong><br />
                        {booking.totalPrice}€
                      </div>
                      <div>
                        <strong>Statut:</strong><br />
                        <span style={{ color: booking.status === 'confirmed' ? '#28a745' : booking.status === 'pending' ? '#ffc107' : '#dc3545' }}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </BookingDetails>

                    {booking.requests && (
                      <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '8px' }}>
                        <strong>Demandes spéciales:</strong> {booking.requests}
                      </div>
                    )}
                  </BookingItem>
                )
              })
            )}
          </ProfileCard>
        </ProfileGrid>
      </Content>
    </Container>
  )
}

export default Profile
