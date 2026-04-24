import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, MapPin, Phone, Send, Waves } from 'lucide-react'
import toast from 'react-hot-toast'
import { useBooking } from '../context/BookingContext'

const Page = styled.div`
  padding-top: 7rem;
`

const Hero = styled.section`
  padding: ${({ theme }) => `${theme.spacing[10]} 0 ${theme.spacing[12]}`};
`

const HeroPanel = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.9), rgba(244, 239, 232, 0.94)),
    url('${({ $image }) => $image}') center/cover no-repeat;
  background-blend-mode: lighten;
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`

const HeroCopy = styled(motion.div)`
  max-width: 42rem;

  h1 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
    max-width: 12ch;
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[600]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`

const ContactSection = styled.section`
  padding-bottom: ${({ theme }) => theme.spacing[14]};
`

const ContactGrid = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const InfoPanel = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing[7]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};
`

const ContactItem = styled.a`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[4]} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
  color: ${({ theme }) => theme.colors.neutral[700]};

  &:last-child {
    border-bottom: none;
  }

  svg {
    color: ${({ theme }) => theme.colors.secondary.dark};
    margin-top: 0.15rem;
  }

  strong {
    display: block;
    margin-bottom: 0.3rem;
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`

const ActivitiesPanel = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`

const ActivityCard = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: rgba(18, 58, 99, 0.03);
`

const ActivityImage = styled.div`
  height: 12rem;
  background-position: center;
  background-size: cover;
`

const ActivityBody = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[600]};
  }
`

const FormPanel = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing[7]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  form {
    display: grid;
    gap: ${({ theme }) => theme.spacing[5]};
  }
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.primary.dark};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  .error {
    color: ${({ theme }) => theme.colors.error};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin-top: ${({ theme }) => theme.spacing[1]};
  }
`

const MapSection = styled.section`
  padding-bottom: ${({ theme }) => theme.spacing[16]};
`

const MapCard = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};
  background: ${({ theme }) => theme.colors.surface.cardStrong};

  iframe {
    width: 100%;
    height: 420px;
    border: none;
  }
`

const Contact = () => {
  const { siteContent, hotelSettings } = useBooking()
  const [sending, setSending] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    setSending(true)

    setTimeout(() => {
      toast.success('Votre message a bien ete envoye.')
      reset()
      setSending(false)
    }, 900)
  }

  const contactItems = [
    {
      icon: <MapPin size={18} />,
      title: 'Adresse',
      value: hotelSettings.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(hotelSettings.address)}`,
    },
    {
      icon: <Phone size={18} />,
      title: 'Telephone',
      value: hotelSettings.phone,
      href: `tel:${hotelSettings.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: <Mail size={18} />,
      title: 'Email',
      value: hotelSettings.email,
      href: `mailto:${hotelSettings.email}`,
    },
  ]

  return (
    <Page>
      <Hero>
        <HeroPanel $image={siteContent.hero.backgroundImage}>
          <HeroCopy
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">{siteContent.contact.eyebrow}</span>
            <h1>{siteContent.contact.title}</h1>
            <p>{siteContent.contact.description}</p>
          </HeroCopy>
        </HeroPanel>
      </Hero>

      <ContactSection>
        <ContactGrid>
          <InfoPanel
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">Informations</span>
            <h2 style={{ margin: '1rem 0' }}>Un contact plus rassurant et plus premium.</h2>
            <p style={{ color: '#665c53', marginBottom: '1.5rem' }}>
              Le site doit donner le sentiment d un accueil soigne, d une residence
              serieuse et d un sejour prepare avec attention.
            </p>

            {contactItems.map((item) => (
              <ContactItem key={item.title} href={item.href}>
                {item.icon}
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.value}</span>
                </div>
              </ContactItem>
            ))}

            <ActivitiesPanel>
              {siteContent.activities.slice(0, 2).map((activity) => (
                <ActivityCard key={activity.id}>
                  <ActivityImage style={{ backgroundImage: `url(${activity.image})` }} />
                  <ActivityBody>
                    <span className="eyebrow">{activity.badge}</span>
                    <h3 style={{ marginTop: '1rem' }}>{activity.title}</h3>
                    <p>{activity.shortText}</p>
                  </ActivityBody>
                </ActivityCard>
              ))}
            </ActivitiesPanel>
          </InfoPanel>

          <FormPanel
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">Formulaire</span>
            <h2 style={{ margin: '1rem 0 1.5rem' }}>Envoyer une demande</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormRow>
                <FormGroup>
                  <label htmlFor="firstName">Prenom</label>
                  <input
                    id="firstName"
                    type="text"
                    {...register('firstName', { required: 'Champ requis' })}
                  />
                  {errors.firstName && <div className="error">{errors.firstName.message}</div>}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="lastName">Nom</label>
                  <input
                    id="lastName"
                    type="text"
                    {...register('lastName', { required: 'Champ requis' })}
                  />
                  {errors.lastName && <div className="error">{errors.lastName.message}</div>}
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email requis',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Format invalide' },
                    })}
                  />
                  {errors.email && <div className="error">{errors.email.message}</div>}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="phone">Telephone</label>
                  <input id="phone" type="tel" {...register('phone')} />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label htmlFor="subject">Sujet</label>
                <select id="subject" {...register('subject', { required: 'Sujet requis' })}>
                  <option value="">Choisir un sujet</option>
                  <option value="reservation">Reservation</option>
                  <option value="information">Information</option>
                  <option value="activites">Activites mer & plongee</option>
                  <option value="autre">Autre</option>
                </select>
                {errors.subject && <div className="error">{errors.subject.message}</div>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="6"
                  {...register('message', {
                    required: 'Message requis',
                    minLength: { value: 10, message: 'Minimum 10 caracteres' },
                  })}
                />
                {errors.message && <div className="error">{errors.message.message}</div>}
              </FormGroup>

              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? 'Envoi...' : 'Envoyer'}
                <Send size={16} />
              </button>
            </form>
          </FormPanel>
        </ContactGrid>
      </ContactSection>

      <MapSection>
        <MapCard>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.2849583491543!2d3.124849!3d42.481944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12bb1b1b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sBanyuls-sur-Mer%2C%20France!5e0!3m2!1sfr!2sfr!4v1640995200000!5m2!1sfr!2sfr"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="La Grande Voile - Banyuls-sur-Mer"
          />
        </MapCard>
      </MapSection>
    </Page>
  )
}

export default Contact
