import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { getPublicImagePath } from '../utils/imageUtils'
import { 
  MapPin, 
  Star, 
  Heart, 
  Wine, 
  Camera, 
  Mountain, 
  Waves,
  Sun,
  Fish,
  Compass,
  Shield
} from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  padding-top: 100px;
`

const HeroSection = styled.section`
  background: linear-gradient(
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.4)
  ), url('${getPublicImagePath('images/banyuls/coastline.jpg')}');
  background-size: cover;
  background-position: center;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`

const HeroContent = styled(motion.div)`
  max-width: 800px;
  padding: 0 2rem;
`

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`

const Section = styled(motion.section)`
  margin-bottom: 4rem;
`

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`

const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`

const CardText = styled.p`
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
`

const TextGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const TextContent = styled(motion.div)`
  
`

const ImageContent = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`

const Highlight = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 600;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
`

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 3rem 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.lightBlue};
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }
`

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  border: 2px solid #e9ecef;
`

const ServiceTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.4rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 600;
`

const ServiceText = styled.p`
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.6;
  font-size: 0.95rem;
`

const About = () => {
  return (
    <Container>
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroTitle>À propos de La Grande Voile</HeroTitle>
          <HeroSubtitle>
            Découvrez notre résidence de standing et la perle de la Côte Vermeille
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <Content>
        <Section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionTitle>
            <Heart size={32} />
            Notre Histoire
          </SectionTitle>
          <TextGrid>
            <TextContent>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                <Highlight>La Grande Voile</Highlight> vous accueille dans un cadre d'exception à Banyuls-sur-Mer, 
                cette perle de la Côte Vermeille où la Méditerranée rencontre les Pyrénées.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Notre résidence de standing allie parfaitement l'intimité et le calme d'un bel appartement 
                avec la convivialité d'un authentique village catalan. Chaque appartement, du T2 au T5/6, 
                offre une <Highlight>vue imprenable sur la baie</Highlight> et des équipements haut de gamme.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Que vous veniez en couple, en famille ou entre amis, La Grande Voile vous garantit 
                des moments privilégiés dans un environnement préservé, à quelques mètres des plages 
                et du centre historique de Banyuls.
              </p>
            </TextContent>
            <ImageContent>
              <img 
                src={getPublicImagePath('images/appartements/vaisseau-amiral/SALON-VAISSEAU-AMIRAL.png')} 
                alt="Vue sur la baie de Banyuls"
              />
            </ImageContent>
          </TextGrid>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SectionTitle>
            <MapPin size={32} />
            Banyuls-sur-Mer
          </SectionTitle>
          <Grid>
            <Card
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CardIcon>
                <Wine size={32} />
              </CardIcon>
              <CardTitle>Terroir d'Exception</CardTitle>
              <CardText>
                Banyuls est célèbre pour ses vins doux naturels AOC, produits sur des terrasses 
                en schiste face à la Méditerranée. Une tradition viticole millénaire unique au monde.
              </CardText>
            </Card>

            <Card
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CardIcon>
                <Camera size={32} />
              </CardIcon>
              <CardTitle>Art & Culture</CardTitle>
              <CardText>
                Découvrez les œuvres d'Aristide Maillol dans sa ville natale, 
                visitez ses ateliers et admirez ses sculptures dans les jardins et musées.
              </CardText>
            </Card>

            <Card
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CardIcon>
                <Fish size={32} />
              </CardIcon>
              <CardTitle>Réserve Marine</CardTitle>
              <CardText>
                Plongez dans la réserve naturelle marine de Cerbère-Banyuls, 
                l'une des plus belles de Méditerranée, et découvrez sa biodiversité exceptionnelle.
              </CardText>
            </Card>

            <Card
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CardIcon>
                <Mountain size={32} />
              </CardIcon>
              <CardTitle>Nature Préservée</CardTitle>
              <CardText>
                Entre mer et montagne, explorez les sentiers du littoral, 
                les vignobles en terrasses et les criques sauvages de la Côte Vermeille.
              </CardText>
            </Card>
          </Grid>
        </Section>

        {/* Section Pourquoi choisir La Grande Voile */}
        <Section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <SectionTitle>
            <Heart size={32} />
            Pourquoi choisir La Grande Voile ?
          </SectionTitle>
            
          <Grid>
            <Card
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <CardIcon>
                <MapPin size={32} />
              </CardIcon>
              <CardTitle>Emplacement Exceptionnel</CardTitle>
              <CardText>
                Idéalement située à Banyuls-sur-Mer, notre résidence vous place au 
                cœur de la Côte Vermeille, à quelques pas de la plage et du centre-ville.
              </CardText>
            </Card>

            <Card
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <CardIcon>
                <Star size={32} />
              </CardIcon>
              <CardTitle>Confort 4 Étoiles</CardTitle>
              <CardText>
                Appartements haut de gamme entièrement équipés avec terrasses privées, 
                climatisation, WiFi et toutes les commodités modernes.
              </CardText>
            </Card>

            <Card
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <CardIcon>
                <Waves size={32} />
              </CardIcon>
              <CardTitle>Accès Privilégié</CardTitle>
              <CardText>
                Vue imprenable sur la mer Méditerranée et accès direct aux plages, 
                sentiers de randonnée et réserve marine de Banyuls.
              </CardText>
            </Card>

            <Card
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <CardIcon>
                <Shield size={32} />
              </CardIcon>
              <CardTitle>Service Personnalisé</CardTitle>
              <CardText>
                Accueil chaleureux et conseils personnalisés pour découvrir les trésors 
                cachés de Banyuls-sur-Mer et de la région.
              </CardText>
            </Card>
          </Grid>
        </Section>

        {/* Section Services avec icônes noir et blanc */}
        <Section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SectionTitle>
            <Compass size={32} />
            Nos Services
            </SectionTitle>
            
            <ServicesGrid>
              <ServiceCard
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceIcon>
                  <MapPin size={40} color="#2c3e50" />
                </ServiceIcon>
                <ServiceTitle>Emplacement Privilégié</ServiceTitle>
                <ServiceText>
                  Au cœur de Banyuls-sur-Mer, à proximité immédiate de la plage, 
                  des restaurants et des sites touristiques.
                </ServiceText>
              </ServiceCard>

              <ServiceCard
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceIcon>
                  <Wine size={40} color="#2c3e50" />
                </ServiceIcon>
                <ServiceTitle>Œnotourisme</ServiceTitle>
                <ServiceText>
                  Découvrez les célèbres vins de Banyuls avec nos partenaires 
                  vignerons et dégustations privées.
                </ServiceText>
              </ServiceCard>

              <ServiceCard
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceIcon>
                  <Waves size={40} color="#2c3e50" />
                </ServiceIcon>
                <ServiceTitle>Activités Marines</ServiceTitle>
                <ServiceText>
                  Plongée sous-marine, snorkeling, kayak et sports nautiques 
                  dans la réserve marine de Cerbère-Banyuls.
                </ServiceText>
              </ServiceCard>

              <ServiceCard
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceIcon>
                  <Mountain size={40} color="#2c3e50" />
                </ServiceIcon>
                <ServiceTitle>Nature & Randonnée</ServiceTitle>
                <ServiceText>
                  Sentiers du littoral, GR10, Pyrénées catalanes et 
                  paysages méditerranéens exceptionnels.
                </ServiceText>
              </ServiceCard>
            </ServicesGrid>

            <TextGrid style={{ marginTop: '3rem' }}>
              <ImageContent>
                <img 
                  src={getPublicImagePath('images/marine/marine-reserve.jpg')} 
                  alt="Terrasse avec vue mer"
                />
              </ImageContent>
              <TextContent>
                <CardTitle style={{ textAlign: 'left', marginBottom: '2rem' }}>
                  <Compass size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Votre Séjour Idéal
                </CardTitle>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  <Highlight>Emplacement privilégié :</Highlight> Au cœur de Banyuls, à deux pas 
                  de la plage, des restaurants et des caves à vin.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  <Highlight>Confort moderne :</Highlight> Appartements entièrement équipés, 
                  climatisation, WiFi, terrasses privées et ascenseur.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  <Highlight>Service personnalisé :</Highlight> Accueil chaleureux, 
                  conseils locaux et assistance durant votre séjour.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  <Highlight>Activités variées :</Highlight> Plongée, randonnée, œnotourisme, 
                  sports nautiques et découvertes culturelles.
                </p>
              </TextContent>
            </TextGrid>
          </Section>
      </Content>
    </Container>
  )
}

export default About
