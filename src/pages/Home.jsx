import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Compass, MapPin, Sparkles, Waves } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

const Page = styled.div`
  padding-top: 7rem;
`

const Hero = styled.section`
  padding: ${({ theme }) => `${theme.spacing[10]} 0 ${theme.spacing[16]}`};
`

const HeroGrid = styled.div`
  width: min(1280px, calc(100% - 2rem));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
  gap: ${({ theme }) => theme.spacing[8]};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const HeroCopy = styled(motion.div)`
  .lead {
    max-width: 40rem;
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.neutral[700]};
  }

  .description {
    max-width: 38rem;
    color: ${({ theme }) => theme.colors.neutral[600]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  h1 {
    margin-top: ${({ theme }) => theme.spacing[5]};
    max-width: 12ch;
  }
`

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`

const Announcement = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  color: ${({ theme }) => theme.colors.neutral[600]};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  strong {
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`

const HeroVisual = styled(motion.div)`
  position: relative;
  min-height: 40rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 30rem;
  }
`

const MainImage = styled.div`
  position: absolute;
  inset: 0 10% 8% 0;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background:
    linear-gradient(180deg, rgba(18, 58, 99, 0.08), rgba(18, 58, 99, 0.18)),
    url('${({ $image }) => $image}') center/cover no-repeat;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`

const FloatingImage = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: min(18rem, 42%);
  height: 15rem;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background:
    linear-gradient(180deg, rgba(18, 58, 99, 0.04), rgba(18, 58, 99, 0.14)),
    url('${({ $image }) => $image}') center/cover no-repeat;
  border: 0.5rem solid rgba(255, 255, 255, 0.9);
  box-shadow: ${({ theme }) => theme.shadows.lg};
`

const InfoCard = styled.div`
  position: absolute;
  left: 1.5rem;
  bottom: 1.5rem;
  max-width: 20rem;
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  strong {
    display: block;
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[600]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[16]} 0;
`

const SectionInner = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
`

const SectionHead = styled(motion.div)`
  max-width: 42rem;
  margin-bottom: ${({ theme }) => theme.spacing[8]};

  h2 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.neutral[600]};
  }
`

const AnnouncementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const AnnouncementCard = styled(motion.article)`
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[600]};
  }
`

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const RoomCard = styled(motion.article)`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  .image {
    height: 18rem;
    background-position: center;
    background-size: cover;
  }

  .body {
    padding: ${({ theme }) => theme.spacing[6]};
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[2]};
    margin: ${({ theme }) => `${theme.spacing[3]} 0 ${theme.spacing[4]}`};
  }

  .meta span {
    padding: 0.5rem 0.8rem;
    border-radius: 999px;
    background: rgba(18, 58, 99, 0.06);
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[600]};
    margin-bottom: ${({ theme }) => theme.spacing[5]};
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const ActivityCard = styled(motion.article)`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  .image {
    height: 16rem;
    background-position: center;
    background-size: cover;
  }

  .body {
    padding: ${({ theme }) => theme.spacing[6]};
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.accent.warm || 'rgba(18, 58, 99, 0.06)'};
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[600]};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
`

const DestinationGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const DestinationLarge = styled(motion.article)`
  min-height: 32rem;
  padding: ${({ theme }) => theme.spacing[7]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background:
    linear-gradient(180deg, rgba(18, 58, 99, 0.08), rgba(18, 58, 99, 0.16)),
    url('${({ $image }) => $image}') center/cover no-repeat;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  align-items: flex-end;

  .panel {
    max-width: 30rem;
    padding: ${({ theme }) => theme.spacing[5]};
    border-radius: ${({ theme }) => theme.radii['2xl']};
    background: rgba(255, 255, 255, 0.92);
  }
`

const DestinationSmallGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[5]};
`

const DestinationSmall = styled(motion.article)`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  .image {
    height: 13rem;
    background-position: center;
    background-size: cover;
  }

  .body {
    padding: ${({ theme }) => theme.spacing[5]};
  }
`

const FinalPanel = styled(motion.div)`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto ${({ theme }) => theme.spacing[16]};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background: ${({ theme }) => theme.colors.gradients.cta};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  text-align: center;

  h2,
  p {
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  p {
    max-width: 40rem;
    margin: ${({ theme }) => `${theme.spacing[4]} auto 0`};
    opacity: 0.92;
  }

  .actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
    margin-top: ${({ theme }) => theme.spacing[6]};
  }
