import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Star, Users, Wifi, Car, Coffee, Heart, ChevronRight, Phone, Waves, Mountain, Grape, Compass, Sailboat, Camera } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { getPublicImagePath } from '../utils/imageUtils'

import { useBooking } from '../context/BookingContext'
import { heroImages } from '../assets/images'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const HomePage = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
`

const HeroSection = styled.section`
  position: relative;
  height: 120vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 100vh;
  }
`

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  
  .swiper {
    height: 100%;
    width: 100%;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.7);
    width: 12px;
    height: 12px;
  }

  .swiper-pagination-bullet-active {
    background: ${props => props.theme.colors.accent.gold};
  }
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    135deg,
    rgba(30, 58, 138, 0.7) 0%,
    rgba(14, 165, 233, 0.5) 50%,
    rgba(245, 158, 11, 0.6) 100%
  );
`

const HeroContent = styled(motion.div)`
  text-align: center;
  color: ${props => props.theme.colors.neutral.white};
  max-width: 800px;
  padding: 0 ${props => props.theme.spacing[4]};
  z-index: 1;

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: ${props => props.theme.fontWeights.bold};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.neutral.white};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.1;
  }

  .subtitle {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    margin-bottom: ${props => props.theme.spacing[8]};
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    line-height: 1.4;
  }

  .hero-buttons {
    display: flex;
    gap: ${props => props.theme.spacing[4]};
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      flex-direction: column;
      align-items: center;
    }
  }
`

const HeroButton = styled(motion.div)`
  .btn {
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
    font-size: ${props => props.theme.fontSizes.lg};
    font-weight: ${props => props.theme.fontWeights.semibold};
    border-radius: ${props => props.theme.radii['2xl']};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    transition: all ${props => props.theme.transitions.normal};
    text-decoration: none;
    box-shadow: ${props => props.theme.shadows.lg};

    @media (max-width: 768px) {
      padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
      font-size: ${props => props.theme.fontSizes.md};
      width: 100%;
      justify-content: center;
      max-width: 280px;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: ${props => props.theme.shadows.xl};

      @media (max-width: 768px) {
        transform: translateY(-2px);
      }
    }
  }

  .btn-primary {
    background: linear-gradient(135deg, ${props => props.theme.colors.accent.gold}, ${props => props.theme.colors.accent.coral});
    color: ${props => props.theme.colors.neutral.white};
    border: none;

    &:hover {
      background: linear-gradient(135deg, ${props => props.theme.colors.accent.coral}, ${props => props.theme.colors.accent.terracotta});
      color: ${props => props.theme.colors.neutral.white};
    }
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.9);
    color: ${props => props.theme.colors.primary.main};
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);

    &:hover {
      background: ${props => props.theme.colors.neutral.white};
      border-color: ${props => props.theme.colors.accent.gold};
      color: ${props => props.theme.colors.primary.main};
    }
  }
`

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${props => props.theme.spacing[8]};
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.theme.colors.neutral.white};
  text-align: center;
  cursor: pointer;

  .scroll-text {
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: ${props => props.theme.spacing[2]};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  .scroll-arrow {
    width: 2px;
    height: 30px;
    background: rgba(255, 255, 255, 0.7);
    margin: 0 auto;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 8px;
      height: 8px;
      border-right: 2px solid rgba(255, 255, 255, 0.7);
      border-bottom: 2px solid rgba(255, 255, 255, 0.7);
      transform: translateX(-50%) rotate(45deg);
      animation: bounce 2s infinite;
    }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0) rotate(45deg);
    }
    40% {
      transform: translateX(-50%) translateY(-10px) rotate(45deg);
    }
    60% {
      transform: translateX(-50%) translateY(-5px) rotate(45deg);
    }
  }
