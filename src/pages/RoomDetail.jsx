import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Calendar,
  Compass,
  Download,
  MapPin,
  Users,
  Waves,
} from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { MarineElements } from '../components/MarineElements'

const PageShell = styled.div`
  position: relative;
  overflow: hidden;
  padding: 7rem 0 ${({ theme }) => theme.spacing[20]};
`

const Inner = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  flex-wrap: wrap;
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  min-height: 3rem;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.neutral.white};
`

const Availability = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: ${({ $available }) =>
    $available ? 'rgba(54, 211, 153, 0.12)' : 'rgba(251, 113, 133, 0.12)'};
  color: ${({ theme }) => theme.colors.neutral.white};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const Gallery = styled(motion.section)`
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(8, 29, 44, 0.84);
  box-shadow: ${({ theme }) => theme.shadows.base};
`

const MainImage = styled.div`
  height: 34rem;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(4, 16, 28, 0.78) 100%);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 24rem;
  }
`

const ThumbnailRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Thumbnail = styled.button`
  height: 5.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ $active }) =>
    $active ? 'rgba(135, 237, 246, 0.3)' : 'rgba(180, 224, 241, 0.08)'};
  background:
    linear-gradient(180deg, rgba(4, 16, 28, 0.1), rgba(4, 16, 28, 0.55)),
    url('${({ $image }) => $image}') center/cover no-repeat;
  box-shadow: ${({ $active, theme }) => ($active ? theme.shadows.glow : 'none')};
`

const Summary = styled(motion.aside)`
  position: sticky;
  top: 7.2rem;
  align-self: start;
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(8, 29, 44, 0.92);
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
  }

  h1 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[3]}`};
    font-size: clamp(2.6rem, 6vw, 4rem);
  }
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[5]};

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.55rem 0.85rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: ${({ theme }) => theme.colors.neutral[200]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const PricePanel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: ${({ theme }) => `${theme.spacing[5]} 0`};
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: linear-gradient(180deg, rgba(88, 199, 212, 0.12), rgba(8, 29, 44, 0.16));
  border: 1px solid rgba(135, 237, 246, 0.12);

  .row {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.neutral[200]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  .row strong {
    color: ${({ theme }) => theme.colors.neutral.white};
  }
`

const Actions = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[5]};
`

const Details = styled.section`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: grid;
  gap: ${({ theme }) => theme.spacing[6]};
`

const DetailCard = styled(motion.article)`
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(8, 29, 44, 0.74);
  box-shadow: ${({ theme }) => theme.shadows.base};

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    font-size: clamp(2rem, 4vw, 2.8rem);
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[300]};
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Feature = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(180, 224, 241, 0.08);

  strong {
    display: block;
    margin-top: ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[300]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  svg {
    color: ${({ theme }) => theme.colors.secondary.light};
  }
`

const Amenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};

  span {
    padding: 0.55rem 0.85rem;
    border-radius: 999px;
    background: rgba(99, 211, 223, 0.08);
    color: ${({ theme }) => theme.colors.secondary.light};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const EmptyState = styled.div`
  width: min(720px, calc(100% - 2rem));
  margin: 0 auto;
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(8, 29, 44, 0.8);
`

const RoomDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { rooms } = useBooking()
  const [activeImage, setActiveImage] = useState(0)
  const [room, setRoom] = useState(null)

  useEffect(() => {
    if (!id) return
    const selectedRoom = rooms.find((item) => item.id === Number(id))
    setRoom(selectedRoom || null)
    setActiveImage(0)
  }, [id, rooms])

  if (!room) {
    return (
      <PageShell>
        <MarineElements density="light" divingTheme />
        <EmptyState>
          <span className="eyebrow">Appartement introuvable</span>
          <h2 style={{ marginTop: '1rem' }}>Cette fiche n est plus disponible.</h2>
          <p style={{ margin: '1rem 0 2rem', color: '#d3e0ea' }}>
            L appartement demande ne correspond a aucune entree actuelle. Vous pouvez revenir a la liste.
          </p>
          <Link to="/rooms" className="btn btn-primary">
            Retour aux appartements
          </Link>
        </EmptyState>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <MarineElements density="normal" divingTheme />

      <Inner>
        <TopBar>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            Retour
          </BackButton>
          <Availability $available={room.available}>
            <Waves size={14} />
            {room.available ? 'Disponible' : 'Indisponible'}
          </Availability>
        </TopBar>

        <MainGrid>
          <Gallery
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <MainImage style={{ backgroundImage: `url(${room.images[activeImage]})` }} />
            <ThumbnailRow>
              {room.images.slice(0, 5).map((image, index) => (
                <Thumbnail
                  key={`${room.id}-${index}`}
                  $active={activeImage === index}
                  $image={image}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </ThumbnailRow>

            <Details>
              <DetailCard
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
              >
                <h2>Esprit du lieu</h2>
                <p>{room.description}</p>
              </DetailCard>

              <DetailCard
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                viewport={{ once: true }}
              >
                <h2>Configuration</h2>
                <FeatureGrid>
                  <Feature>
                    <Users size={20} />
                    <strong>Capacité</strong>
                    <span>Jusqu a {room.capacity} voyageurs</span>
                  </Feature>
                  <Feature>
                    <BedDouble size={20} />
                    <strong>Format</strong>
                    <span>{room.type} · {room.size}</span>
                  </Feature>
                  <Feature>
                    <Bath size={20} />
                    <strong>Confort</strong>
                    <span>Equipements premium et espaces de vie soignes</span>
                  </Feature>
                </FeatureGrid>
              </DetailCard>

              <DetailCard
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                viewport={{ once: true }}
              >
                <h2>Equipements</h2>
                <Amenities>
                  {room.amenities.map((amenity) => (
                    <span key={amenity}>{amenity}</span>
                  ))}
                </Amenities>
              </DetailCard>
            </Details>
          </Gallery>

          <Summary
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <span className="eyebrow">{room.type}</span>
            <h1>{room.name}</h1>
            <Meta>
              <span>
                <Users size={14} />
                {room.capacity} personnes
              </span>
              <span>
                <MapPin size={14} />
                {room.size}
              </span>
              <span>
                <Compass size={14} />
                Vue et rythme Banyuls
              </span>
            </Meta>

            <p style={{ color: '#d3e0ea' }}>
              Une fiche plus claire pour comprendre rapidement le ton du logement,
              ses usages et son niveau de prix avant de reserver.
            </p>

            <PricePanel>
              <div className="row">
                <span>Basse saison</span>
                <strong>{room.price.lowSeason}€/semaine</strong>
              </div>
              <div className="row">
                <span>Moyenne saison</span>
                <strong>{room.price.midSeason}€/semaine</strong>
              </div>
              <div className="row">
                <span>Haute saison</span>
                <strong>{room.price.highSeason}€/semaine</strong>
              </div>
            </PricePanel>

            <Actions>
              <Link to={`/booking/${room.id}`} className="btn btn-primary">
                <Calendar size={18} />
                Faire une demande
              </Link>
              {room.plan && (
                <a href={room.plan} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Download size={18} />
                  Voir le plan
                </a>
              )}
              <Link to="/contact" className="btn btn-outline">
                Nous contacter
              </Link>
            </Actions>
          </Summary>
        </MainGrid>
      </Inner>
    </PageShell>
  )
}

export default RoomDetail
