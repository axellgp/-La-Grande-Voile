import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Compass, Home, MapPin, Waves } from 'lucide-react'
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
  gap: ${({ theme }) => theme.spacing[8]};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const HeroCopy = styled(motion.div)`
  h1 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
    max-width: 12ch;
  }

  p {
    max-width: 38rem;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.neutral[600]};
  }
`

const HeroImage = styled(motion.div)`
  min-height: 32rem;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background:
    linear-gradient(180deg, rgba(18, 58, 99, 0.08), rgba(18, 58, 99, 0.18)),
    url('${({ $image }) => $image}') center/cover no-repeat;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[14]} 0;
`

const SectionInner = styled.div`
  width: min(1240px, calc(100% - 2rem));
  margin: 0 auto;
`

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const StoryCard = styled(motion.article)`
  padding: ${({ theme }) => theme.spacing[7]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  h2 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[4]}`};
  }

  p + p {
    margin-top: ${({ theme }) => theme.spacing[4]};
  }
`

const FactsColumn = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`

const FactCard = styled(motion.article)`
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  svg {
    color: ${({ theme }) => theme.colors.secondary.dark};
    margin-bottom: ${({ theme }) => theme.spacing[3]};
  }

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[600]};
  }
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

const GalleryCard = styled(motion.article)`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  .image {
    height: 16rem;
    background-position: center;
    background-size: cover;
  }

  .body {
    padding: ${({ theme }) => theme.spacing[5]};
  }

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[600]};
  }
`

const About = () => {
  const { siteContent, hotelSettings } = useBooking()

  const facts = [
    {
      icon: <Home size={20} />,
      title: 'Residence haut de gamme',
      text: 'Des appartements pensés pour des sejours longs, lumineux et confortables, plutot qu un simple passage.',
    },
    {
      icon: <Waves size={20} />,
      title: 'Baie et reserve marine',
      text: 'La mer n est pas ici un decor secondaire : elle structure l image du lieu et la qualite de l experience.',
    },
    {
      icon: <Compass size={20} />,
      title: 'Territoire fort',
      text: 'Banyuls, ses vignes, sa culture et sa cote donnent au site une matiere editoriale plus authentique.',
    },
  ]

  return (
    <Page>
      <Hero>
        <HeroPanel>
          <HeroCopy
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">{siteContent.about.eyebrow}</span>
            <h1>{siteContent.about.heroTitle}</h1>
            <p>{siteContent.about.heroText}</p>
          </HeroCopy>

          <HeroImage
            $image={siteContent.about.image}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          />
        </HeroPanel>
      </Hero>

      <Section>
        <SectionInner>
          <StoryGrid>
            <StoryCard
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="eyebrow">{siteContent.about.storyTitle}</span>
              <h2>La Grande Voile, pensée comme une vraie adresse.</h2>
              {siteContent.about.storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p style={{ marginTop: '1.5rem', fontWeight: 600 }}>
                {hotelSettings.tagline}
              </p>
            </StoryCard>

            <FactsColumn>
              {facts.map((fact, index) => (
                <FactCard
                  key={fact.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  {fact.icon}
                  <h3>{fact.title}</h3>
                  <p>{fact.text}</p>
                </FactCard>
              ))}
            </FactsColumn>
          </StoryGrid>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ maxWidth: '42rem', marginBottom: '2rem' }}
          >
            <span className="eyebrow">Banyuls</span>
            <h2 style={{ margin: '1rem 0' }}>Le site parle maintenant du lieu avec plus de justesse.</h2>
            <p style={{ color: '#665c53', fontSize: '1.125rem' }}>
              Une residence de luxe a Banyuls doit montrer le territoire, pas seulement
              des blocs de contenu. Les images, les textes et les activites peuvent
              desormais rester au niveau de la destination.
            </p>
          </motion.div>

          <GalleryGrid>
            {siteContent.banyulsHighlights.map((item, index) => (
              <GalleryCard
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="image" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="body">
                  <span className="eyebrow">
                    <MapPin size={12} />
                    Banyuls-sur-Mer
                  </span>
                  <h3 style={{ marginTop: '1rem' }}>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </GalleryCard>
            ))}
          </GalleryGrid>
        </SectionInner>
      </Section>
    </Page>
  )
}

export default About