`

const Section = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  position: relative;

  &.dark {
    background: linear-gradient(135deg, ${props => props.theme.colors.neutral[900]}, ${props => props.theme.colors.primary.main});
    color: ${props => props.theme.colors.neutral.white};
  }

  &.light {
    background: ${props => props.theme.colors.neutral[50]};
  }

  &.primary {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
    color: ${props => props.theme.colors.neutral.white};
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[16]};

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: ${props => props.theme.spacing[6]};
    color: inherit;
  }

  .subtitle {
    font-size: ${props => props.theme.fontSizes.xl};
    color: inherit;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing[8]};
  margin-top: ${props => props.theme.spacing[12]};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[6]};
    margin-top: ${props => props.theme.spacing[8]};
  }
`

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.radii['2xl']};
  padding: ${props => props.theme.spacing[8]};
  text-align: center;
  transition: all ${props => props.theme.transitions.normal};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing[6]};
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    border-color: ${props => props.theme.colors.accent.gold};

    @media (max-width: 768px) {
      transform: translateY(-3px);
    }
  }

  .icon {
    width: 60px;
    height: 60px;
    margin: 0 auto ${props => props.theme.spacing[6]};
    background: linear-gradient(135deg, ${props => props.theme.colors.accent.gold}, ${props => props.theme.colors.accent.coral});
    border-radius: ${props => props.theme.radii.full};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.neutral.white};

    @media (max-width: 768px) {
      width: 50px;
      height: 50px;
      margin-bottom: ${props => props.theme.spacing[4]};
    }
  }

  h3 {
    color: inherit;
    margin-bottom: ${props => props.theme.spacing[4]};

    @media (max-width: 768px) {
      font-size: ${props => props.theme.fontSizes.lg};
      margin-bottom: ${props => props.theme.spacing[3]};
    }
  }

  p {
    color: inherit;
    opacity: 0.9;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }
`

const RoomsPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing[8]};
`

const RoomCard = styled(motion.div)`
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.radii['2xl']};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }

  .image {
    height: 250px;
    background-size: cover;
    background-position: center;
    position: relative;

    .price {
      position: absolute;
      top: ${props => props.theme.spacing[4]};
      right: ${props => props.theme.spacing[4]};
      background: linear-gradient(135deg, ${props => props.theme.colors.accent.gold}, ${props => props.theme.colors.accent.coral});
      color: ${props => props.theme.colors.neutral.white};
      padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
      border-radius: ${props => props.theme.radii.full};
      font-weight: ${props => props.theme.fontWeights.bold};
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }

  .content {
    padding: ${props => props.theme.spacing[6]};

    h3 {
      color: ${props => props.theme.colors.neutral[900]};
      margin-bottom: ${props => props.theme.spacing[4]};
    }

    p {
      color: ${props => props.theme.colors.neutral[600]};
      margin-bottom: ${props => props.theme.spacing[6]};
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .amenities {
      display: flex;
      flex-wrap: wrap;
      gap: ${props => props.theme.spacing[2]};
      margin-bottom: ${props => props.theme.spacing[6]};

      .amenity {
        background: ${props => props.theme.colors.primary[50]};
        color: ${props => props.theme.colors.primary.main};
        padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
        border-radius: ${props => props.theme.radii.full};
        font-size: ${props => props.theme.fontSizes.sm};
      }
    }

    .btn {
      width: 100%;
      justify-content: center;
    }
  }
`

const TestimonialsSection = styled.div`
  margin-top: ${props => props.theme.spacing[16]};

  .swiper {
    padding: ${props => props.theme.spacing[8]} 0;
  }

  .swiper-slide {
    height: auto;
  }
`

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.radii['2xl']};
  padding: ${props => props.theme.spacing[8]};
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .quote {
    font-size: ${props => props.theme.fontSizes.lg};
    font-style: italic;
    margin-bottom: ${props => props.theme.spacing[6]};
    line-height: 1.6;
    color: inherit;
    opacity: 0.95;
  }

  .author {
    .name {
      font-weight: ${props => props.theme.fontWeights.semibold};
      color: ${props => props.theme.colors.accent.gold};
      margin-bottom: ${props => props.theme.spacing[1]};
    }

    .location {
      color: inherit;
      opacity: 0.8;
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }

  .stars {
    display: flex;
    justify-content: center;
    gap: ${props => props.theme.spacing[1]};
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.accent.gold};
  }
