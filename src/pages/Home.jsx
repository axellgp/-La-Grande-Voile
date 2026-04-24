import React from 'react'
import styled from 'styled-components'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Calendar,
  ChevronRight,
  Compass,
  Fish,
  MapPin,
  Phone,
  Sailboat,
  Shield,
  Star,
  Users,
  Waves,
} from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { heroImages } from '../assets/images'
import { getPublicImagePath } from '../utils/imageUtils'
import { MarineElements } from '../components/MarineElements'

const HomeShell = styled.div`
  position: relative;
  overflow: hidden;
`

const Hero = styled.section`
  position: relative;
  min-height: 100vh;
  padding: clamp(7rem, 12vw, 9rem) 0 ${({ theme }) => theme.spacing[16]};
  overflow: hidden;
`

const HeroBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background:
    ${({ theme }) => theme.colors.gradients.hero},
    url('${heroImages[0]}') center/cover no-repeat;
`

const HeroSurface = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(135, 237, 246, 0.22), transparent 28%),
    radial-gradient(circle at 80% 18%, rgba(246, 197, 119, 0.18), transparent 20%),
    linear-gradient(180deg, rgba(6, 24, 38, 0.2), rgba(6, 24, 38, 0.78));
`

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  width: min(1320px, calc(100% - 2rem));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const HeroCopy = styled(motion.div)`
  max-width: 42rem;

  h1 {
    margin: ${({ theme }) => `${theme.spacing[5]} 0 ${theme.spacing[5]}`};
    max-width: 12ch;
  }

  .lead {
    max-width: 40rem;
    font-size: clamp(1.05rem, 1.8vw, 1.22rem);
    color: ${({ theme }) => theme.colors.neutral[100]};
    opacity: 0.92;
  }
`

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(18px);

  strong {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[300]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const HeroVisual = styled(motion.div)`
  position: relative;
  min-height: 40rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 34rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 28rem;
  }
`

const MainVisual = styled.div`
  position: absolute;
  inset: 8% 10% 8% 8%;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  background:
    linear-gradient(180deg, rgba(4, 21, 33, 0.08), rgba(4, 21, 33, 0.68)),
    url('${getPublicImagePath('images/marine/underwater.jpg')}') center/cover no-repeat;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 20%, rgba(2, 11, 19, 0.85) 100%);
  }
`

const FloatingCard = styled(motion.div)`
  position: absolute;
  width: min(18rem, 44%);
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(8, 29, 44, 0.84);
  backdrop-filter: blur(22px);
  box-shadow: ${({ theme }) => theme.shadows.base};

  strong {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[1]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[300]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  &.top {
    top: 0;
    right: 2%;
  }

  &.bottom {
    left: 0;
    bottom: 3%;
  }
`

const Section = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing[20]} 0;
`

const SectionInner = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
`

const SectionHead = styled(motion.div)`
  max-width: 40rem;
  margin-bottom: ${({ theme }) => theme.spacing[10]};

  h2 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[300]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const ExperienceCard = styled(motion.article)`
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: ${({ theme }) => theme.colors.surface.card};
  box-shadow: ${({ theme }) => theme.shadows.base};

  .icon {
    width: 3.5rem;
    height: 3.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    border-radius: 1.2rem;
    color: ${({ theme }) => theme.colors.neutral.white};
    background: ${({ theme }) => theme.colors.gradients.button};
  }

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    font-size: clamp(1.8rem, 3vw, 2.3rem);
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[300]};
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
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  box-shadow: ${({ theme }) => theme.shadows.base};

  .image {
    height: 18rem;
    background-position: center;
    background-size: cover;
    position: relative;
  }

  .image::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 25%, rgba(4, 16, 28, 0.78) 100%);
  }

  .status {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
    padding: 0.45rem 0.8rem;
    border-radius: 999px;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(8, 29, 44, 0.7);
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  .content {
    padding: ${({ theme }) => theme.spacing[6]};
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[2]};
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
  }

  .meta span,
  .tag {
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: ${({ theme }) => theme.colors.neutral[200]};
    font-size: 0.78rem;
  }

  .tag {
    color: ${({ theme }) => theme.colors.secondary.light};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[300]};
    margin-bottom: ${({ theme }) => theme.spacing[5]};
  }

  .actions {
    display: flex;
    gap: ${({ theme }) => theme.spacing[3]};
    flex-wrap: wrap;
  }
`

const HighlightBand = styled.section`
  padding: ${({ theme }) => theme.spacing[8]} 0 ${({ theme }) => theme.spacing[20]};
`

const HighlightPanel = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[7]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: linear-gradient(135deg, rgba(8, 29, 44, 0.96), rgba(18, 70, 103, 0.88));
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const HighlightMedia = styled.div`
  min-height: 26rem;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background:
    linear-gradient(180deg, rgba(4, 16, 28, 0.14), rgba(4, 16, 28, 0.76)),
    url('${getPublicImagePath('images/marine/diver.jpg')}') center/cover no-repeat;
  box-shadow: ${({ theme }) => theme.shadows.base};