`

const Home = () => {
  const { rooms, siteContent, hotelSettings } = useBooking()
  const featuredRooms = rooms.filter((room) => room.featured).slice(0, 3)
  const displayedRooms = featuredRooms.length ? featuredRooms : rooms.slice(0, 3)
  const primaryDestination = siteContent.banyulsHighlights[0]
  const otherDestinations = siteContent.banyulsHighlights.slice(1)

  return (
    <Page>
      <Hero>
        <HeroGrid>
          <HeroCopy
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">{siteContent.hero.eyebrow}</span>
            <h1>{siteContent.hero.title}</h1>
            <p className="lead">{siteContent.hero.subtitle}</p>
            <p className="description">{siteContent.hero.description}</p>

            <HeroActions>
              <Link to="/rooms" className="btn btn-primary">
                <Compass size={18} />
                {siteContent.hero.primaryCta}
              </Link>
              <Link to="/reservation" className="btn btn-secondary">
                <Calendar size={18} />
                {siteContent.hero.secondaryCta}
              </Link>
            </HeroActions>

            <Announcement>
              <Sparkles size={16} />
              <strong>{siteContent.hero.announcementLabel}</strong>
              <span>{siteContent.hero.announcementText}</span>
            </Announcement>
          </HeroCopy>

          <HeroVisual
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <MainImage $image={siteContent.hero.backgroundImage} />
            <FloatingImage $image={siteContent.hero.foregroundImage} />
            <InfoCard>
              <strong>{hotelSettings.name}</strong>
              <span>{hotelSettings.tagline}</span>
            </InfoCard>
          </HeroVisual>
        </HeroGrid>
      </Hero>

      <Section>
        <SectionInner>
          <SectionHead
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">Ce qui change</span>
            <h2>Un site plus luxe, plus clair et plus ancre dans le vrai Banyuls.</h2>
            <p>
              La presentation ne repose plus sur des cartes generiques. Elle valorise
              maintenant la residence, la baie, les activites reelles et des annonces
              que vous pourrez modifier depuis le menu admin.
            </p>
          </SectionHead>

          <AnnouncementGrid>
            {siteContent.featuredAnnouncements.map((item, index) => (
              <AnnouncementCard
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </AnnouncementCard>
            ))}
          </AnnouncementGrid>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <SectionHead
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">Appartements</span>
            <h2>Des appartements qui portent vraiment la promesse de la residence.</h2>
            <p>
              Volume, terrasse, vue et capacite sont mis en avant pour rendre la
              comparaison plus naturelle et plus chic.
            </p>
          </SectionHead>

          <RoomsGrid>
            {displayedRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="image" style={{ backgroundImage: `url(${room.images[0]})` }} />
                <div className="body">
                  <span className="eyebrow">{room.type}</span>
                  <h3>{room.name}</h3>
                  <div className="meta">
                    <span>{room.capacity} voyageurs</span>
                    <span>{room.size}</span>
                    <span>dès {room.price.lowSeason} EUR/semaine</span>
                  </div>
                  <p>{room.description}</p>
                  <div className="actions">
                    <Link to={`/rooms/${room.id}`} className="btn btn-secondary">
                      Voir le detail
                    </Link>
                    <Link to={`/booking/${room.id}`} className="btn btn-outline">
                      Reserver
                    </Link>
                  </div>
                </div>
              </RoomCard>
            ))}
          </RoomsGrid>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <SectionHead
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">{siteContent.activitiesIntro.eyebrow}</span>
            <h2>{siteContent.activitiesIntro.title}</h2>
            <p>{siteContent.activitiesIntro.description}</p>
          </SectionHead>

          <ActivitiesGrid>
            {siteContent.activities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="image" style={{ backgroundImage: `url(${activity.image})` }} />
                <div className="body">
                  <span className="badge">
                    <Waves size={12} />
                    {activity.badge}
                  </span>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <span style={{ color: '#123a63', fontWeight: 600 }}>{activity.highlight}</span>
                </div>
              </ActivityCard>
            ))}
          </ActivitiesGrid>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <SectionHead
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">{siteContent.banyulsIntro.eyebrow}</span>
            <h2>{siteContent.banyulsIntro.title}</h2>
            <p>{siteContent.banyulsIntro.description}</p>
          </SectionHead>

          {primaryDestination && (
            <DestinationGrid>
              <DestinationLarge
                $image={primaryDestination.image}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="panel">
                  <span className="eyebrow">
                    <MapPin size={12} />
                    Banyuls-sur-Mer
                  </span>
                  <h3 style={{ margin: '1rem 0 0.75rem' }}>{primaryDestination.title}</h3>
                  <p>{primaryDestination.text}</p>
                </div>
              </DestinationLarge>

              <DestinationSmallGrid>
                {otherDestinations.map((item, index) => (
                  <DestinationSmall
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="image" style={{ backgroundImage: `url(${item.image})` }} />
                    <div className="body">
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </DestinationSmall>
                ))}
              </DestinationSmallGrid>
            </DestinationGrid>
          )}
        </SectionInner>
      </Section>

      <FinalPanel
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="eyebrow" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.1)' }}>
          Sejour sur mesure
        </span>
        <h2>Une presentation plus premium, et des contenus que vous pourrez vraiment personnaliser.</h2>
        <p>
          Photos de Banyuls, annonces, activites et ambiance generale peuvent maintenant
          evoluer depuis l admin pour garder un site vivant, moins artificiel et plus juste.
        </p>
        <div className="actions">
          <Link to="/contact" className="btn btn-secondary">
            Nous contacter
          </Link>
          <Link to="/reservation" className="btn btn-accent">
            <ArrowRight size={18} />
            Demander un sejour
          </Link>
        </div>
      </FinalPanel>
    </Page>
  )
}

export default Home