`

const BookingSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent.gold}, ${props => props.theme.colors.accent.coral});
  color: ${props => props.theme.colors.neutral.white};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    opacity: 0.1;
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`

const ActivitiesSection = styled.section`
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.main} 0%, 
    ${props => props.theme.colors.secondary.main} 50%,
    ${props => props.theme.colors.accent.coral} 100%
  );
  color: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing[20]} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 100'%3E%3Cpath d='M0,20 Q250,80 500,50 T1000,30 L1000,0 L0,0 Z' fill='%23ffffff'/%3E%3C/svg%3E") no-repeat center top;
    background-size: cover;
    z-index: 1;
  }

  .section-content {
    position: relative;
    z-index: 2;
  }
`

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing[8]};
  margin-top: ${props => props.theme.spacing[12]};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[6]};
  }
`

const ActivityCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.radii['2xl']};
  overflow: hidden;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .activity-image {
    position: relative;
    height: 200px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
    }

    @media (max-width: 768px) {
      height: 150px;
    }
  }

  .activity-icon {
    position: relative;
    z-index: 2;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.primary.main};
    box-shadow: ${props => props.theme.shadows.lg};

    @media (max-width: 768px) {
      width: 50px;
      height: 50px;
    }
  }

  .activity-content {
    padding: ${props => props.theme.spacing[6]};
    text-align: center;
    flex: 1;

    @media (max-width: 768px) {
      padding: ${props => props.theme.spacing[4]};
    }

    h4 {
      color: ${props => props.theme.colors.neutral.white};
      margin-bottom: ${props => props.theme.spacing[3]};
      font-size: ${props => props.theme.fontSizes.lg};

      @media (max-width: 768px) {
        font-size: ${props => props.theme.fontSizes.md};
      }
    }

    p {
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.6;
      margin-bottom: ${props => props.theme.spacing[4]};
      font-size: ${props => props.theme.fontSizes.sm};

      @media (max-width: 768px) {
        font-size: ${props => props.theme.fontSizes.xs};
        margin-bottom: ${props => props.theme.spacing[3]};
      }
    }
  }

  .icon {
    width: 60px;
    height: 60px;
    margin: 0 auto ${props => props.theme.spacing[4]};
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.accent.gold};
  }

  h3 {
    color: ${props => props.theme.colors.neutral.white};
    margin-bottom: ${props => props.theme.spacing[3]};
    font-size: ${props => props.theme.fontSizes.xl};
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[4]};
  }

  .btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: ${props => props.theme.colors.neutral.white};
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
    border-radius: ${props => props.theme.radii.full};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    transition: all ${props => props.theme.transitions.fast};

    @media (max-width: 768px) {
      padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[4]};
      font-size: ${props => props.theme.fontSizes.sm};
    }

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateX(5px);
    }
  }
`

