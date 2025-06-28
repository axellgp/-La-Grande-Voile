import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Star, Fish, Waves, Camera, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import { MarineElements } from '../components/MarineElements'
import { getPublicImagePath } from '../utils/imageUtils'

const ContactPage = styled.div`
  padding-top: 100px;
  min-height: 100vh;
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

const ContactSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[12]};
  margin-bottom: ${props => props.theme.spacing[16]};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[8]};
  }
`

const ContactInfo = styled(motion.div)`
  h2 {
    color: ${props => props.theme.colors.neutral[900]};
    margin-bottom: ${props => props.theme.spacing[8]};
  }

  .intro {
    color: ${props => props.theme.colors.neutral[600]};
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[8]};
  }
`

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[6]};

  .icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
    border-radius: ${props => props.theme.radii.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.neutral.white};
    flex-shrink: 0;
  }

  .content {
    h3 {
      color: ${props => props.theme.colors.neutral[800]};
      margin-bottom: ${props => props.theme.spacing[1]};
      font-size: ${props => props.theme.fontSizes.lg};
    }

    p {
      color: ${props => props.theme.colors.neutral[600]};
      margin: 0;
      line-height: 1.5;

      a {
        color: ${props => props.theme.colors.primary.main};
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`

const ContactForm = styled(motion.div)`
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.radii['2xl']};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: ${props => props.theme.spacing[8]};

  h2 {
    color: ${props => props.theme.colors.neutral[900]};
    margin-bottom: ${props => props.theme.spacing[6]};
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing[6]};
  }
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[4]};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: ${props => props.theme.spacing[2]};
    color: ${props => props.theme.colors.neutral[700]};
    font-weight: ${props => props.theme.fontWeights.medium};
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    border: 1px solid ${props => props.theme.colors.neutral[300]};
    border-radius: ${props => props.theme.radii.lg};
    font-size: ${props => props.theme.fontSizes.base};
    transition: border-color ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary.main};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary.main}1a;
    }

    &.error {
      border-color: ${props => props.theme.colors.error};
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  .error-message {
    color: ${props => props.theme.colors.error};
    font-size: ${props => props.theme.fontSizes.sm};
    margin-top: ${props => props.theme.spacing[1]};
  }
`

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.primary.light});
  color: ${props => props.theme.colors.neutral.white};
  border: none;
  border-radius: ${props => props.theme.radii.lg};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`

const MapSection = styled.section`
  background: ${props => props.theme.colors.neutral[50]};
  padding: ${props => props.theme.spacing[16]} 0;
`

const MapContainer = styled.div`
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.radii['2xl']};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  height: 400px;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .map-overlay {
    position: absolute;
    top: ${props => props.theme.spacing[4]};
    left: ${props => props.theme.spacing[4]};
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: ${props => props.theme.radii.lg};
    padding: ${props => props.theme.spacing[4]};
    max-width: 300px;

    h3 {
      color: ${props => props.theme.colors.neutral[900]};
      margin-bottom: ${props => props.theme.spacing[2]};
    }

    p {
      color: ${props => props.theme.colors.neutral[600]};
      margin: 0;
      font-size: ${props => props.theme.fontSizes.sm};
    }
  }
`

const BanyulsSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
`

const BanyulsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing[8]};
`

const BanyulsCard = styled(motion.div)`
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.radii['2xl']};
  box-shadow: ${props => props.theme.shadows.lg};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }

  .image {
    height: 200px;
    background-size: cover;
    background-position: center;
  }

  .content {
    padding: ${props => props.theme.spacing[6]};

    h3 {
      color: ${props => props.theme.colors.neutral[900]};
      margin-bottom: ${props => props.theme.spacing[3]};
    }

    p {
      color: ${props => props.theme.colors.neutral[600]};
      line-height: 1.6;
    }
  }
`

const DivingSection = styled.section`
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(59, 130, 246, 0.05));
  padding: ${props => props.theme.spacing[16]} 0;
  position: relative;
  overflow: hidden;
`

const DivingHero = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}20, ${props => props.theme.colors.secondary.main}20);
  border-radius: ${props => props.theme.radii['3xl']};
  padding: ${props => props.theme.spacing[12]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff10" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></svg>');
    opacity: 0.3;
  }

  h2 {
    color: ${props => props.theme.colors.primary.dark};
    margin-bottom: ${props => props.theme.spacing[4]};
    position: relative;
    z-index: 1;
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.neutral[700]};
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
`

const DivingActivities = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[12]};
`

