import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Filter, MapPin, SlidersHorizontal, Users, Waves } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { MarineElements } from '../components/MarineElements'

const PageShell = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 7rem;
`

const Hero = styled.section`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing[12]} 0 ${theme.spacing[10]}`};
`

const HeroPanel = styled.div`
  position: relative;
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background:
    radial-gradient(circle at 85% 18%, rgba(88, 199, 212, 0.2), transparent 25%),
    radial-gradient(circle at 10% 20%, rgba(246, 197, 119, 0.14), transparent 18%),
    rgba(255, 255, 255, 0.94);
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;

  h1 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
    max-width: 10ch;
  }

  p {
    max-width: 44rem;
    color: ${({ theme }) => theme.colors.neutral[200]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[7]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const HeroStat = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: rgba(18, 58, 99, 0.04);
  border: 1px solid rgba(18, 58, 99, 0.08);

  strong {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[300]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const ControlsSection = styled.section`
  padding: 0 0 ${({ theme }) => theme.spacing[8]};
`

const ControlsPanel = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  display: grid;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
`

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: center;
  justify-content: space-between;
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
`

const FilterButton = styled.button`
  min-height: 2.9rem;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(47, 109, 162, 0.18)' : 'rgba(18, 58, 99, 0.08)'};
  background: ${({ $active }) =>
    $active ? 'rgba(47, 109, 162, 0.1)' : 'rgba(18, 58, 99, 0.03)'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.neutral.white : theme.colors.neutral[300]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &:hover {
    transform: translateY(-1px);
  }
`

const SortSelect = styled.select`
  max-width: 18rem;
`

const Results = styled.section`
  padding-bottom: ${({ theme }) => theme.spacing[20]};
`

const Grid = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const RoomCard = styled(motion.article)`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(255, 255, 255, 0.94);
  box-shadow: ${({ theme }) => theme.shadows.base};

  .media {
    position: relative;
    height: 19rem;
    overflow: hidden;
  }

  .media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .media::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 20%, rgba(18, 58, 99, 0.14) 100%);
  }

  .badge-row {
    position: absolute;
    inset: 1rem 1rem auto 1rem;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[3]};
    flex-wrap: wrap;
  }

  .badge {
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    border: 1px solid rgba(18, 58, 99, 0.08);
    background: rgba(255, 255, 255, 0.9);
    color: ${({ theme }) => theme.colors.neutral.white};
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .body {
    padding: ${({ theme }) => theme.spacing[6]};
  }

  h2 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[300]};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[2]};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  .meta span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 0.85rem;
    border-radius: 999px;
    background: rgba(18, 58, 99, 0.05);
    color: ${({ theme }) => theme.colors.neutral[200]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  .amenities {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[2]};
    margin-bottom: ${({ theme }) => theme.spacing[5]};
  }

  .amenities span {
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    background: rgba(18, 58, 99, 0.06);
    color: ${({ theme }) => theme.colors.secondary.light};
    font-size: 0.78rem;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`

const EmptyState = styled.div`
  width: min(720px, calc(100% - 2rem));
  margin: 0 auto;
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(255, 255, 255, 0.9);

  p {
    margin: ${({ theme }) => `${theme.spacing[3]} 0 ${theme.spacing[5]}`};
    color: ${({ theme }) => theme.colors.neutral[300]};
  }
`

const filters = [
  { key: 'all', label: 'Tous' },
  { key: 'available', label: 'Disponibles' },
  { key: 'panorama', label: 'Vue mer' },
  { key: 'outdoor', label: 'Terrasse ou patio' },
  { key: 'family', label: 'Famille & groupes' },
  { key: 'couple', label: 'Escapade duo' },
]

const sorters = {
  featured: (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  capacity: (a, b) => b.capacity - a.capacity,
  priceAsc: (a, b) => a.price.lowSeason - b.price.lowSeason,
  priceDesc: (a, b) => b.price.highSeason - a.price.highSeason,
}

const hasSeaView = (room) =>
  room.amenities.some((amenity) => amenity.toLowerCase().includes('vue'))

const hasOutdoorSpace = (room) =>
  room.amenities.some((amenity) =>
    ['terrasse', 'patio', 'balcon'].some((keyword) => amenity.toLowerCase().includes(keyword))
  )

const Rooms = () => {
  const { rooms } = useBooking()
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  const filteredRooms = rooms
    .filter((room) => {
      if (activeFilter === 'all') return true
      if (activeFilter === 'available') return room.available
      if (activeFilter === 'panorama') return hasSeaView(room)
      if (activeFilter === 'outdoor') return hasOutdoorSpace(room)
      if (activeFilter === 'family') return room.capacity >= 6
      if (activeFilter === 'couple') return room.capacity <= 2
      return true
    })
    .sort(sorters[sortBy] || sorters.featured)

  const availableCount = rooms.filter((room) => room.available).length
  const panoramicCount = rooms.filter(hasSeaView).length
  const startingPrice = rooms.length
    ? Math.min(...rooms.map((room) => room.price.lowSeason))
    : 0

  return (
    <PageShell>
      <MarineElements density="normal" divingTheme />

      <Hero>
        <HeroPanel>
          <span className="eyebrow">Collection oceanique</span>
          <h1>Choisir l appartement qui colle vraiment a votre rythme de sejour.</h1>
          <p>
            Nous avons revu l affichage pour faciliter la comparaison : disponibilité,
            vue, extérieurs, capacité et niveau de prix sont plus lisibles dès le premier regard.
          </p>

          <HeroStats>
            <HeroStat>
              <strong>{rooms.length}</strong>
              <span>configurations a visiter</span>
            </HeroStat>
            <HeroStat>
              <strong>{availableCount}</strong>
              <span>appartements actuellement disponibles</span>
            </HeroStat>
            <HeroStat>
              <strong>{startingPrice}€</strong>
              <span>premier prix basse saison</span>
            </HeroStat>
          </HeroStats>
        </HeroPanel>
      </Hero>

      <ControlsSection>
        <ControlsPanel>
          <FilterRow>
            <FilterGroup>
              <span className="eyebrow">
                <Filter size={12} />
                Filtres
              </span>
              {filters.map((filter) => (
                <FilterButton
                  key={filter.key}
                  $active={activeFilter === filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </FilterButton>
              ))}
            </FilterGroup>

            <FilterGroup>
              <span className="eyebrow">
                <SlidersHorizontal size={12} />
                Trier
              </span>
              <SortSelect value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="featured">Mettre en avant les signatures</option>
                <option value="capacity">Du plus grand au plus intime</option>
                <option value="priceAsc">Du plus accessible au plus premium</option>
                <option value="priceDesc">Du plus premium au plus accessible</option>
              </SortSelect>
            </FilterGroup>
          </FilterRow>

          <FilterRow>
            <FilterGroup>
              <span style={{ color: '#d3e0ea', fontSize: '0.92rem' }}>
                {filteredRooms.length} resultat{filteredRooms.length > 1 ? 's' : ''} · {panoramicCount} avec vue mer
              </span>
            </FilterGroup>
          </FilterRow>
        </ControlsPanel>
      </ControlsSection>

      <Results>
        {filteredRooms.length > 0 ? (
          <Grid>
            {filteredRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <div className="media">
                  <img src={room.images[0]} alt={room.name} />
                  <div className="badge-row">
                    <span className="badge">{room.type}</span>
                    <span className="badge">{room.available ? 'Disponible' : 'Indisponible'}</span>
                  </div>
                </div>

                <div className="body">
                  <h2>{room.name}</h2>
                  <div className="meta">
                    <span>
                      <Users size={14} />
                      {room.capacity} voyageurs
                    </span>
                    <span>
                      <MapPin size={14} />
                      {room.size}
                    </span>
                    <span>
                      <Compass size={14} />
                      dès {room.price.lowSeason}€/semaine
                    </span>
                  </div>

                  <p>{room.description}</p>

                  <div className="amenities">
                    {room.amenities.slice(0, 5).map((amenity) => (
                      <span key={amenity}>{amenity}</span>
                    ))}
                  </div>

                  <div className="actions">
                    <Link to={`/rooms/${room.id}`} className="btn btn-secondary">
                      Detail complet
                    </Link>
                    <Link to={`/booking/${room.id}`} className="btn btn-primary">
                      Reserver cet appartement
                    </Link>
                  </div>
                </div>
              </RoomCard>
            ))}
          </Grid>
        ) : (
          <EmptyState>
            <span className="eyebrow">
              <Waves size={12} />
              Aucun match
            </span>
            <p>
              Aucun appartement ne correspond a ce filtre pour l instant. Vous pouvez
              revenir sur "Tous", regarder les disponibilités ou nous contacter.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Nous contacter
              <ArrowRight size={16} />
            </Link>
          </EmptyState>
        )}
      </Results>
    </PageShell>
  )
}

export default Rooms

