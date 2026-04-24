import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, MapPin, Phone, Waves } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

const FooterShell = styled.footer`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing[20]};
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.surface.border};
  background:
    radial-gradient(circle at top left, rgba(88, 199, 212, 0.16), transparent 30%),
    linear-gradient(180deg, rgba(6, 24, 38, 0.92) 0%, rgba(4, 16, 28, 0.98) 100%);
`

const FooterGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 15% 20%, rgba(135, 237, 246, 0.12), transparent 20%),
    radial-gradient(circle at 80% 0%, rgba(246, 197, 119, 0.12), transparent 18%);
`

const FooterContent = styled.div`
  position: relative;
  z-index: 1;
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[20]} 0 ${theme.spacing[8]}`};
`

const CTA = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: ${({ theme }) => theme.colors.gradients.cta};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  margin-bottom: ${({ theme }) => theme.spacing[12]};

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }

  p {
    max-width: 40rem;
    color: rgba(255, 255, 255, 0.82);
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing[3]};
    flex-wrap: wrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.spacing[6]};

    .actions {
      justify-content: flex-start;
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.9fr 1fr 0.8fr;
  gap: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Column = styled(motion.div)`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  p,
  li,
  a,
  button {
    color: ${({ theme }) => theme.colors.neutral[300]};
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
    box-shadow: ${({ theme }) => theme.shadows.glow};
    color: ${({ theme }) => theme.colors.neutral.white};
  }

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.neutral.white};
    line-height: 1;
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[400]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }
`

const ContactCard = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`

const ContactItem = styled.a`
  display: inline-flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.neutral[300]};

  svg {
    color: ${({ theme }) => theme.colors.secondary.light};
    margin-top: 0.15rem;
    flex-shrink: 0;
  }
`

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.neutral[300]};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral.white};
  }
`

const Socials = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[5]};
`

const Social = styled(motion.a)`
  width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.neutral.white};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[10]};
  padding-top: ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid rgba(180, 224, 241, 0.08);

  p,
  span {
    color: ${({ theme }) => theme.colors.neutral[400]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const footerLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/rooms', label: 'Appartements' },
  { path: '/reservation', label: 'Reservation' },
  { path: '/calendrier', label: 'Disponibilites' },
  { path: '/a-propos', label: 'A propos' },
  { path: '/contact', label: 'Contact' },
]

const highlights = [
  'Vue directe sur la baie de Banyuls',
  'Terrasses, patio et appartements familiaux',
  'Acces rapide aux spots de plongee et a la reserve marine',
  'Semaine en couple, en famille ou entre amis',
]

const Footer = () => {
  const { hotelSettings } = useBooking()
  const year = new Date().getFullYear()

  return (
    <FooterShell>
      <FooterGlow />
      <FooterContent>
        <CTA
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="eyebrow">Ocean Stay</span>
            <h2>Un sejour plus immersif, plus fluide, plus memoriel.</h2>
            <p>
              Entre lumiere mediterraneenne, reserve marine et appartements de caractere,
              La Grande Voile vous installe au plus proche de la mer avec une experience
              elegante et sans friction.
            </p>
          </div>
          <div className="actions">
            <Link to="/rooms" className="btn btn-secondary">
              Voir les appartements
            </Link>
            <Link to="/reservation" className="btn btn-accent">
              Reserver maintenant
            </Link>
          </div>
        </CTA>

        <Grid>
          <Column
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
          >
            <Brand>
              <span className="mark">
                <Waves size={18} />
              </span>
              <div>
                <strong>La Grande Voile</strong>
                <span>Residence de standing a Banyuls-sur-Mer</span>
              </div>
            </Brand>
            <p>
              Residence face a la baie, pensee pour profiter de la plongee, de la cote
              Vermeille et d'un rythme de vacances vraiment apaisant.
            </p>
            <Socials>
              <Social
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <Facebook size={16} />
              </Social>
              <Social
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
              >
                <Instagram size={16} />
              </Social>
              <Social href={`mailto:${hotelSettings.email}`} whileHover={{ y: -3 }}>
                <Mail size={16} />
              </Social>
            </Socials>
          </Column>

          <Column
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            viewport={{ once: true }}
          >
            <h3>Naviguer</h3>
            <ul>
              {footerLinks.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </Column>

          <Column
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            viewport={{ once: true }}
          >
            <h3>Signature</h3>
            <ul>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Column>

          <Column
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            viewport={{ once: true }}
          >
            <h3>Contact</h3>
            <ContactCard>
              <ContactItem href={`https://maps.google.com/?q=${encodeURIComponent(hotelSettings.address)}`}>
                <MapPin size={16} />
                <span>{hotelSettings.address}</span>
              </ContactItem>
              <ContactItem href={`tel:${hotelSettings.phone.replace(/\s+/g, '')}`}>
                <Phone size={16} />
                <span>{hotelSettings.phone}</span>
              </ContactItem>
              <ContactItem href={`mailto:${hotelSettings.email}`}>
                <Mail size={16} />
                <span>{hotelSettings.email}</span>
              </ContactItem>
            </ContactCard>
          </Column>
        </Grid>

        <FooterBottom>
          <p>{year} La Grande Voile. Tous droits reserves.</p>
          <span>Theme mer & plongee, transitions fluides et navigation coherente</span>
        </FooterBottom>
      </FooterContent>
    </FooterShell>
  )
}

export default Footer