const Home = () => {
  const { rooms } = useBooking()
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])

  const [aboutRef, aboutInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [roomsRef, roomsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [activitiesRef, activitiesInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  const features = [
    {
      icon: <MapPin size={24} />,
      title: 'Emplacement Idéal',
      description: 'Au cœur de Banyuls-sur-Mer, entre mer Méditerranée et vignobles en terrasses, à deux pas du port et des plages.',
    },
    {
      icon: <Heart size={24} />,
      title: 'Charme Authentique',
      description: 'Architecture catalane traditionnelle mêlée au confort moderne, dans l\'esprit authentique de la Côte Vermeille.',
    },
    {
      icon: <Star size={24} />,
      title: 'Service Excellence',
      description: 'Accueil personnalisé, conciergerie, et attention aux détails pour un séjour mémorable en Méditerranée.',
    },
  ]

  const activities = [
    {
      icon: <Waves size={30} />,
      title: 'Plongée Sous-Marine',
      description: 'Explorez la réserve marine de Banyuls-Cerbère, l\'une des plus belles de Méditerranée. Découvrez la vie sous-marine exceptionnelle.',
      link: '/activites/plongee',
      image: getPublicImagePath('images/marine/diver.jpg')
    },
    {
      icon: <Grape size={30} />,
      title: 'Œnotourisme',
      description: 'Dégustez les fameux vins de Banyuls AOC dans nos vignobles en terrasses face à la mer. Visites et dégustations organisées.',
      link: '/activites/vin',
      image: getPublicImagePath('images/banyuls/vineyards.jpg')
    },
    {
      icon: <Mountain size={30} />,
      title: 'Randonnées',
      description: 'Parcourez les sentiers du littoral et des Pyrénées catalanes. Vues panoramiques sur la Méditerranée et l\'Espagne.',
      link: '/activites/randonnee',
      image: getPublicImagePath('images/banyuls/coastline.jpg')
    },
    {
      icon: <Sailboat size={30} />,
      title: 'Navigation',
      description: 'Louez un voilier ou participez à nos sorties en mer. Découvrez la côte depuis les flots bleus de la Méditerranée.',
      link: '/activites/voile',
      image: getPublicImagePath('images/marine/sailing.jpg')
    },
    {
      icon: <Camera size={30} />,
      title: 'Patrimoine Culturel',
      description: 'Visitez les œuvres d\'Aristide Maillol, les tours Madeloc, et découvrez l\'histoire riche de Banyuls-sur-Mer.',
      link: '/activites/culture',
      image: getPublicImagePath('images/banyuls/port.jpg')
    },
    {
      icon: <Compass size={30} />,
      title: 'Excursions',
      description: 'Découvrez la Costa Brava espagnole, Collioure, Port-Vendres et tous les trésors de la Côte Vermeille.',
      link: '/activites/excursions',
      image: getPublicImagePath('images/banyuls/coastline.jpg')
    }
  ]

  const testimonials = [
    {
      quote: "Un séjour absolument magique ! La vue depuis notre chambre était à couper le souffle, et l'accueil chaleureux nous a fait nous sentir comme chez nous.",
      author: "Marie & Pierre Dubois",
      location: "Lyon, France",
      rating: 5,
    },
    {
      quote: "L'emplacement est parfait pour découvrir Banyuls et ses merveilles. Les vignobles, la mer, tout est accessible à pied. Service impeccable !",
      author: "Carlos & Isabella Rodriguez",
      location: "Barcelona, Espagne",
      rating: 5,
    },
    {
      quote: "Une escapade romantique parfaite ! Le coucher de soleil depuis la terrasse, le petit-déjeuner face à la mer... Des souvenirs inoubliables.",
      author: "Sophie Martin",
      location: "Toulouse, France",
      rating: 5,
    },
  ]

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <HomePage>
      {/* Hero Section */}
      <HeroSection>
          <HeroBackground>
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={0}
              slidesPerView={1}
              effect="fade"
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={true}
            >
              {heroImages.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
              ))}
            </Swiper>
          </HeroBackground>
          
          <HeroOverlay />
          
          <HeroContent
            style={{ y }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1>La Grande Voile</h1>
            <p className="subtitle">
              Votre havre de paix face à la Méditerranée à Banyuls-sur-Mer
              <br />
              Entre vignobles et mer, vivez l'authenticité catalane
            </p>
            
            <div className="hero-buttons">
              <HeroButton
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Link to="/reservation" className="btn btn-primary">
                  <Calendar size={20} />
                  Réserver maintenant
                </Link>
              </HeroButton>
              
              <HeroButton
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <Link to="/rooms" className="btn btn-secondary">
                  Découvrir nos appartements
                  <ChevronRight size={20} />
                </Link>
              </HeroButton>
            </div>
          </HeroContent>

          <ScrollIndicator
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={scrollToAbout}
          >
            <div className="scroll-text">Découvrir</div>
            <div className="scroll-arrow"></div>
          </ScrollIndicator>
      </HeroSection>

      {/* About Section */}
      <Section id="about" className="primary" ref={aboutRef}>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2>L'Art de Vivre Méditerranéen</h2>
            <p className="subtitle">
              Découvrez l'authenticité de Banyuls-sur-Mer dans notre hôtel de charme, 
              où tradition catalane et confort moderne s'harmonisent parfaitement.
            </p>
          </SectionHeader>

          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>

          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginTop: '4rem' }}
          >
            <h2>Activités à Proximité</h2>
            <p className="subtitle">
              Explorez les meilleures activités à faire à Banyuls-sur-Mer et ses environs,
              pour un séjour riche en découvertes et en émotions.
            </p>
          </SectionHeader>

          <ActivitiesGrid>
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div
                  className="activity-image"
                  style={{ backgroundImage: `url(${activity.image || getPublicImagePath('images/banyuls/coastline.jpg')})` }}
                >
                  <div className="activity-icon">
                    {activity.icon}
                  </div>
                </div>
                <div className="activity-content">
                  <h4>{activity.title}</h4>
                  <p>
                    {activity.description}
                  </p>
                  <Link to={activity.link} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    En savoir plus
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </ActivityCard>
            ))}
          </ActivitiesGrid>
        </Container>
      </Section>

      {/* Rooms Section */}
      <Section ref={roomsRef}>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            animate={roomsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2>Nos Chambres & Suites</h2>
            <p className="subtitle">
              Chaque chambre offre une expérience unique avec vue sur la mer ou les vignobles, 
              dans un cadre raffiné inspiré de l'art de vivre méditerranéen.
            </p>
          </SectionHeader>

          <RoomsPreview>
            {rooms.slice(0, 3).map((room, index) => (
              <RoomCard
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                animate={roomsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div 
                  className="image"
                  style={{ backgroundImage: `url(${room.images[0]})` }}
                >
                  <div className="price">€{room.price.midSeason}/semaine</div>
                </div>
                <div className="content">
                  <h3>{room.name}</h3>
                  <p>{room.description.substring(0, 120)}...</p>
                  <div className="amenities">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <span key={idx} className="amenity">{amenity}</span>
                    ))}
                  </div>
                  <Link to={`/rooms/${room.id}`} className="btn btn-primary">
                    Voir les détails
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </RoomCard>
            ))}
          </RoomsPreview>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/rooms" className="btn btn-outline">
              Voir toutes nos chambres
            </Link>
          </div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section className="dark" ref={testimonialsRef}>
        <Container>
          <SectionHeader
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2>Ils Ont Vécu l'Expérience</h2>
            <p className="subtitle">
              Découvrez les témoignages de nos hôtes qui ont savouré 
              l'art de vivre méditerranéen à La Grande Voile.
            </p>
          </SectionHeader>

          <TestimonialsSection>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard>
                    <div>
                      <div className="stars">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} fill="currentColor" />
                        ))}
                      </div>
                      <p className="quote">"{testimonial.quote}"</p>
                    </div>
                    <div className="author">
                      <div className="name">{testimonial.author}</div>
                      <div className="location">{testimonial.location}</div>
                    </div>
                  </TestimonialCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </TestimonialsSection>
        </Container>
      </Section>

      {/* CTA Section */}
      <BookingSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <h2 style={{ marginBottom: '1.5rem' }}>
              Réservez Votre Séjour de Rêve
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
              Découvrez la magie de Banyuls-sur-Mer et laissez-vous séduire par l'art de vivre méditerranéen.
              <br />
              Votre escapade authentique vous attend à La Grande Voile.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/reservation" className="btn" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}>
                <Calendar size={20} />
                Réserver maintenant
              </Link>
              
              <Link to="/contact" className="btn" style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#1e3a8a',
                border: '2px solid transparent',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}>
                <Phone size={20} />
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </Container>
      </BookingSection>
    </HomePage>
  )
}

export default Home