const ActivityCard = styled(motion.div)`
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.radii['2xl']};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.md};
  transition: all ${props => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary.main}, ${props => props.theme.colors.secondary.main});
  }

  .icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary.main}20, ${props => props.theme.colors.secondary.main}20);
    border-radius: ${props => props.theme.radii.xl};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${props => props.theme.spacing[4]};
    color: ${props => props.theme.colors.primary.main};
  }

  h3 {
    color: ${props => props.theme.colors.neutral[900]};
    margin-bottom: ${props => props.theme.spacing[3]};
  }

  p {
    color: ${props => props.theme.colors.neutral[600]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[4]};
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      color: ${props => props.theme.colors.neutral[700]};
      padding: ${props => props.theme.spacing[1]} 0;
      display: flex;
      align-items: center;
      gap: ${props => props.theme.spacing[3]};
      font-size: ${props => props.theme.fontSizes.sm};

      &::before {
        content: '🐠';
        font-size: ${props => props.theme.fontSizes.base};
      }
    }
  }
`

const DivingInfo = styled.div`
  background: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.radii['2xl']};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.lg};
  text-align: center;

  .partners {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing[6]};
    margin-top: ${props => props.theme.spacing[6]};

    .partner {
      padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
      background: ${props => props.theme.colors.neutral[50]};
      border-radius: ${props => props.theme.radii.lg};
      color: ${props => props.theme.colors.neutral[700]};
      font-weight: ${props => props.theme.fontWeights.medium};
      transition: all ${props => props.theme.transitions.fast};

      &:hover {
        background: ${props => props.theme.colors.primary.main}10;
        color: ${props => props.theme.colors.primary.main};
      }
    }
  }
`

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Votre message a été envoyé avec succès !')
      reset()
      setIsLoading(false)
    }, 1000)
  }

  const contactItems = [
    {
      icon: <MapPin size={24} />,
      title: 'Adresse',
      content: '12 Avenue de la Méditerranée\n66650 Banyuls-sur-Mer, France',
    },
    {
      icon: <Phone size={24} />,
      title: 'Téléphone',
      content: '+33 4 68 88 12 34',
      link: 'tel:+33468881234',
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'contact@lagrandevoile.com',
      link: 'mailto:contact@lagrandevoile.com',
    },
    {
      icon: <Clock size={24} />,
      title: 'Horaires d\'accueil',
      content: 'Lundi - Dimanche\n7h00 - 22h00',
    },
  ]

  const banyulsAttractions = [
    {
      name: 'Musée Maillol',
      description: 'Découvrez l\'œuvre d\'Aristide Maillol, sculpteur né à Banyuls, dans sa maison natale transformée en musée.',
      image: getPublicImagePath('images/marine/diver.jpg'),
    },
    {
      name: 'Caves viticoles',
      description: 'Visitez les caves et dégustez les fameux vins de Banyuls et Collioure dans les domaines en terrasses.',
      image: getPublicImagePath('images/marine/kayak.jpg'),
    },
    {
      name: 'Sentier sous-marin',
      description: 'Explorez la réserve marine naturelle avec masque et tuba sur un sentier balisé unique en Méditerranée.',
      image: getPublicImagePath('images/marine/marine-reserve.jpg'),
    },
    {
      name: 'Tour Madeloc',
      description: 'Randonnée jusqu\'à cette tour de guet du XIVe siècle offrant un panorama exceptionnel sur la côte.',
      image: getPublicImagePath('images/marine/sailing.jpg'),
    },
  ]

  const divingActivities = [
    {
      icon: <Fish size={32} />,
      title: 'Sentier Sous-Marin',
      description: 'Découvrez la biodiversité exceptionnelle de la Réserve Marine Naturelle de Banyuls-Cerbère sur notre sentier sous-marin balisé.',
      features: [
        'Parcours guidé de 250m',
        'Profondeur 1 à 5 mètres', 
        'Panneaux informatifs immergés',
        'Observation de poissons méditerranéens'
      ]
    },
    {
      icon: <Waves size={32} />,
      title: 'Plongée Bouteille',
      description: 'Explorez les fonds marins exceptionnels avec nos partenaires certifiés PADI et découvrez mérous, poulpes et gorgones.',
      features: [
        'Sites de 5 à 40 mètres',
        'Moniteurs diplômés d\'État',
        'Matériel fourni',
        'Baptêmes et perfectionnement'
      ]
    },
    {
      icon: <Camera size={32} />,
      title: 'Photo Sous-Marine',
      description: 'Immortalisez la beauté des fonds marins méditerranéens lors de sorties dédiées à la photographie subaquatique.',
      features: [
        'Stages photo sous-marine',
        'Matériel professionnel disponible',
        'Conseils techniques personnalisés',
        'Sites riches en biodiversité'
      ]
    },
    {
      icon: <Users size={32} />,
      title: 'Sorties Famille',
      description: 'Des activités marines adaptées à toute la famille pour découvrir ensemble les merveilles de la Méditerranée.',
      features: [
        'Randonnée palmée encadrée',
        'Découverte de la faune marine',
        'Activités dès 8 ans',
        'Matériel adapté aux enfants'
      ]
    }
  ]

  return (
    <ContactPage>
      <Hero>
        <Container>
          <HeroContent
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Contactez-nous</h1>
            <p>
              Nous sommes là pour répondre à toutes vos questions et vous aider 
              à organiser votre séjour parfait à Banyuls-sur-Mer
            </p>
          </HeroContent>
        </Container>
      </Hero>

      <ContactSection>
        <Container>
          <ContactGrid>
            <ContactInfo
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Nous Contacter</h2>
              <p className="intro">
                Notre équipe est à votre disposition pour vous accompagner dans l'organisation 
                de votre séjour. N'hésitez pas à nous contacter pour toute question ou demande 
                de renseignement.
              </p>

              {contactItems.map((item, index) => (
                <ContactItem key={index}>
                  <div className="icon">{item.icon}</div>
                  <div className="content">
                    <h3>{item.title}</h3>
                    <p>
                      {item.link ? (
                        <a href={item.link}>
                          {item.content.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < item.content.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </a>
                      ) : (
                        item.content.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < item.content.split('\n').length - 1 && <br />}
                          </span>
                        ))
                      )}
                    </p>
                  </div>
                </ContactItem>
              ))}
            </ContactInfo>

            <ContactForm
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Envoyez-nous un message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormRow>
                  <FormGroup>
                    <label htmlFor="firstName">Prénom *</label>
                    <input
                      type="text"
                      id="firstName"
                      className={errors.firstName ? 'error' : ''}
                      {...register('firstName', {
                        required: 'Le prénom est obligatoire',
                      })}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && (
                      <div className="error-message">{errors.firstName.message}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="lastName">Nom *</label>
                    <input
                      type="text"
                      id="lastName"
                      className={errors.lastName ? 'error' : ''}
                      {...register('lastName', {
                        required: 'Le nom est obligatoire',
                      })}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && (
                      <div className="error-message">{errors.lastName.message}</div>
                    )}
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      className={errors.email ? 'error' : ''}
                      {...register('email', {
                        required: 'L\'email est obligatoire',
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Format d\'email invalide',
                        },
                      })}
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <div className="error-message">{errors.email.message}</div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      placeholder="Votre numéro de téléphone"
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <label htmlFor="subject">Sujet *</label>
                  <select
                    id="subject"
                    className={errors.subject ? 'error' : ''}
                    {...register('subject', {
                      required: 'Veuillez sélectionner un sujet',
                    })}
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="reservation">Demande de réservation</option>
                    <option value="information">Demande d'information</option>
                    <option value="diving">Activités plongée & marines</option>
                    <option value="modification">Modification de réservation</option>
                    <option value="annulation">Annulation de réservation</option>
                    <option value="evenement">Événement privé</option>
                    <option value="autre">Autre</option>
                  </select>
                  {errors.subject && (
                    <div className="error-message">{errors.subject.message}</div>
                  )}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    className={errors.message ? 'error' : ''}
                    {...register('message', {
                      required: 'Le message est obligatoire',
                      minLength: {
                        value: 10,
                        message: 'Le message doit contenir au moins 10 caractères',
                      },
                    })}
                    placeholder="Décrivez votre demande..."
                  />
                  {errors.message && (
                    <div className="error-message">{errors.message.message}</div>
                  )}
                </FormGroup>

                <SubmitButton type="submit" disabled={isLoading}>
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
                  <Send size={20} />
                </SubmitButton>
              </form>
            </ContactForm>
          </ContactGrid>
        </Container>
      </ContactSection>

      <MapSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
              Notre Emplacement
            </h2>
            <MapContainer>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.2849583491543!2d3.124849!3d42.481944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12bb1b1b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sBanyuls-sur-Mer%2C%20France!5e0!3m2!1sfr!2sfr!4v1640995200000!5m2!1sfr!2sfr"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Grande Voile - Banyuls-sur-Mer"
              />
              <div className="map-overlay">
                <h3>La Grande Voile</h3>
                <p>12 Avenue de la Méditerranée<br />66650 Banyuls-sur-Mer</p>
              </div>
            </MapContainer>
          </motion.div>
        </Container>
      </MapSection>

      <DivingSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <DivingHero>
              <MarineElements divingTheme={true} density="normal" />
              <h2>Plongée & Activités Marines</h2>
              <p>
                Banyuls-sur-Mer abrite la première Réserve Marine Naturelle de France métropolitaine. 
                Découvrez un écosystème méditerranéen préservé avec une biodiversité exceptionnelle : 
                mérous, poulpes, gorgones, posidonies et bien plus encore !
              </p>
            </DivingHero>

            <DivingActivities>
              {divingActivities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="icon">{activity.icon}</div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <ul className="features">
                    {activity.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </ActivityCard>
              ))}
            </DivingActivities>

            <DivingInfo>
              <h3 style={{ marginBottom: '1rem', color: '#2D3748' }}>
                Réservez vos Activités Marines
              </h3>
              <p style={{ color: '#718096', marginBottom: '2rem' }}>
                Notre équipe peut vous mettre en relation avec nos partenaires certifiés 
                pour organiser vos sorties plongée et activités marines durant votre séjour.
              </p>
              <div className="partners">
                <div className="partner">Centre de Plongée Banyuls</div>
                <div className="partner">Aqua Passion</div>
                <div className="partner">Réserve Marine Naturelle</div>
                <div className="partner">Office de Tourisme</div>
              </div>
            </DivingInfo>
          </motion.div>
        </Container>
      </DivingSection>

      <BanyulsSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2>Découvrir Banyuls-sur-Mer</h2>
            <p style={{ fontSize: '1.25rem', color: '#718096', maxWidth: '600px', margin: '1rem auto 0' }}>
              Profitez de votre séjour pour explorer les trésors de cette perle méditerranéenne
            </p>
          </motion.div>

          <BanyulsGrid>
            {banyulsAttractions.map((attraction, index) => (
              <BanyulsCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div 
                  className="image"
                  style={{ backgroundImage: `url(${attraction.image})` }}
                />
                <div className="content">
                  <h3>{attraction.name}</h3>
                  <p>{attraction.description}</p>
                </div>
              </BanyulsCard>
            ))}
          </BanyulsGrid>
        </Container>
      </BanyulsSection>
    </ContactPage>
  )
}

export default Contact
