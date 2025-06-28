import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, Ruler, Euro, MapPin } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
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
  font-weight: 600;
`

const RoomCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`

const ImageGallery = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`

const ImageThumbnails = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
`

const Thumbnail = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${props => props.$active ? props.theme.colors.secondary : 'transparent'};
  flex-shrink: 0;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.secondary};
  }
`

const RoomInfo = styled.div`
  padding: 2.5rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const RoomTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`

const RoomType = styled.div`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
`

const PriceInfo = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`

const PriceContainer = styled.div`
  background: ${props => props.theme.colors.lightBlue};
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 1rem;
`

const PriceLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 0.3rem;
`

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.2rem;
`

const SeasonNote = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.darkGray};
`

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 2rem;
`

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`

const FeatureCard = styled.div`
  background: ${props => props.theme.colors.cream};
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
`

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`

const FeatureTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`

const FeatureValue = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.darkGray};
`

const Amenities = styled.div`
  margin: 2rem 0;
`

const AmenitiesTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`

const AmenitiesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.8rem;
`

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.lightGray};
`

const AmenityIcon = styled.div`
  width: 20px;
  height: 20px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
`

const BookingSection = styled.div`
  background: ${props => props.theme.colors.lightBlue};
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  margin-top: 2rem;
`

const BookButton = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`

const AvailabilityNote = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  margin-top: 1rem;
`

const UnavailableNote = styled.div`
  background: #fee;
  color: #d63384;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  font-weight: 600;
`

const PlanLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`

const RoomDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { rooms } = useBooking()
  const [room, setRoom] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (id) {
      const selectedRoom = rooms.find(r => r.id === parseInt(id))
      setRoom(selectedRoom)
    }
  }, [id, rooms])

  if (!room) {
    return (
      <Container>
        <Content>
          <p>Appartement non trouvé</p>
        </Content>
      </Container>
    )
  }

  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
  }

  const handleBooking = () => {
    navigate(`/booking/${room.id}`)
  }

  return (
    <Container>
      <MarineElements density="light" />
      <Content>
        <BackButton
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          Retour
        </BackButton>

        <RoomCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ImageGallery>
            <MainImage 
              src={room.images[currentImageIndex]} 
              alt={room.name}
            />
          </ImageGallery>
          
          <ImageThumbnails>
            {room.images.map((image, index) => (
              <Thumbnail
                key={index}
                src={image}
                alt={`${room.name} ${index + 1}`}
                $active={index === currentImageIndex}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </ImageThumbnails>

          <RoomInfo>
            <Header>
              <div>
                <RoomTitle>{room.name}</RoomTitle>
                <RoomType>{room.type} - {room.size}</RoomType>
              </div>
              
              <PriceInfo>
                <PriceContainer>
                  <PriceLabel>À partir de</PriceLabel>
                  <Price>{room.price.lowSeason}€</Price>
                  <SeasonNote>par semaine</SeasonNote>
                </PriceContainer>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Haute saison: {room.price.highSeason}€/semaine
                </div>
              </PriceInfo>
            </Header>

            <Description>{room.description}</Description>

            <Features>
              <FeatureCard>
                <FeatureIcon>
                  <Users size={24} />
                </FeatureIcon>
                <FeatureTitle>Capacité</FeatureTitle>
                <FeatureValue>Jusqu'à {room.capacity} personnes</FeatureValue>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <Ruler size={24} />
                </FeatureIcon>
                <FeatureTitle>Surface</FeatureTitle>
                <FeatureValue>{room.size}</FeatureValue>
              </FeatureCard>

              <FeatureCard>
                <FeatureIcon>
                  <Euro size={24} />
                </FeatureIcon>
                <FeatureTitle>Prix par semaine</FeatureTitle>
                <FeatureValue>{room.price.lowSeason}€ - {room.price.highSeason}€</FeatureValue>
              </FeatureCard>
            </Features>

            <Amenities>
              <AmenitiesTitle>Équipements et services</AmenitiesTitle>
              <AmenitiesList>
                {room.amenities.map((amenity, index) => (
                  <AmenityItem key={index}>
                    <AmenityIcon>✓</AmenityIcon>
                    {amenity}
                  </AmenityItem>
                ))}
              </AmenitiesList>
            </Amenities>

            {room.plan && (
              <PlanLink href={room.plan} target="_blank" rel="noopener noreferrer">
                <MapPin size={16} />
                Voir le plan de l'appartement
              </PlanLink>
            )}

            <BookingSection>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
                Réserver cet appartement
              </h3>
              
              {room.available ? (
                <>
                  <BookButton
                    onClick={handleBooking}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Faire une demande de réservation
                  </BookButton>
                  <AvailabilityNote>
                    Votre demande sera envoyée au propriétaire pour validation.
                    Vous recevrez une confirmation par email.
                  </AvailabilityNote>
                </>
              ) : (
                <UnavailableNote>
                  Cet appartement n'est actuellement pas disponible à la réservation.
                </UnavailableNote>
              )}
            </BookingSection>
          </RoomInfo>
        </RoomCard>
      </Content>
    </Container>
  )
}

export default RoomDetail
