import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Calendar,
  Camera,
  FileImage,
  Home,
  ImagePlus,
  Mail,
  MapPin,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Settings,
  Trash2,
  Waves,
} from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { useAuth } from '../context/AuthContext'

const Page = styled.div`
  min-height: 100vh;
  padding: 7rem 0 4rem;
`

const Inner = styled.div`
  width: min(1320px, calc(100% - 2rem));
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};

  h1 {
    margin: ${({ theme }) => `${theme.spacing[4]} 0 ${theme.spacing[2]}`};
  }

  p {
    max-width: 48rem;
    color: ${({ theme }) => theme.colors.neutral[600]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`

const TabBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`

const TabButton = styled.button`
  min-height: 3rem;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme, $active }) =>
    $active ? 'rgba(18, 58, 99, 0.2)' : theme.colors.surface.border};
  background: ${({ $active }) => ($active ? 'rgba(18, 58, 99, 0.08)' : 'rgba(255, 255, 255, 0.7)')};
  color: ${({ theme }) => theme.colors.primary.dark};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[5]};
`

const Card = styled(motion.section)`
  grid-column: span ${({ $span = 12 }) => $span};
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  background: ${({ theme }) => theme.colors.surface.cardStrong};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.base};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 12;
  }
`

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: rgba(18, 58, 99, 0.04);

  strong {
    display: block;
    margin-top: ${({ theme }) => theme.spacing[3]};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2.6rem;
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  span {
    color: ${({ theme }) => theme.colors.neutral[600]};
  }

  svg {
    color: ${({ theme }) => theme.colors.secondary.dark};
  }
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  flex-wrap: wrap;

  h2,
  h3 {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[600]};
  }
`

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};

  label {
    color: ${({ theme }) => theme.colors.primary.dark};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`

const TextArea = styled.textarea`
  min-height: ${({ $rows = 5 }) => `${$rows * 24}px`};
`

const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`

const ItemCard = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(18, 58, 99, 0.03);
`

const PreviewImage = styled.div`
  height: ${({ $height = '12rem' }) => $height};
  margin-top: ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radii.xl};
  background:
    linear-gradient(180deg, rgba(18, 58, 99, 0.04), rgba(18, 58, 99, 0.12)),
    url('${({ $image }) => $image}') center/cover no-repeat;
`

const ReservationList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
`

const ReservationCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  background: rgba(18, 58, 99, 0.03);

  strong {
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[600]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Status = styled.span`
  align-self: start;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: ${({ $status }) =>
    $status === 'confirmed' ? 'rgba(75, 155, 114, 0.12)' :
    $status === 'pending' ? 'rgba(198, 148, 61, 0.14)' :
    'rgba(192, 102, 88, 0.14)'};
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const createAnnouncement = () => ({ title: 'Nouvelle annonce', text: 'Texte a personnaliser.' })
const createActivity = () => ({
  id: `activity-${Date.now()}`,
  title: 'Nouvelle activite',
  badge: 'Nouveau',
  shortText: 'Resume court',
  description: 'Description longue a personnaliser.',
  image: '',
  highlight: 'A definir',
})
const createHighlight = () => ({
  id: `highlight-${Date.now()}`,
  title: 'Nouveau lieu',
  text: 'Description a personnaliser.',
  image: '',
})

const AdminDashboard = () => {
  const { user } = useAuth()
  const {
    bookings,
    bookingRequests,
    rooms,
    siteContent,
    hotelSettings,
    updateHotelSettings,
    replaceSiteContent,
    resetSiteContent,
  } = useBooking()

  const [activeTab, setActiveTab] = useState('overview')
  const [contentDraft, setContentDraft] = useState(siteContent)
  const [hotelDraft, setHotelDraft] = useState(hotelSettings)

  useEffect(() => {
    setContentDraft(siteContent)
  }, [siteContent])

  useEffect(() => {
    setHotelDraft(hotelSettings)
  }, [hotelSettings])

  if (!user || user.role !== 'admin') {
    return (
      <Page>
        <Inner>
          <Card initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1>Acces reserve</h1>
            <p>Cette page est disponible uniquement pour un compte administrateur.</p>
          </Card>
        </Inner>
      </Page>
    )
  }

  const pendingRequests = bookingRequests.filter((item) => item.status === 'pending')
  const confirmedBookings = bookings.filter((item) => item.status === 'confirmed')
  const totalRevenue = confirmedBookings.reduce((sum, item) => sum + item.totalPrice, 0)

  const updateHeroField = (field, value) => {
    setContentDraft((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }))
  }

  const updateAboutField = (field, value) => {
    setContentDraft((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }))
  }

  const updateContactField = (field, value) => {
    setContentDraft((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
  }

  const updateArrayItem = (section, index, field, value) => {
    setContentDraft((prev) => ({
      ...prev,
      [section]: prev[section].map((item, currentIndex) =>
        currentIndex === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  const addArrayItem = (section, factory) => {
    setContentDraft((prev) => ({
      ...prev,
      [section]: [...prev[section], factory()],
    }))
  }

  const removeArrayItem = (section, index) => {
    setContentDraft((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, currentIndex) => currentIndex !== index),
    }))
  }

  const updateHotelField = (field, value) => {
    setHotelDraft((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (section, index, field, file) => {
    if (!file) return
    const imageData = await readFileAsDataUrl(file)

    if (section === 'hero') {
      updateHeroField(field, imageData)
      return
    }

    if (section === 'about') {
      updateAboutField(field, imageData)
      return
    }

    updateArrayItem(section, index, field, imageData)
  }

  const saveAll = () => {
    updateHotelSettings(hotelDraft)
    replaceSiteContent(contentDraft)
  }

  const handleReset = () => {
    resetSiteContent()
  }

  const tabs = [
    { id: 'overview', label: 'Vue d ensemble', icon: <BarChart3 size={16} /> },
    { id: 'content', label: 'Mode custom', icon: <Settings size={16} /> },
    { id: 'reservations', label: 'Reservations', icon: <Calendar size={16} /> },
  ]

  return (
    <Page>
      <Inner>
        <Header>
          <span className="eyebrow">Menu admin</span>
          <h1>Piloter le site comme une vraie vitrine de luxe.</h1>
          <p>
            Ce panneau permet de modifier les visuels, les annonces, les activites,
            la partie Banyuls et les coordonnees sans retourner dans le code.
          </p>
        </Header>

        <TabBar>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </TabButton>
          ))}
        </TabBar>

        {activeTab === 'overview' && (
          <Grid>
            <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <SectionHeader>
                <div>
                  <h2>
                    <BarChart3 size={18} />
                    Vue d ensemble
                  </h2>
                  <p>Les indicateurs principaux de la residence et du site.</p>
                </div>
              </SectionHeader>
              <StatGrid>
                <StatCard>
                  <Home size={20} />
                  <strong>{rooms.length}</strong>
                  <span>appartements</span>
                </StatCard>
                <StatCard>
                  <Calendar size={20} />
                  <strong>{confirmedBookings.length}</strong>
                  <span>reservations confirmees</span>
                </StatCard>
                <StatCard>
                  <Waves size={20} />
                  <strong>{pendingRequests.length}</strong>
                  <span>demandes en attente</span>
                </StatCard>
                <StatCard>
                  <BarChart3 size={20} />
                  <strong>{totalRevenue} EUR</strong>
                  <span>revenu confirme</span>
                </StatCard>
              </StatGrid>
            </Card>

            <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <SectionHeader>
                <div>
                  <h2>
                    <Camera size={18} />
                    Sources photo actuelles
                  </h2>
                  <p>Les visuels web recuperes pour Banyuls et les activites.</p>
                </div>
              </SectionHeader>
              <List>
                {siteContent.photoCredits.map((credit) => (
                  <ItemCard key={credit.id}>
                    <strong>{credit.label}</strong>
                    <p>
                      {credit.author} · {credit.license}
                    </p>
                    <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Voir la source
                    </a>
                  </ItemCard>
                ))}
              </List>
            </Card>
          </Grid>
        )}

        {activeTab === 'content' && (
          <Grid>
            <Card
              $span={12}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <SectionHeader>
                <div>
                  <h2>
                    <Settings size={18} />
                    Mode custom
                  </h2>
                  <p>Editez le contenu premium du site puis sauvegardez en une fois.</p>
                </div>
                <ButtonRow>
                  <button className="btn btn-secondary" onClick={handleReset}>
                    <RotateCcw size={16} />
                    Revenir au contenu par defaut
                  </button>
                  <button className="btn btn-primary" onClick={saveAll}>
                    <Save size={16} />
                    Sauvegarder
                  </button>
                </ButtonRow>
              </SectionHeader>
            </Card>

            <Card $span={12}>
              <SectionHeader>
                <div>
                  <h3>
                    <ImagePlus size={18} />
                    Hero principal
                  </h3>
                </div>
              </SectionHeader>
              <FormGrid>
                <Field>
                  <label>Eyebrow</label>
                  <input value={contentDraft.hero.eyebrow} onChange={(e) => updateHeroField('eyebrow', e.target.value)} />
                </Field>
                <Field>
                  <label>Titre</label>
                  <input value={contentDraft.hero.title} onChange={(e) => updateHeroField('title', e.target.value)} />
                </Field>
                <Field>
                  <label>Sous-titre</label>
                  <TextArea value={contentDraft.hero.subtitle} onChange={(e) => updateHeroField('subtitle', e.target.value)} />
                </Field>
                <Field>
                  <label>Description</label>
                  <TextArea value={contentDraft.hero.description} onChange={(e) => updateHeroField('description', e.target.value)} />
                </Field>
                <Field>
                  <label>Annonce label</label>
                  <input value={contentDraft.hero.announcementLabel} onChange={(e) => updateHeroField('announcementLabel', e.target.value)} />
                </Field>
                <Field>
                  <label>Annonce texte</label>
                  <TextArea value={contentDraft.hero.announcementText} onChange={(e) => updateHeroField('announcementText', e.target.value)} />
                </Field>
                <Field>
                  <label>Image hero URL</label>
                  <input value={contentDraft.hero.backgroundImage} onChange={(e) => updateHeroField('backgroundImage', e.target.value)} />
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload('hero', null, 'backgroundImage', e.target.files?.[0])} />
                  <PreviewImage $image={contentDraft.hero.backgroundImage} />
                </Field>
                <Field>
                  <label>Image secondaire URL</label>
                  <input value={contentDraft.hero.foregroundImage} onChange={(e) => updateHeroField('foregroundImage', e.target.value)} />
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload('hero', null, 'foregroundImage', e.target.files?.[0])} />
                  <PreviewImage $image={contentDraft.hero.foregroundImage} />
                </Field>
              </FormGrid>
            </Card>

            <Card $span={6}>
              <SectionHeader>
                <div>
                  <h3>
                    <FileImage size={18} />
                    Annonces du site
                  </h3>
                </div>
                <button className="btn btn-secondary" onClick={() => addArrayItem('featuredAnnouncements', createAnnouncement)}>
                  <Plus size={16} />
                  Ajouter
                </button>
              </SectionHeader>
              <List>
                {contentDraft.featuredAnnouncements.map((item, index) => (
                  <ItemCard key={`${item.title}-${index}`}>
                    <ButtonRow style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" onClick={() => removeArrayItem('featuredAnnouncements', index)}>
                        <Trash2 size={16} />
                        Supprimer
                      </button>
                    </ButtonRow>
                    <Field>
                      <label>Titre</label>
                      <input value={item.title} onChange={(e) => updateArrayItem('featuredAnnouncements', index, 'title', e.target.value)} />
                    </Field>
                    <Field style={{ marginTop: '1rem' }}>
                      <label>Texte</label>
                      <TextArea value={item.text} onChange={(e) => updateArrayItem('featuredAnnouncements', index, 'text', e.target.value)} />
                    </Field>
                  </ItemCard>
                ))}
              </List>
            </Card>

            <Card $span={6}>
              <SectionHeader>
                <div>
                  <h3>
                    <Mail size={18} />
                    Coordonnees & tonalite
                  </h3>
                </div>
              </SectionHeader>
              <FormGrid>
                <Field>
                  <label>Nom</label>
                  <input value={hotelDraft.name} onChange={(e) => updateHotelField('name', e.target.value)} />
                </Field>
                <Field>
                  <label>Email</label>
                  <input value={hotelDraft.email} onChange={(e) => updateHotelField('email', e.target.value)} />
                </Field>
                <Field>
                  <label>Telephone</label>
                  <input value={hotelDraft.phone} onChange={(e) => updateHotelField('phone', e.target.value)} />
                </Field>
                <Field>
                  <label>Adresse</label>
                  <input value={hotelDraft.address} onChange={(e) => updateHotelField('address', e.target.value)} />
                </Field>
                <Field style={{ gridColumn: '1 / -1' }}>
                  <label>Tagline</label>
                  <TextArea value={hotelDraft.tagline} onChange={(e) => updateHotelField('tagline', e.target.value)} />
                </Field>
                <Field style={{ gridColumn: '1 / -1' }}>
                  <label>Description courte</label>
                  <TextArea value={hotelDraft.description} onChange={(e) => updateHotelField('description', e.target.value)} />
                </Field>
              </FormGrid>
            </Card>

            <Card $span={12}>
              <SectionHeader>
                <div>
                  <h3>
                    <Waves size={18} />
                    Activites a cote
                  </h3>
                </div>
                <button className="btn btn-secondary" onClick={() => addArrayItem('activities', createActivity)}>
                  <Plus size={16} />
                  Ajouter une activite
                </button>
              </SectionHeader>
              <List>
                {contentDraft.activities.map((activity, index) => (
                  <ItemCard key={activity.id}>
                    <ButtonRow style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" onClick={() => removeArrayItem('activities', index)}>
                        <Trash2 size={16} />
                        Supprimer
                      </button>
                    </ButtonRow>
                    <FormGrid>
                      <Field>
                        <label>Titre</label>
                        <input value={activity.title} onChange={(e) => updateArrayItem('activities', index, 'title', e.target.value)} />
                      </Field>
                      <Field>
                        <label>Badge</label>
                        <input value={activity.badge} onChange={(e) => updateArrayItem('activities', index, 'badge', e.target.value)} />
                      </Field>
                      <Field>
                        <label>Resume court</label>
                        <TextArea value={activity.shortText} onChange={(e) => updateArrayItem('activities', index, 'shortText', e.target.value)} />
                      </Field>
                      <Field>
                        <label>Highlight</label>
                        <input value={activity.highlight} onChange={(e) => updateArrayItem('activities', index, 'highlight', e.target.value)} />
                      </Field>
                      <Field style={{ gridColumn: '1 / -1' }}>
                        <label>Description</label>
                        <TextArea value={activity.description} onChange={(e) => updateArrayItem('activities', index, 'description', e.target.value)} />
                      </Field>
                      <Field style={{ gridColumn: '1 / -1' }}>
                        <label>Image URL</label>
                        <input value={activity.image} onChange={(e) => updateArrayItem('activities', index, 'image', e.target.value)} />
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload('activities', index, 'image', e.target.files?.[0])} />
                        <PreviewImage $image={activity.image} />
                      </Field>
                    </FormGrid>
                  </ItemCard>
                ))}
              </List>
            </Card>

            <Card $span={12}>
              <SectionHeader>
                <div>
                  <h3>
                    <MapPin size={18} />
                    Photos de Banyuls
                  </h3>
                </div>
                <button className="btn btn-secondary" onClick={() => addArrayItem('banyulsHighlights', createHighlight)}>
                  <Plus size={16} />
                  Ajouter un visuel
                </button>
              </SectionHeader>
              <List>
                {contentDraft.banyulsHighlights.map((item, index) => (
                  <ItemCard key={item.id}>
                    <ButtonRow style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" onClick={() => removeArrayItem('banyulsHighlights', index)}>
                        <Trash2 size={16} />
                        Supprimer
                      </button>
                    </ButtonRow>
                    <FormGrid>
                      <Field>
                        <label>Titre</label>
                        <input value={item.title} onChange={(e) => updateArrayItem('banyulsHighlights', index, 'title', e.target.value)} />
                      </Field>
                      <Field>
                        <label>Texte</label>
                        <TextArea value={item.text} onChange={(e) => updateArrayItem('banyulsHighlights', index, 'text', e.target.value)} />
                      </Field>
                      <Field style={{ gridColumn: '1 / -1' }}>
                        <label>Image URL</label>
                        <input value={item.image} onChange={(e) => updateArrayItem('banyulsHighlights', index, 'image', e.target.value)} />
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload('banyulsHighlights', index, 'image', e.target.files?.[0])} />
                        <PreviewImage $image={item.image} />
                      </Field>
                    </FormGrid>
                  </ItemCard>
                ))}
              </List>
            </Card>
          </Grid>
        )}

        {activeTab === 'reservations' && (
          <Grid>
            <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <SectionHeader>
                <div>
                  <h2>
                    <Calendar size={18} />
                    Dernieres reservations
                  </h2>
                  <p>Vue simple sur les demandes et confirmations.</p>
                </div>
              </SectionHeader>
              <ReservationList>
                {[...bookingRequests, ...bookings].slice(0, 10).map((item) => (
                  <ReservationCard key={`${item.id}-${item.guestName}`}>
                    <div>
                      <strong>{item.guestName}</strong>
                      <p>
                        Appartement #{item.roomId} · {item.checkIn} → {item.checkOut}
                      </p>
                      <p>{item.totalPrice} EUR · {item.email}</p>
                    </div>
                    <Status $status={item.status}>{item.status}</Status>
                  </ReservationCard>
                ))}
              </ReservationList>
            </Card>
          </Grid>
        )}
      </Inner>
    </Page>
  )
}

export default AdminDashboard
