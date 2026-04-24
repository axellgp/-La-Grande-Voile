import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Waves } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

const Shell = styled.footer`
  margin-top: ${({ theme }) => theme.spacing[20]};
  border-top: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.64), rgba(250, 244, 236, 0.92));
`

const Inner = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[16]} 0 ${theme.spacing[8]}`};
`

const CTA = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => theme.spacing[7]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background: ${({ theme }) => theme.colors.gradients.cta};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  margin-bottom: ${({ theme }) => theme.spacing[10]};

  h2,
  p {
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  p {
    max-width: 36rem;
    opacity: 0.9;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
    align-items: center;
    justify-content: flex-end;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;

    .actions {
      justify-content: flex-start;
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.9fr 1fr;
  gap: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const Column = styled(motion.div)`
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.primary.dark};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  p,
  li,
  a {
    color: ${({ theme }) => theme.colors.neutral[600]};
    line-height: 1.8;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  ul {
    list-style: none;
    display: grid;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`

const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  .mark {
    width: 3rem;
    height: 3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.gradients.button};
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary.dark};
    line-height: 1;
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[500]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }
`

const ContactItem = styled.a`
  display: inline-flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};

  svg {
    color: ${({ theme }) => theme.colors.secondary.dark};
    margin-top: 0.2rem;
    flex-shrink: 0;
  }
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[10]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid ${({ theme }) => theme.colors.surface.border};

  p,
  span {
    color: ${({ theme }) => theme.colors.neutral[500]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const links = [
  { path: '/', label: 'Accueil' },
  { path: '/rooms', label: 'Appartements' },
  { path: '/reservation', label: 'Reservation' },
  { path: '/a-propos', label: 'La residence' },
  { path: '/contact', label: 'Contact' },
]

const Footer = () => {
  const { hotelSettings, siteContent } = useBooking()
  const year = new Date().getFullYear()

  return (
    <Shell>
      <Inner>
        <CTA
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="eyebrow">La Grande Voile</span>
            <h2>{siteContent.hero.title}</h2>
            <p>{hotelSettings.tagline}</p>
          </div>
          <div className="actions">
            <Link to="/rooms" className="btn btn-secondary">
              Voir les appartements
            </Link>
            <Link to="/reservation" className="btn btn-accent">
              Reserver
            </Link>
          </div>
        </CTA>

        <Grid>
          <Column
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Brand>
              <span className="mark">
                <Waves size={18} />
              </span>
              <div>
                <strong>La Grande Voile</strong>
                <span>Residence de luxe a Banyuls-sur-Mer</span>
              </div>
            </Brand>
            <p>{hotelSettings.description}</p>
          </Column>

          <Column
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true }}
          >
            <h3>Naviguer</h3>
            <ul>
              {links.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            viewport={{ once: true }}
          >
            <h3>Contact</h3>
            <ul>
              <li>
                <ContactItem href={`https://maps.google.com/?q=${encodeURIComponent(hotelSettings.address)}`}>
                  <MapPin size={16} />
                  <span>{hotelSettings.address}</span>
                </ContactItem>
              </li>
              <li>
                <ContactItem href={`tel:${hotelSettings.phone.replace(/\s+/g, '')}`}>
                  <Phone size={16} />
                  <span>{hotelSettings.phone}</span>
                </ContactItem>
              </li>
              <li>
                <ContactItem href={`mailto:${hotelSettings.email}`}>
                  <Mail size={16} />
                  <span>{hotelSettings.email}</span>
                </ContactItem>
              </li>
            </ul>
          </Column>
        </Grid>

        <Bottom>
          <p>{year} La Grande Voile. Tous droits reserves.</p>
          <span>Edition luxe mediterraneenne, contenu personnalisable depuis l admin</span>
        </Bottom>
      </Inner>
    </Shell>
  )
}

export default Footer