`

const HighlightCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[200]};
    margin-bottom: ${({ theme }) => theme.spacing[5]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`

const Points = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`

const Point = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(180, 224, 241, 0.08);

  .icon {
    width: 2.75rem;
    height: 2.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.9rem;
    background: rgba(255, 255, 255, 0.08);
    color: ${({ theme }) => theme.colors.secondary.light};
  }

  strong {
    display: block;
    margin-bottom: 0.35rem;
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[300]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const TestimonialCard = styled(motion.blockquote)`
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(18px);

  .stars {
    display: flex;
    gap: 0.35rem;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.accent.gold};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[200]};
    margin-bottom: ${({ theme }) => theme.spacing[5]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  footer {
    color: ${({ theme }) => theme.colors.neutral[400]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const FinalCTA = styled.section`
  padding: 0 0 ${({ theme }) => theme.spacing[20]};
`

const FinalPanel = styled(motion.div)`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background:
    radial-gradient(circle at top left, rgba(246, 197, 119, 0.12), transparent 22%),
    radial-gradient(circle at 80% 20%, rgba(88, 199, 212, 0.18), transparent 28%),
    rgba(8, 29, 44, 0.92);
  box-shadow: ${({ theme }) => theme.shadows.lg};
  text-align: center;

  h2 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
  }

  p {
    max-width: 42rem;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.neutral[200]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  .actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
    margin-top: ${({ theme }) => theme.spacing[6]};
  }
`

const features = [
  {
    icon: <MapPin size={20} />,
    title: 'La baie comme decor quotidien',
    description:
      'Depuis la residence, on bascule en quelques minutes entre plage, port, restaurants et sentiers de la Cote Vermeille.',
  },
  {
    icon: <Fish size={20} />,
    title: 'Un vrai terrain de jeu pour la plongee',
    description:
      'Le theme mer et plongee ne sert pas juste le style : il raconte la reserve marine et l energie sous-marine de Banyuls.',
  },
  {
    icon: <Sailboat size={20} />,
    title: 'Des appartements pensés pour durer dans la memoire',
    description:
      'Terrasses, vues, grands volumes et rythme mediterraneen : chaque sejour doit donner l impression d embarquer.',
  },
]

const immersionPoints = [
  {
    icon: <Compass size={18} />,
    title: 'Reserve marine a quelques minutes',
    text: 'Snorkeling, plongee bouteille, photo sous-marine et sorties accompagnees autour de Banyuls-Cerbère.',
  },
  {
    icon: <Shield size={18} />,
    title: 'Parcours de reservation plus clair',
    text: 'Navigation, filtres, detail des appartements et appels a l action ont ete realignes pour reduire les frictions.',
  },
  {
    icon: <Users size={18} />,
    title: 'Du duo jusqu a la grande tribu',
    text: 'Des formats T2 a T5/6 pour des escapades romantiques, des semaines familiales ou des sejours entre amis.',
  },
]

const testimonials = [
  {
    quote:
      'La sensation est immediate : on arrive, on ralentit, puis on profite de la mer du matin au soir.',
    author: 'Claire et Martin, Toulouse',
  },
  {
    quote:
      'Le cadre est elegant sans etre froid. On sent Banyuls, la plongee, la lumiere et le cote residence de caractere.',
    author: 'Lucie, Lyon',
  },
  {
    quote:
      'La vue, la fluidite du parcours et les infos utiles donnent envie de reserver sans hesitation.',
    author: 'Hugo et Ines, Montpellier',
  },
]

const Home = () => {
  const { rooms, hotelSettings } = useBooking()
  const { scrollY } = useScroll()
  const heroOffset = useTransform(scrollY, [0, 420], [0, -70])
  const visualOffset = useTransform(scrollY, [0, 420], [0, 45])

  const featuredRooms = rooms.filter((room) => room.featured).slice(0, 3)
  const displayedRooms = featuredRooms.length ? featuredRooms : rooms.slice(0, 3)
  const availableRooms = rooms.filter((room) => room.available).length
  const startingPrice = rooms.length
    ? Math.min(...rooms.map((room) => room.price.lowSeason))
    : 0
  const maxCapacity = rooms.length
    ? Math.max(...rooms.map((room) => room.capacity))
    : 0

  return (
    <HomeShell>
      <Hero>
        <HeroBackdrop />
        <HeroSurface />
        <MarineElements density="heavy" divingTheme />

        <HeroInner>
          <HeroCopy
            style={{ y: heroOffset }}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <span className="eyebrow">Séjour mer & plongée</span>
            <h1>Une residence inspiree par la baie, la lumière et les fonds marins.</h1>
            <p className="lead">
              La Grande Voile se repositionne comme une adresse plus immersive, plus
              fluide et plus premium a Banyuls-sur-Mer : design oceane, transitions
              douces, navigation claire et reservation recentree sur l experience.
            </p>

            <HeroActions>
              <Link to="/reservation" className="btn btn-primary">
                <Calendar size={18} />
                Reserver votre sejour
              </Link>
              <Link to="/rooms" className="btn btn-secondary">
                Explorer les appartements
                <ChevronRight size={18} />
              </Link>
            </HeroActions>

            <StatsRow>
              <StatCard initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                <strong>{availableRooms || rooms.length}</strong>
                <span>appartements disponibles a explorer</span>
              </StatCard>
              <StatCard initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
                <strong>{startingPrice}€</strong>
                <span>a partir de la basse saison par semaine</span>
              </StatCard>
              <StatCard initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
                <strong>{maxCapacity}</strong>
                <span>voyageurs pour la plus grande configuration</span>
              </StatCard>
            </StatsRow>
          </HeroCopy>

          <HeroVisual
            style={{ y: visualOffset }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18 }}
          >
            <MainVisual />

            <FloatingCard
              className="top"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <strong>Ambiance reserve marine</strong>
              <span>Textures d eau, profondeur bleue, reflets et rythme apaisé.</span>
            </FloatingCard>

            <FloatingCard
              className="bottom"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <strong>Banyuls au centre</strong>
              <span>{hotelSettings.address}</span>
            </FloatingCard>
          </HeroVisual>
        </HeroInner>
      </Hero>

      <Section>
        <SectionInner>
          <SectionHead
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">Nouveau cap visuel</span>
            <h2>Un theme entierement recentré sur la mer, la plongee et la sensation de fluidite.</h2>
            <p>
              Le site ne cherche plus seulement a informer. Il doit donner envie de
              plonger dans l atmosphere de Banyuls, de comprendre vite l offre et de
              circuler sans accrocs jusqu a la reservation.
            </p>
          </SectionHead>

          <ExperienceGrid>
            {features.map((feature, index) => (
              <ExperienceCard
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </ExperienceCard>
            ))}
          </ExperienceGrid>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <SectionHead
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">Appartements signature</span>
            <h2>Des logements choisis pour leur présence, leur vue et leur potentiel d immersion.</h2>
            <p>
              On met en avant les espaces les plus marquants avec plus de lisibilite
              sur la capacité, la terrasse, la vue et les prix pour mieux comparer.
            </p>
          </SectionHead>

          <RoomsGrid>
            {displayedRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div
                  className="image"
                  style={{ backgroundImage: `url(${room.images[0]})` }}
                >
                  <div className="status">{room.available ? 'Disponible' : 'Complet'}</div>
                </div>
                <div className="content">
                  <span className="tag">{room.type}</span>
                  <h3>{room.name}</h3>
                  <div className="meta">
                    <span>{room.capacity} voyageurs</span>
                    <span>{room.size}</span>
                    <span>{room.price.lowSeason}€ basse saison</span>
                  </div>
                  <p>{room.description}</p>
                  <div className="actions">
                    <Link to={`/rooms/${room.id}`} className="btn btn-secondary">
                      Voir le detail
                    </Link>
                    <Link to={`/booking/${room.id}`} className="btn btn-primary">
                      Reserver
                    </Link>
                  </div>
                </div>
              </RoomCard>
            ))}
          </RoomsGrid>
        </SectionInner>
      </Section>

      <HighlightBand>
        <HighlightPanel>
          <HighlightMedia />
          <HighlightCopy>
            <span className="eyebrow">Mer & profondeur</span>
            <h2>La plongee devient une vraie composante du recit de marque.</h2>
            <p>
              Banyuls n est pas seulement une station au bord de l eau. C est une
              porte d entree vers les reserves, les sentiers sous-marins et une
              biodiversite qui donne une identite forte au sejour.
            </p>

            <Points>
              {immersionPoints.map((item, index) => (
                <Point
                  key={item.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="icon">{item.icon}</div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </Point>
              ))}
            </Points>
          </HighlightCopy>
        </HighlightPanel>
      </HighlightBand>

      <Section>
        <SectionInner>
          <SectionHead
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">Retour d impression</span>
            <h2>Une ambiance plus calme, plus premium, mais toujours accessible.</h2>
            <p>
              L objectif du redesign est simple : garder l authenticite du lieu tout
              en donnant une sensation plus professionnelle et mieux travaillée.
            </p>
          </SectionHead>

          <TestimonialGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={16} fill="currentColor" />
                  ))}
                </div>
                <p>“{testimonial.quote}”</p>
                <footer>{testimonial.author}</footer>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </SectionInner>
      </Section>

      <FinalCTA>
        <FinalPanel
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">Passer a l action</span>
          <h2>Prêt a faire respirer le site comme une vraie adresse bord de mer ?</h2>
          <p>
            La navigation est maintenant plus nette, les sections plus utiles et les
            appels a l action mieux relies aux vrais parcours. Il ne reste plus qu a
            choisir l appartement qui vous ressemble.
          </p>
          <div className="actions">
            <Link to="/rooms" className="btn btn-secondary">
              <Waves size={18} />
              Parcourir les appartements
            </Link>
            <Link to="/contact" className="btn btn-outline">
              <Phone size={18} />
              Nous contacter
            </Link>
            <Link to="/reservation" className="btn btn-accent">
              <Calendar size={18} />
              Envoyer une demande
            </Link>
          </div>
        </FinalPanel>
      </FinalCTA>
    </HomeShell>
  )
}

export default Home
