import React, { createContext, useContext, useState, useEffect } from 'react'
import { vaisseauAmiralImages, vaisseauAmiralPlan } from '../assets/images/appartements/vaisseau-amiral'
import { caravelleImages, caravellePlan } from '../assets/images/appartements/caravelle'
import { goeletteImages, goelettePlan } from '../assets/images/appartements/goelette'
import { quatreMatsImages, quatreMatsPlan } from '../assets/images/appartements/quatre-mats'
import { drakkarImages, drakkarPlan } from '../assets/images/appartements/drakkar'
import { jonqueImages, jonquePlan } from '../assets/images/appartements/jonque'

const BookingContext = createContext()

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([])
  const [bookingRequests, setBookingRequests] = useState([])
  const [rooms, setRooms] = useState([])
  const [siteContent, setSiteContent] = useState({
    hero: {
      title: 'La Grande Voile',
      subtitle: 'Résidence de standing à Banyuls-sur-Mer',
      description: 'LA GRANDE VOILE à BANYULS SUR MER allie parfaitement l\'intimité et le calme d\'un bel appartement et la convivialité d\'un authentique village catalan.',
      backgroundImage: '/images/hero/hero1.jpg'
    },
    about: {
      title: 'Une expérience unique',
      description: 'Cette Résidence de Standing, les pieds dans l\'eau, vous accueille dans ses grands appartements du T2 (40m²+ un balcon-terrasse) au T5/6 (180m² avec terrasse) pour partager les moments privilégiés de vos vacances en couple en famille ou entre amis.',
      features: [
        'Chambre avec salle d\'eau ou de bain privative',
        'Ascenseur dans la résidence',
        'Vue sur la mer exceptionnelle',
        'Terrasse ou balcon privé',
        'Télé et WiFi gratuit',
        'Équipements haut de gamme'
      ]
    },
    contact: {
      title: 'Contactez-nous',
      description: 'Pour toute demande d\'information, vous pouvez nous contacter',
      address: '45 Avenue de la République, 66650 Banyuls-sur-Mer, France',
      phone: '06 87 82 10 16',
      email: 'contact@lagrandevoile.fr'
    }
  })
  const [hotelSettings, setHotelSettings] = useState({
    name: 'La Grande Voile',
    description: 'Résidence de standing à Banyuls-sur-Mer - Les pieds dans l\'eau',
    tagline: 'LA GRANDE VOILE à BANYULS SUR MER allie parfaitement l\'intimité et le calme d\'un bel appartement et la convivialité d\'un authentique village catalan.',
    address: '45 Avenue de la République, 66650 Banyuls-sur-Mer, France',
    phone: '06 87 82 10 16',
    email: 'contact@lagrandevoile.fr',
    website: 'https://www.lagrandevoile.fr',
    images: [
      '/images/appartements/vaisseau-amiral/SALON-VAISSEAU-AMIRAL.png',
      '/images/appartements/caravelle/SALON-CARAVELLE.png',
      '/images/appartements/goelette/SEJOUR-GOELETTE.png'
    ],
    policies: {
      checkIn: '16:00',
      checkOut: '10:00',
      cancellation: 'Annulation gratuite jusqu\'à 7 jours avant l\'arrivée',
      children: 'Les enfants sont les bienvenus',
      pets: 'Animaux non admis',
      deposit: 'Caution de 500€ demandée à l\'arrivée'
    },
    features: [
      'Ascenseur dans la résidence',
      'WiFi gratuit dans tous les appartements',
      'Vue mer exceptionnelle',
      'Terrasses et balcons privés',
      'Equipements haut de gamme',
      'Proximité plage et centre-ville'
    ]
  })

  // Real apartment data from La Grande Voile website
  const realApartments = [
    {
      id: 1,
      name: 'Le Vaisseau Amiral',
      type: 'T5/6',
      capacity: 12,
      size: '180m²',
      price: {
        lowSeason: 1800,    // 10/10 - 01/05
        midSeason: 1900,    // 30/04 - 08/07 & 28/08 - 09/10
        highSeason: 2000    // 09/07 - 27/08
      },
      description: 'Embarquez à bord de notre « VAISSEAU AMIRAL », vous passerez des moments inoubliables face à la magnifique baie de Banyuls. 5 chambres dont une de 27m² en mezzanine, 4 salles de bain et 3 toilettes, un vaste séjour, une cuisine équipée et une terrasse.',
      amenities: ['Vue mer exceptionnelle', 'Grande terrasse', '5 chambres', '4 salles de bain', '3 toilettes', 'Cuisine équipée', 'Séjour spacieux', 'Mezzanine 27m²', 'WiFi', 'Ascenseur', 'Lave-vaisselle', 'Lave-linge'],
      images: vaisseauAmiralImages,
      available: true,
      plan: vaisseauAmiralPlan,
      featured: true
    },
    {
      id: 2,
      name: 'La Caravelle',
      type: 'T3',
      capacity: 6,
      size: '66m²',
      price: {
        lowSeason: 1200,
        midSeason: 1300,
        highSeason: 1400
      },
      description: 'À bord de notre CARAVELLE vous apprécierez la grande terrasse (30m²). Vous vivrez des moments privilégiés et conviviaux. Deux chambres avec vue sur la mer (salle d\'eau et toilette pour chaque chambre), un séjour-cuisine et la terrasse sur les collines.',
      amenities: ['Vue mer', 'Grande terrasse 30m²', '2 chambres', '2 salles d\'eau privatives', '2 toilettes', 'Séjour-cuisine', 'Vue sur les collines', 'WiFi', 'Ascenseur', 'Lave-vaisselle', 'Lave-linge'],
      images: caravelleImages,
      available: true,
      plan: caravellePlan
    },
    {
      id: 3,
      name: 'La Goélette',
      type: 'T3',
      capacity: 6,
      size: '60m²',
      price: {
        lowSeason: 1200,
        midSeason: 1300,
        highSeason: 1400
      },
      description: 'Vous n\'oublierez pas le beau patio (33m²) de notre T3 GOÉLETTE. Vous pourrez vous y détendre entre soleil et verdure. Deux chambres (salle d\'eau et toilette pour chaque chambre), un séjour-cuisine et un patio.',
      amenities: ['Patio privé 33m²', '2 chambres', '2 salles d\'eau privatives', '2 toilettes', 'Séjour-cuisine', 'Espace verdure', 'WiFi', 'Ascenseur', 'Lave-vaisselle', 'Lave-linge'],
      images: goeletteImages,
      available: true,
      plan: goelettePlan
    },
    {
      id: 4,
      name: 'Le 4 Mâts',
      type: 'T3',
      capacity: 8,
      size: '75m²',
      price: {
        lowSeason: 1200,
        midSeason: 1300,
        highSeason: 1400
      },
      description: 'Notre « 4 MÂTS » vous accueillera dans un appartement spacieux et chaleureux (75m²). Deux chambres (salle d\'eau et toilette pour chaque chambre), un séjour-cuisine, salon. Dans toutes les pièces vous savourerez le plaisir de la vue incomparable de la baie de Banyuls.',
      amenities: ['Vue mer incomparable', 'Appartement spacieux', '2 chambres', '2 salles d\'eau privatives', '2 toilettes', 'Séjour-cuisine', 'Salon séparé', 'Vue baie de Banyuls', 'WiFi', 'Ascenseur', 'Lave-vaisselle', 'Lave-linge'],
      images: quatreMatsImages,
      available: true,
      plan: quatreMatsPlan
    },
    {
      id: 5,
      name: 'Le Drakkar',
      type: 'T3',
      capacity: 4,
      size: '60m²',
      price: {
        lowSeason: 1200,
        midSeason: 1300,
        highSeason: 1400
      },
      description: 'Notre DRAKKAR allie la mer et la montagne : vous profiterez d\'un séjour et d\'une terrasse vue sur mer et des chambres sur la colline. Deux chambres (avec toilette et salle d\'eau pour chaque chambre), Un séjour-cuisine.',
      amenities: ['Vue mer et montagne', 'Terrasse vue mer', '2 chambres', '2 salles d\'eau privatives', '2 toilettes', 'Séjour-cuisine', 'Vue sur colline', 'WiFi', 'Ascenseur', 'Lave-vaisselle', 'Lave-linge'],
      images: drakkarImages,
      available: false,
      plan: drakkarPlan
    },
    {
      id: 6,
      name: 'La Jonque',
      type: 'T2',
      capacity: 2,
      size: '40m²',
      price: {
        lowSeason: 800,
        midSeason: 900,
        highSeason: 1000
      },
      description: 'Votre séjour dans notre JONQUE (T2) sera placé sous le signe du confort et de la détente avec vue imprenable sur la baie de Banyuls dans chaque pièce. La mer à vos pieds : Une expérience délicieuse. 1 chambre avec balcon Terrasse, séjour-cuisine.',
      amenities: ['Vue imprenable baie de Banyuls', 'Balcon-terrasse', '1 chambre', 'Séjour-cuisine', 'Vue mer dans chaque pièce', 'Les pieds dans l\'eau', 'WiFi', 'Ascenseur', 'Lave-vaisselle', 'Kitchenette'],
      images: jonqueImages,
      available: true,
      plan: jonquePlan
    }
  ]

  // Mock bookings data with realistic French names and dates
  const mockBookings = [
    {
      id: 1,
      roomId: 1,
      guestName: 'Famille Dubois',
      email: 'marie.dubois@gmail.com',
      phone: '06 12 34 56 78',
      checkIn: '2025-09-15',
      checkOut: '2025-09-22',
      guests: 8,
      totalPrice: 14000,
      status: 'confirmed',
      createdAt: '2025-06-20',
      requests: 'Arrivée tardive prévue vers 20h',
      season: 'midSeason'
    },
    {
      id: 2,
      roomId: 2,
      guestName: 'Pierre et Sophie Martin',
      email: 'martin.famille@hotmail.fr',
      phone: '06 98 76 54 32',
      checkIn: '2025-10-05',
      checkOut: '2025-10-12',
      guests: 4,
      totalPrice: 9800,
      status: 'confirmed',
      createdAt: '2025-06-22',
      requests: 'Lit bébé nécessaire',
      season: 'lowSeason'
    },
    {
      id: 3,
      roomId: 6,
      guestName: 'Claire Rousseau',
      email: 'claire.rousseau@outlook.com',
      phone: '06 45 67 89 12',
      checkIn: '2025-09-10',
      checkOut: '2025-09-17',
      guests: 2,
      totalPrice: 6300,
      status: 'pending',
      createdAt: '2025-06-25',
      requests: 'Voyage de noces',
      season: 'midSeason'
    },
    {
      id: 4,
      roomId: 3,
      guestName: 'Famille Garcia',
      email: 'garcia.family@gmail.com',
      phone: '06 78 90 12 34',
      checkIn: '2025-05-28',
      checkOut: '2025-06-05',
      guests: 6,
      totalPrice: 9100,
      status: 'confirmed',
      createdAt: '2025-05-15',
      requests: 'Végétariens',
      season: 'midSeason'
    },
    {
      id: 5,
      roomId: 4,
      guestName: 'Antoine Lefebvre',
      email: 'a.lefebvre@wanadoo.fr',
      phone: '06 23 45 67 89',
      checkIn: '2025-10-12',
      checkOut: '2025-10-19',
      guests: 6,
      totalPrice: 8400,
      status: 'cancelled',
      createdAt: '2025-06-10',
      requests: 'Annulé pour raisons personnelles',
      season: 'lowSeason'
    },
    // NOUVELLES RÉSERVATIONS JUILLET 2025
    {
      id: 6,
      roomId: 1,
      guestName: 'Famille Benoit',
      email: 'benoit.vacances@free.fr',
      phone: '06 11 33 55 77',
      checkIn: '2025-07-05',
      checkOut: '2025-07-12',
      guests: 12,
      totalPrice: 14000,
      status: 'confirmed',
      createdAt: '2025-06-15',
      requests: 'Groupe familial - 3 générations',
      season: 'highSeason'
    },
    {
      id: 7,
      roomId: 2,
      guestName: 'Thomas et Julie Petit',
      email: 'tj.petit@orange.fr',
      phone: '06 44 77 22 88',
      checkIn: '2025-07-19',
      checkOut: '2025-07-26',
      guests: 8,
      totalPrice: 12600,
      status: 'confirmed',
      createdAt: '2025-06-18',
      requests: 'Avec nos 2 enfants et grands-parents',
      season: 'highSeason'
    },
    {
      id: 8,
      roomId: 3,
      guestName: 'Émilie Moreau',
      email: 'emilie.m@laposte.net',
      phone: '06 66 99 44 11',
      checkIn: '2025-07-12',
      checkOut: '2025-07-19',
      guests: 6,
      totalPrice: 9800,
      status: 'confirmed',
      createdAt: '2025-06-12',
      requests: 'Réunion de famille entre cousins',
      season: 'highSeason'
    },
    {
      id: 9,
      roomId: 5,
      guestName: 'Julien Laforge',
      email: 'j.laforge@gmail.com',
      phone: '06 88 22 66 33',
      checkIn: '2025-07-26',
      checkOut: '2025-08-02',
      guests: 4,
      totalPrice: 8400,
      status: 'pending',
      createdAt: '2025-06-28',
      requests: 'Première fois à Banyuls',
      season: 'highSeason'
    },
    // RÉSERVATIONS ADDITIONNELLES JUILLET 2025
    {
      id: 14,
      roomId: 4,
      guestName: 'Antoine et Lucie Moreau',
      email: 'al.moreau@free.fr',
      phone: '06 77 88 99 00',
      checkIn: '2025-07-01',
      checkOut: '2025-07-08',
      guests: 6,
      totalPrice: 9800,
      status: 'confirmed',
      createdAt: '2025-05-20',
      requests: 'Début des vacances d\'été',
      season: 'highSeason'
    },
    {
      id: 15,
      roomId: 6,
      guestName: 'Martine et Robert Dupont',
      email: 'mrdupont@orange.fr',
      phone: '06 44 55 66 77',
      checkIn: '2025-07-03',
      checkOut: '2025-07-10',
      guests: 2,
      totalPrice: 5600,
      status: 'confirmed',
      createdAt: '2025-05-25',
      requests: 'Anniversaire de mariage - 40 ans',
      season: 'highSeason'
    },
    {
      id: 16,
      roomId: 2,
      guestName: 'Famille Benoit',
      email: 'fam.benoit@gmail.com',
      phone: '06 22 33 44 55',
      checkIn: '2025-07-05',
      checkOut: '2025-07-12',
      guests: 8,
      totalPrice: 11200,
      status: 'confirmed',
      createdAt: '2025-05-30',
      requests: 'Vacances avec grands-parents',
      season: 'highSeason'
    },
    {
      id: 17,
      roomId: 1,
      guestName: 'Célébration Anniversaire Emma',
      email: 'emma.celebration@hotmail.fr',
      phone: '06 99 88 77 66',
      checkIn: '2025-07-14',
      checkOut: '2025-07-21',
      guests: 12,
      totalPrice: 15400,
      status: 'confirmed',
      createdAt: '2025-06-01',
      requests: '18 ans d\'Emma - Fête de famille',
      season: 'highSeason'
    },
    {
      id: 18,
      roomId: 3,
      guestName: 'Charles et Brigitte Lemoine',
      email: 'cb.lemoine@wanadoo.fr',
      phone: '06 11 99 88 77',
      checkIn: '2025-07-08',
      checkOut: '2025-07-15',
      guests: 4,
      totalPrice: 8400,
      status: 'pending',
      createdAt: '2025-06-15',
      requests: 'Découverte de la région catalane',
      season: 'highSeason'
    },
    {
      id: 19,
      roomId: 5,
      guestName: 'Amis de Montpellier',
      email: 'groupe.montpellier@sfr.fr',
      phone: '06 66 55 44 33',
      checkIn: '2025-07-21',
      checkOut: '2025-07-26',
      guests: 6,
      totalPrice: 7000,
      status: 'confirmed',
      createdAt: '2025-06-10',
      requests: 'Week-end prolongé entre amis',
      season: 'highSeason'
    },
    {
      id: 20,
      roomId: 6,
      guestName: 'Jean-Paul et Marie Girard',
      email: 'jpmgirard@laposte.net',
      phone: '06 88 77 66 55',
      checkIn: '2025-07-28',
      checkOut: '2025-08-04',
      guests: 2,
      totalPrice: 5600,
      status: 'confirmed',
      createdAt: '2025-06-18',
      requests: 'Retraite paisible face à la mer',
      season: 'highSeason'
    },
    {
      id: 21,
      roomId: 2,
      guestName: 'Famille Roussel',
      email: 'roussel.family@orange.fr',
      phone: '06 33 22 11 00',
      checkIn: '2025-07-19',
      checkOut: '2025-07-26',
      guests: 6,
      totalPrice: 9800,
      status: 'pending',
      createdAt: '2025-06-25',
      requests: 'Première fois en Méditerranée',
      season: 'highSeason'
    },
    // NOUVELLES RÉSERVATIONS SEPTEMBRE 2025
    {
      id: 10,
      roomId: 2,
      guestName: 'Famille Schneider',
      email: 'schneider.family@sfr.fr',
      phone: '06 33 88 11 99',
      checkIn: '2025-09-01',
      checkOut: '2025-09-08',
      guests: 8,
      totalPrice: 11200,
      status: 'confirmed',
      createdAt: '2025-06-20',
      requests: 'Fin des vacances scolaires',
      season: 'midSeason'
    },
    {
      id: 11,
      roomId: 4,
      guestName: 'Catherine et Michel Roux',
      email: 'cm.roux@neuf.fr',
      phone: '06 55 22 77 44',
      checkIn: '2025-09-08',
      checkOut: '2025-09-15',
      guests: 4,
      totalPrice: 8400,
      status: 'confirmed',
      createdAt: '2025-06-22',
      requests: 'Retraités, calme souhaité',
      season: 'midSeason'
    },
    {
      id: 12,
      roomId: 6,
      guestName: 'Sarah et David Cohen',
      email: 'sarahdavid@hotmail.com',
      phone: '06 77 44 88 22',
      checkIn: '2025-09-22',
      checkOut: '2025-09-29',
      guests: 2,
      totalPrice: 5600,
      status: 'confirmed',
      createdAt: '2025-06-24',
      requests: 'Week-end prolongé romantique',
      season: 'midSeason'
    },
    {
      id: 13,
      roomId: 1,
      guestName: 'Groupe Amis Toulouse',
      email: 'amis.toulouse@yahoo.fr',
      phone: '06 99 11 66 33',
      checkIn: '2025-09-29',
      checkOut: '2025-10-06',
      guests: 10,
      totalPrice: 12600,
      status: 'pending',
      createdAt: '2025-06-27',
      requests: 'Groupe de 5 couples d\'amis',
      season: 'lowSeason'
    }
  ]

  // Mock booking requests data
  const mockBookingRequests = [
    {
      id: 1001,
      roomId: 1,
      guestName: 'Famille Leclerc',
      email: 'famille.leclerc@gmail.com',
      phone: '06 11 22 33 44',
      checkIn: '2025-08-15',
      checkOut: '2025-08-22',
      guests: 10,
      totalPrice: 15400,
      status: 'pending',
      createdAt: '2025-06-28',
      requests: 'Séjour anniversaire de mariage - 25 ans',
      season: 'highSeason'
    },
    {
      id: 1002,
      roomId: 3,
      guestName: 'Antoine et Camille Moreau',
      email: 'moreau.vacances@hotmail.fr',
      phone: '06 55 44 33 22',
      checkIn: '2025-07-10',
      checkOut: '2025-07-17',
      guests: 6,
      totalPrice: 9800,
      status: 'pending',
      createdAt: '2025-06-27',
      requests: 'Première visite à Banyuls, conseils appréciés',
      season: 'highSeason'
    },
    {
      id: 1003,
      roomId: 6,
      guestName: 'Paul Girard',
      email: 'paul.girard@outlook.com',
      phone: '06 77 88 99 00',
      checkIn: '2025-09-05',
      checkOut: '2025-09-12',
      guests: 2,
      totalPrice: 5600,
      status: 'pending',
      createdAt: '2025-06-26',
      requests: 'Séjour romantique',
      season: 'midSeason'
    },
    // NOUVELLES DEMANDES JUILLET 2025
    {
      id: 1004,
      roomId: 4,
      guestName: 'Famille Blanchard',
      email: 'blanchard.famille@gmail.com',
      phone: '06 88 44 77 11',
      checkIn: '2025-07-01',
      checkOut: '2025-07-08',
      guests: 6,
      totalPrice: 9800,
      status: 'pending',
      createdAt: '2025-06-28',
      requests: 'Vacances début juillet avec adolescents',
      season: 'highSeason'
    },
    {
      id: 1005,
      roomId: 5,
      guestName: 'Sylvie et Robert Durand',
      email: 'durand.sr@wanadoo.fr',
      phone: '06 22 66 88 44',
      checkIn: '2025-07-15',
      checkOut: '2025-07-22',
      guests: 4,
      totalPrice: 8400,
      status: 'pending',
      createdAt: '2025-06-28',
      requests: 'Couple avec 2 enfants, première fois en appartement',
      season: 'highSeason'
    },
    {
      id: 1006,
      roomId: 6,
      guestName: 'Maxime et Lisa Bernard',
      email: 'maxlisa@outlook.fr',
      phone: '06 99 33 77 22',
      checkIn: '2025-07-22',
      checkOut: '2025-07-29',
      guests: 2,
      totalPrice: 5600,
      status: 'pending',
      createdAt: '2025-06-28',
      requests: 'Lune de miel tardive',
      season: 'highSeason'
    },
    // DEMANDES ADDITIONNELLES JUILLET 2025
    {
      id: 1011,
      roomId: 4,
      guestName: 'Philippe et Nathalie Dubois',
      email: 'pn.dubois@wanadoo.fr',
      phone: '06 11 44 77 88',
      checkIn: '2025-07-02',
      checkOut: '2025-07-09',
      guests: 5,
      totalPrice: 8400,
      status: 'pending',
      createdAt: '2025-06-29',
      requests: 'Vacances début juillet - flexibles sur les dates',
      season: 'highSeason'
    },
    {
      id: 1012,
      roomId: 1,
      guestName: 'Cousinade Famille Lambert',
      email: 'cousinade.lambert@gmail.com',
      phone: '06 88 99 00 11',
      checkIn: '2025-07-07',
      checkOut: '2025-07-14',
      guests: 11,
      totalPrice: 15400,
      status: 'pending',
      createdAt: '2025-06-29',
      requests: 'Réunion de famille élargie - événement spécial',
      season: 'highSeason'
    },
    {
      id: 1013,
      roomId: 3,
      guestName: 'Samuel et Jennifer Thompson',
      email: 'samjen.thompson@outlook.com',
      phone: '06 66 33 88 55',
      checkIn: '2025-07-16',
      checkOut: '2025-07-23',
      guests: 4,
      totalPrice: 8400,
      status: 'pending',
      createdAt: '2025-06-29',
      requests: 'Couple anglais - première fois en France du Sud',
      season: 'highSeason'
    },
    {
      id: 1014,
      roomId: 5,
      guestName: 'Groupe Amis Lyon',
      email: 'amis.lyon69@free.fr',
      phone: '06 22 77 44 99',
      checkIn: '2025-07-23',
      checkOut: '2025-07-30',
      guests: 6,
      totalPrice: 9800,
      status: 'pending',
      createdAt: '2025-06-29',
      requests: 'Groupe d\'amis de longue date - vacances annuelles',
      season: 'highSeason'
    },
    {
      id: 1015,
      roomId: 2,
      guestName: 'Céleste et Henri Vaillant',
      email: 'ch.vaillant@laposte.net',
      phone: '06 55 00 22 77',
      checkIn: '2025-07-30',
      checkOut: '2025-08-06',
      guests: 2,
      totalPrice: 5600,
      status: 'pending',
      createdAt: '2025-06-29',
      requests: 'Couple seniors - besoin de tranquillité',
      season: 'highSeason'
    },
    // NOUVELLES DEMANDES SEPTEMBRE 2025
    {
      id: 1007,
      roomId: 3,
      guestName: 'Famille Morel',
      email: 'morel.family@free.fr',
      phone: '06 44 88 55 11',
      checkIn: '2025-09-12',
      checkOut: '2025-09-19',
      guests: 6,
      totalPrice: 8400,
      status: 'pending',
      createdAt: '2025-06-28',
      requests: 'Retrouvailles familiales annuelles',
      season: 'midSeason'
    },
    {
      id: 1008,
      roomId: 2,
      guestName: 'Groupe Copines Marseille',
      email: 'copines.marseille@hotmail.fr',
      phone: '06 77 22 99 66',
      checkIn: '2025-09-19',
      checkOut: '2025-09-26',
      guests: 8,
      totalPrice: 11200,
      status: 'pending',
      createdAt: '2025-06-28',
      requests: 'Week-end entre amies prolongé',
      season: 'midSeason'
    },
    {
      id: 1009,
      roomId: 5,
      guestName: 'Marc et Claire Fontaine',
      email: 'mc.fontaine@orange.fr',
      phone: '06 33 99 44 77',
      checkIn: '2025-09-26',
      checkOut: '2025-10-03',
      guests: 4,
      totalPrice: 7000,
      status: 'pending',
      createdAt: '2025-06-28',
      requests: 'Vacances de fin septembre au calme',
      season: 'midSeason'
    },
    {
      id: 1010,
      roomId: 1,
      guestName: 'Entreprise TechSud',
      email: 'reservation@techsud.com',
      phone: '04 91 XX XX XX',
      checkIn: '2025-09-03',
      checkOut: '2025-09-06',
      guests: 12,
      totalPrice: 10500,
      status: 'pending',
      createdAt: '2025-06-28',
      requests: 'Séminaire entreprise - team building au bord de mer',
      season: 'midSeason'
    }
  ]

  // Initialize data
  useEffect(() => {
    setRooms(realApartments)
    setBookings(mockBookings)
    setBookingRequests(mockBookingRequests)
  }, [])

  // Utility functions
  const getCurrentSeason = (date) => {
    const checkDate = new Date(date)
    const month = checkDate.getMonth() + 1
    const day = checkDate.getDate()
    
    // High season: 09/07 - 27/08
    if ((month === 7 && day >= 9) || (month === 8 && day <= 27)) {
      return 'highSeason'
    }
    // Mid season: 30/04 - 08/07 & 28/08 - 09/10
    if ((month === 4 && day >= 30) || 
        (month >= 5 && month <= 6) || 
        (month === 7 && day <= 8) ||
        (month === 8 && day >= 28) ||
        (month === 9) ||
        (month === 10 && day <= 9)) {
      return 'midSeason'
    }
    // Low season: 10/10 - 01/05
    return 'lowSeason'
  }

  const getRoomPrice = (roomId, checkIn, checkOut) => {
    const room = rooms.find(r => r.id === roomId)
    if (!room) return 0
    
    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    
    const season = getCurrentSeason(checkIn)
    const pricePerWeek = room.price[season]
    const pricePerNight = pricePerWeek / 7
    
    return Math.round(pricePerNight * nights)
  }

  const isRoomAvailable = (roomId, checkIn, checkOut) => {
    const room = rooms.find(r => r.id === roomId)
    if (!room || !room.available) return false
    
    const startDate = new Date(checkIn)
    const endDate = new Date(checkOut)
    
    const conflictingBookings = bookings.filter(booking => {
      if (booking.roomId !== roomId || booking.status === 'cancelled') return false
      
      const bookingStart = new Date(booking.checkIn)
      const bookingEnd = new Date(booking.checkOut)
      
      return (startDate < bookingEnd && endDate > bookingStart)
    })
    
    return conflictingBookings.length === 0
  }

  // Booking management functions
  const createBookingRequest = (bookingData) => {
    const newRequest = {
      id: Date.now(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      totalPrice: getRoomPrice(bookingData.roomId, bookingData.checkIn, bookingData.checkOut),
      season: getCurrentSeason(bookingData.checkIn)
    }
    
    setBookingRequests(prev => [...prev, newRequest])
    return newRequest
  }

  const approveBookingRequest = (requestId) => {
    const request = bookingRequests.find(req => req.id === requestId)
    if (request) {
      // Move from requests to confirmed bookings
      const newBooking = {
        ...request,
        status: 'confirmed',
        approvedAt: new Date().toISOString().split('T')[0]
      }
      setBookings(prev => [...prev, newBooking])
      setBookingRequests(prev => prev.filter(req => req.id !== requestId))
    }
  }

  const rejectBookingRequest = (requestId, reason = '') => {
    setBookingRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'rejected', rejectionReason: reason }
          : request
      )
    )
  }

  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      totalPrice: getRoomPrice(bookingData.roomId, bookingData.checkIn, bookingData.checkOut),
      season: getCurrentSeason(bookingData.checkIn)
    }
    
    setBookings(prev => [...prev, newBooking])
    return newBooking
  }

  const updateBookingStatus = (bookingId, status) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status }
          : booking
      )
    )
  }

  const updateBooking = (bookingId, updates) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, ...updates }
          : booking
      )
    )
  }

  const cancelBooking = (bookingId) => {
    updateBookingStatus(bookingId, 'cancelled')
  }

  const confirmBooking = (bookingId) => {
    updateBookingStatus(bookingId, 'confirmed')
  }

  // Admin functions for content management
  const updateHotelSettings = (newSettings) => {
    setHotelSettings(prev => ({ ...prev, ...newSettings }))
  }

  const updateSiteContent = (section, content) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...content }
    }))
  }

  const updateRoomData = (roomId, updates) => {
    setRooms(prev => 
      prev.map(room => 
        room.id === roomId 
          ? { ...room, ...updates }
          : room
      )
    )
  }

  const updateRoom = (roomId, updates) => {
    setRooms(prev => 
      prev.map(room => 
        room.id === roomId 
          ? { ...room, ...updates }
          : room
      )
    )
  }

  const addRoom = (roomData) => {
    const newRoom = {
      id: Date.now(),
      ...roomData,
      available: true
    }
    setRooms(prev => [...prev, newRoom])
    return newRoom
  }

  const deleteRoom = (roomId) => {
    setRooms(prev => prev.filter(room => room.id !== roomId))
    // Also cancel any pending bookings for this room
    setBookings(prev => 
      prev.map(booking => 
        booking.roomId === roomId && booking.status === 'pending'
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    )
  }

  // Advanced admin functions
  const deleteBooking = (bookingId) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId))
    setBookingRequests(prev => prev.filter(request => request.id !== bookingId))
  }

  const updateBookingDates = (bookingId, newCheckIn, newCheckOut) => {
    const updates = {
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      totalPrice: getRoomPrice(bookingId, newCheckIn, newCheckOut),
      season: getCurrentSeason(newCheckIn),
      lastModified: new Date().toISOString().split('T')[0]
    }
    updateBooking(bookingId, updates)
  }

  const updateBookingGuest = (bookingId, guestData) => {
    const updates = {
      ...guestData,
      lastModified: new Date().toISOString().split('T')[0]
    }
    updateBooking(bookingId, updates)
  }

  const moveBookingToRoom = (bookingId, newRoomId) => {
    const booking = bookings.find(b => b.id === bookingId)
    if (booking && isRoomAvailable(newRoomId, booking.checkIn, booking.checkOut)) {
      const updates = {
        roomId: newRoomId,
        totalPrice: getRoomPrice(newRoomId, booking.checkIn, booking.checkOut),
        lastModified: new Date().toISOString().split('T')[0]
      }
      updateBooking(bookingId, updates)
      return true
    }
    return false
  }

  // Get available rooms for specific dates
  const getAvailableRooms = (checkIn, checkOut) => {
    return rooms.filter(room => isRoomAvailable(room.id, checkIn, checkOut))
  }

  // Get room occupancy for calendar view
  const getRoomOccupancy = (year, month) => {
    return bookings.filter(booking => {
      if (booking.status === 'cancelled') return false
      
      const bookingStart = new Date(booking.checkIn)
      const bookingEnd = new Date(booking.checkOut)
      const monthStart = new Date(year, month, 1)
      const monthEnd = new Date(year, month + 1, 0)
      
      return !(bookingEnd <= monthStart || bookingStart >= monthEnd)
    })
  }

  // Loyalty program
  const [loyaltyMembers, setLoyaltyMembers] = useState([])
  
  const addLoyaltyPoints = (email, points) => {
    setLoyaltyMembers(prev => {
      const existingMember = prev.find(member => member.email === email)
      if (existingMember) {
        return prev.map(member => 
          member.email === email 
            ? { ...member, points: member.points + points }
            : member
        )
      } else {
        return [...prev, { email, points, joinDate: new Date().toISOString() }]
      }
    })
  }

  const getLoyaltyPoints = (email) => {
    const member = loyaltyMembers.find(member => member.email === email)
    return member ? member.points : 0
  }

  const value = {
    // Data
    rooms,
    apartments: rooms, // Ajout d'un alias pour compatibilité avec le calendrier
    bookings,
    bookingRequests,
    hotelSettings,
    siteContent,
    loyaltyMembers,
    
    // Utility functions
    getCurrentSeason,
    getRoomPrice,
    isRoomAvailable,
    getAvailableRooms,
    getRoomOccupancy,
    
    // Booking functions
    createBooking,
    createBookingRequest,
    approveBookingRequest,
    rejectBookingRequest,
    updateBooking,
    updateBookingStatus,
    cancelBooking,
    confirmBooking,
    deleteBooking,
    updateBookingDates,
    updateBookingGuest,
    moveBookingToRoom,
    
    // Admin functions
    updateHotelSettings,
    updateSiteContent,
    updateRoomData,
    updateRoom,
    addRoom,
    deleteRoom,
    
    // Loyalty functions
    addLoyaltyPoints,
    getLoyaltyPoints
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
