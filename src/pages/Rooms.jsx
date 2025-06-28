import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { Users, Bed, Wifi, Car, Coffee, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { MarineElements } from '../components/MarineElements'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const RoomsPage = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`

const Hero = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  color: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing[20]} 0 ${props => props.theme.spacing[16]};
  text-align: center;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`

const HeroContent = styled(motion.div)`
  h1 {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.neutral.white};
  }

  p {
    font-size: ${props => props.theme.fontSizes.xl};
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    color: ${props => props.theme.colors.neutral.white};
  }
`

const FilterSection = styled.section`
  background: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing[8]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.neutral[200]};
`

const FilterControls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const FilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border: 2px solid ${props => props.active ? props.theme.colors.primary.main : props.theme.colors.neutral[300]};
  background: ${props => props.active ? props.theme.colors.primary.main : props.theme.colors.neutral.white};
  color: ${props => props.active ? props.theme.colors.neutral.white : props.theme.colors.neutral[700]};
  border-radius: ${props => props.theme.radii.full};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    background: ${props => !props.active ? props.theme.colors.primary[50] : props.theme.colors.primary.main};
    color: ${props => !props.active ? props.theme.colors.primary.main : props.theme.colors.neutral.white};
  }
`

const RoomsSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
`

const RoomsGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[12]};
`

const RoomCard = styled(motion.div)`
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.radii['2xl']};
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    
    &:nth-child(even) {
      .image {
        order: 2;
      }
      
      .content {
        order: 1;
      }
    }
  }
`

const RoomImage = styled.div`
  height: 400px;
  position: relative;
  overflow: hidden;

  .swiper {
    height: 100%;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .price-badge {
    position: absolute;
    top: ${props => props.theme.spacing[4]};
    right: ${props => props.theme.spacing[4]};
    background: linear-gradient(135deg, ${props => props.theme.colors.accent.gold}, ${props => props.theme.colors.accent.coral});
    color: ${props => props.theme.colors.neutral.white};
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
    border-radius: ${props => props.theme.radii.full};
    font-weight: ${props => props.theme.fontWeights.bold};
    font-size: ${props => props.theme.fontSizes.lg};
    z-index: 10;
    box-shadow: ${props => props.theme.shadows.md};
  }
`

const RoomContent = styled.div`
  padding: ${props => props.theme.spacing[8]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 520px;

  h3 {
    color: ${props => props.theme.colors.neutral[900]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }

  .description {
    color: ${props => props.theme.colors.neutral[600]};
    margin-bottom: ${props => props.theme.spacing[6]};
    line-height: 1.6;
    flex-grow: 1;
  }

  .details {
    display: flex;
    gap: ${props => props.theme.spacing[6]};
    margin-bottom: ${props => props.theme.spacing[6]};
    flex-wrap: wrap;

    .detail {
      display: flex;
      align-items: center;
      gap: ${props => props.theme.spacing[2]};
      color: ${props => props.theme.colors.neutral[600]};
      font-size: ${props => props.theme.fontSizes.sm};

      svg {
        color: ${props => props.theme.colors.primary.main};
      }
    }
  }

  .amenities {
    margin-bottom: ${props => props.theme.spacing[6]};

    h4 {
      color: ${props => props.theme.colors.neutral[800]};
      margin-bottom: ${props => props.theme.spacing[3]};
      font-size: ${props => props.theme.fontSizes.base};
    }

    .amenities-list {
      display: flex;
      flex-wrap: wrap;
      gap: ${props => props.theme.spacing[2]};

      .amenity {
        background: ${props => props.theme.colors.primary[50]};
        color: ${props => props.theme.colors.primary.main};
        padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
        border-radius: ${props => props.theme.radii.full};
        font-size: ${props => props.theme.fontSizes.sm};
        font-weight: ${props => props.theme.fontWeights.medium};
      }
    }
  }

  .actions {
    display: flex;
    gap: ${props => props.theme.spacing[3]};

    .btn {
      flex: 1;
      justify-content: center;
      padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
    }
  }
`

const Rooms = () => {
  const { rooms } = useBooking()
  const [filter, setFilter] = useState('all')

  const filters = [
    { key: 'all', label: 'Toutes les chambres' },
    { key: 'vue-mer', label: 'Vue mer' },
    { key: 'suite', label: 'Suites' },
    { key: 'famille', label: 'Familiales' },
  ]

  const filteredRooms = rooms.filter(room => {
    if (filter === 'all') return true
    if (filter === 'vue-mer') return room.amenities.some(amenity => amenity.toLowerCase().includes('vue mer'))
    if (filter === 'suite') return room.name.toLowerCase().includes('suite')
    if (filter === 'famille') return room.capacity >= 4
    return true
  })

  return (
    <RoomsPage>
      <MarineElements density="light" />
      <Hero>
        <Container>
          <HeroContent
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Nos Chambres & Suites</h1>
            <p>
              Découvrez nos hébergements d'exception avec vue sur la Méditerranée 
              et les vignobles de Banyuls-sur-Mer
            </p>
          </HeroContent>
        </Container>
      </Hero>

      <FilterSection>
        <Container>
          <FilterControls>
            {filters.map(filterOption => (
              <FilterButton
                key={filterOption.key}
                active={filter === filterOption.key}
                onClick={() => setFilter(filterOption.key)}
              >
                {filterOption.label}
              </FilterButton>
            ))}
          </FilterControls>
        </Container>
      </FilterSection>

      <RoomsSection>
        <Container>
          <RoomsGrid>
            {filteredRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <RoomImage className="image">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    style={{ height: '100%' }}
                  >
                    {room.images.map((image, imgIndex) => (
                      <SwiperSlide key={imgIndex}>
                        <div 
                          style={{
                            height: '100%',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="price-badge">
                    €{room.price.lowSeason}/sem
                  </div>
                </RoomImage>
                
                <RoomContent className="content">
                  <div>
                    <h3>{room.name}</h3>
                    <p className="description">{room.description}</p>
                    
                    <div className="details">
                      <div className="detail">
                        <Users size={16} />
                        {room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}
                      </div>
                      <div className="detail">
                        <Bed size={16} />
                        {room.size}m²
                      </div>
                    </div>

                    <div className="amenities">
                      <h4>Équipements</h4>
                      <div className="amenities-list">
                        {room.amenities.slice(0, 6).map((amenity, idx) => (
                          <span key={idx} className="amenity">{amenity}</span>
                        ))}
                        {room.amenities.length > 6 && (
                          <span className="amenity">+{room.amenities.length - 6} autres</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="actions">
                    <Link to={`/chambres/${room.id}`} className="btn btn-outline">
                      Voir détails
                    </Link>
                    <Link to={`/reservation?room=${room.id}`} className="btn btn-primary">
                      Réserver
                    </Link>
                  </div>
                </RoomContent>
              </RoomCard>
            ))}
          </RoomsGrid>

          {filteredRooms.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <h3>Aucune chambre ne correspond à vos critères</h3>
              <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                Essayez de modifier vos filtres ou contactez-nous pour plus d'options.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Nous contacter
              </Link>
            </div>
          )}
        </Container>
      </RoomsSection>
    </RoomsPage>
  )
}

export default Rooms
