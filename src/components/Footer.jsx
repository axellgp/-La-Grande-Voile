import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react'

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${props => props.theme.colors.neutral[900]}, ${props => props.theme.colors.primary.main});
  color: ${props => props.theme.colors.neutral.white};
  padding: ${props => props.theme.spacing[16]} 0 ${props => props.theme.spacing[8]};
  margin-top: ${props => props.theme.spacing[20]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.accent.gold}, transparent);
  }
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing[12]};
`

const FooterSection = styled(motion.div)`
  h3 {
    color: ${props => props.theme.colors.neutral.white};
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[6]};
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, ${props => props.theme.colors.accent.gold}, ${props => props.theme.colors.accent.coral});
    }
  }

  p, li {
    color: ${props => props.theme.colors.neutral[300]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[3]};
  }

  ul {
    list-style: none;
  }

  a {
    color: ${props => props.theme.colors.neutral[300]};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.accent.gold};
    }
  }
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  margin-bottom: ${props => props.theme.spacing[4]};

  svg {
    color: ${props => props.theme.colors.accent.gold};
    flex-shrink: 0;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[6]};
`

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.radii.lg};
  color: ${props => props.theme.colors.neutral.white};
  transition: all ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.accent.gold};
    transform: translateY(-2px);
  }
`

const Newsletter = styled.div`
  margin-top: ${props => props.theme.spacing[6]};
`

const NewsletterForm = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[4]};

  input {
    flex: 1;
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: ${props => props.theme.radii.lg};
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.neutral.white};
    
    &::placeholder {
      color: ${props => props.theme.colors.neutral[400]};
    }

    &:focus {
      border-color: ${props => props.theme.colors.accent.gold};
      background: rgba(255, 255, 255, 0.15);
    }
  }

  button {
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
    background: linear-gradient(135deg, ${props => props.theme.colors.accent.gold}, ${props => props.theme.colors.accent.coral});
    color: ${props => props.theme.colors.neutral.white};
    border: none;
    border-radius: ${props => props.theme.radii.lg};
    font-weight: ${props => props.theme.fontWeights.semibold};
    cursor: pointer;
    transition: transform ${props => props.theme.transitions.fast};

    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

const FooterBottom = styled.div`
  margin-top: ${props => props.theme.spacing[12]};
  padding-top: ${props => props.theme.spacing[8]};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: ${props => props.theme.colors.neutral[400]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const FooterLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[6]};
  flex-wrap: wrap;
  justify-content: center;

  a {
    color: ${props => props.theme.colors.neutral[400]};
    text-decoration: none;
    font-size: ${props => props.theme.fontSizes.sm};
    transition: color ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.accent.gold};
    }
  }
`

const MadeWithLove = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.fontSizes.sm};

  .heart {
    color: ${props => props.theme.colors.accent.coral};
    animation: heartbeat 1.5s ease-in-out infinite;
  }

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription')
  }

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>La Grande Voile</h3>
          <p>
            Découvrez l'authenticité méditerranéenne dans notre hôtel de charme à Banyuls-sur-Mer. 
            Entre mer et vignobles, vivez une expérience unique sur la Côte Vermeille.
          </p>
          
          <Newsletter>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Newsletter</h4>
            <p style={{ fontSize: '0.9rem' }}>
              Recevez nos offres spéciales et actualités
            </p>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Votre email"
                required
              />
              <button type="submit">S'abonner</button>
            </NewsletterForm>
          </Newsletter>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/chambres">Nos Chambres</Link></li>
            <li><Link to="/calendrier">Disponibilités</Link></li>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/reservation">Réserver</Link></li>
          </ul>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Services</h4>
            <ul>
              <li>Petit-déjeuner continental</li>
              <li>Concierge</li>
              <li>Parking privé</li>
              <li>Wi-Fi gratuit</li>
              <li>Animaux acceptés</li>
            </ul>
          </div>
        </FooterSection>

        <FooterSection
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>Contact</h3>
          
          <ContactInfo>
            <MapPin size={20} />
            <div>
              <p>12 Avenue de la Méditerranée</p>
              <p>66650 Banyuls-sur-Mer, France</p>
            </div>
          </ContactInfo>

          <ContactInfo>
            <Phone size={20} />
            <div>
              <p>+33 4 68 88 12 34</p>
            </div>
          </ContactInfo>

          <ContactInfo>
            <Mail size={20} />
            <div>
              <p>contact@lagrandevoile.com</p>
            </div>
          </ContactInfo>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Découvrir Banyuls</h4>
            <ul>
              <li>Musée Maillol</li>
              <li>Caves viticoles</li>
              <li>Sentier sous-marin</li>
              <li>Tour Madeloc</li>
              <li>Port de plaisance</li>
            </ul>
          </div>

          <SocialLinks>
            <SocialLink
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Facebook size={20} />
            </SocialLink>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={20} />
            </SocialLink>
            <SocialLink
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Youtube size={20} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <FooterLinks>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/politique-confidentialite">Politique de confidentialité</Link>
          <Link to="/conditions-generales">Conditions générales</Link>
          <Link to="/cookies">Politique des cookies</Link>
        </FooterLinks>

        <div>
          <p>&copy; 2025 La Grande Voile. Tous droits réservés.</p>
        </div>

        <MadeWithLove>
          <span>Fait avec</span>
          <Heart size={16} className="heart" />
          <span>à Banyuls-sur-Mer</span>
        </MadeWithLove>
      </FooterBottom>
    </FooterContainer>
  )
}

export default Footer
