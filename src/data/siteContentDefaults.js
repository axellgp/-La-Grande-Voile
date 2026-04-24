import { getPublicImagePath } from '../utils/imageUtils'

export const defaultHotelSettings = {
  name: 'La Grande Voile',
  description: 'Residence de standing a Banyuls-sur-Mer, face a la baie et a quelques pas du coeur du village.',
  tagline:
    "La Grande Voile marie l'intimite d'un appartement de luxe, l'elegance du littoral catalan et la sensation rare d'un sejour les yeux tournes vers la mer.",
  address: '45 Avenue de la Republique, 66650 Banyuls-sur-Mer, France',
  phone: '06 87 82 10 16',
  email: 'contact@lagrandevoile.fr',
  website: 'https://www.lagrandevoile.fr',
  images: [
    getPublicImagePath('images/appartements/vaisseau-amiral/SALON-VAISSEAU-AMIRAL.png'),
    getPublicImagePath('images/appartements/caravelle/SALON-CARAVELLE.png'),
    getPublicImagePath('images/appartements/goelette/SEJOUR-GOELETTE.png'),
  ],
  policies: {
    checkIn: '16:00',
    checkOut: '10:00',
    cancellation: "Annulation gratuite jusqu'a 7 jours avant l'arrivee",
    children: 'Les enfants sont les bienvenus',
    pets: 'Animaux non admis',
    deposit: "Caution de 500 EUR demandee a l'arrivee",
  },
  features: [
    'Ascenseur dans la residence',
    'WiFi gratuit dans tous les appartements',
    'Vue mer exceptionnelle',
    'Terrasses et balcons prives',
    'Equipements haut de gamme',
    'Proximite plage et centre-ville',
  ],
}

export const defaultSiteContent = {
  hero: {
    eyebrow: 'Residence de luxe a Banyuls-sur-Mer',
    title: 'La mer en premiere ligne. Le confort en signature.',
    subtitle: 'Une adresse confidentielle sur la Cote Vermeille pour vivre Banyuls avec plus de calme, plus de lumiere et plus de style.',
    description:
      "La Grande Voile accueille des sejours haut de gamme dans des appartements spacieux, ouverts sur la baie, entre reserve marine, vignobles en terrasses et art de vivre mediterraneen.",
    announcementLabel: 'Annonce du moment',
    announcementText:
      "Ouverture de la saison 2026 : nouveaux visuels, nouvelle presentation et experiences mer & plongee mises en avant.",
    primaryCta: 'Voir les appartements',
    secondaryCta: 'Demander un sejour',
    backgroundImage: getPublicImagePath('images/editorial/banyuls-panorama.jpg'),
    foregroundImage: getPublicImagePath('images/editorial/banyuls-bay.jpg'),
  },
  featuredAnnouncements: [
    {
      title: 'Reserve marine a proximite',
      text: 'Une base ideale pour les plongees, randonnees palmées et sorties mer autour de Banyuls-Cerbere.',
    },
    {
      title: 'Atmosphere residence privee',
      text: 'De grands volumes, des terrasses et une mise en scene plus editoriale pour valoriser le lieu.',
    },
    {
      title: 'Sejour sur mesure',
      text: 'Depuis le menu admin, photos, annonces et activites deviennent maintenant modifiables sans toucher au code.',
    },
  ],
  activitiesIntro: {
    eyebrow: 'Autour de la residence',
    title: 'Des experiences qui prolongent vraiment le sejour.',
    description:
      'Plongee, sorties mer, vignobles, culture catalane et decouvertes de la baie composent le vrai decor de La Grande Voile.',
  },
  activities: [
    {
      id: 'diving',
      title: 'Plongee dans la reserve marine',
      badge: 'Experience signature',
      shortText: 'Sorties accompagnees, observation des fonds et immersion dans un des grands marqueurs de Banyuls.',
      description:
        "Banyuls-Cerbere est une destination reconnue pour la plongee. Le site peut maintenant mettre cet univers en avant avec des visuels plus credibles et une narration moins generique.",
      image: getPublicImagePath('images/editorial/activity-diving.jpg'),
      highlight: 'Reserve marine',
    },
    {
      id: 'kayak',
      title: 'Kayak, balade et mer ouverte',
      badge: 'Sorties mer',
      shortText: 'Pour longer la cote, changer de perspective et ressentir le relief depuis l eau.',
      description:
        "Le littoral prend une toute autre allure vu depuis la mer. L'activite est ideale pour enrichir le sejour avec un volet plus vivant et plus premium.",
      image: getPublicImagePath('images/editorial/activity-kayak.jpg'),
      highlight: 'Cote Vermeille',
    },
    {
      id: 'vineyards',
      title: 'Vignobles de Banyuls',
      badge: 'Terroir',
      shortText: 'Terrasses, schistes, degustations et panorama : une experience typiquement banyulencque.',
      description:
        'Les vignes en terrasses racontent immediatement le territoire. Elles donnent au site un ancrage local plus fort et plus exclusif.',
      image: getPublicImagePath('images/editorial/banyuls-vineyards.jpg'),
      highlight: 'Vins & paysages',
    },
  ],
  banyulsIntro: {
    eyebrow: 'Destination',
    title: 'Banyuls, plus qu un decor de carte postale.',
    description:
      "Entre village, mer, montagne et patrimoine, la destination merite une presentation plus fine, plus chic et plus coherente avec une residence de luxe.",
  },
  banyulsHighlights: [
    {
      id: 'bay',
      title: 'La baie et le front de mer',
      text: 'Une situation rare, baignee de lumiere, qui donne son rythme a toute la residence.',
      image: getPublicImagePath('images/editorial/banyuls-bay.jpg'),
    },
    {
      id: 'panorama',
      title: 'Le panorama de Banyuls',
      text: 'Le village, la courbe de la baie et les reliefs de la Cote Vermeille composent une image forte.',
      image: getPublicImagePath('images/editorial/banyuls-panorama.jpg'),
    },
    {
      id: 'vineyards',
      title: 'Les vignes en terrasses',
      text: "L'une des grandes signatures visuelles et culturelles du territoire, entre mer et schiste.",
      image: getPublicImagePath('images/editorial/banyuls-vineyards.jpg'),
    },
  ],
  about: {
    eyebrow: 'Esprit maison',
    heroTitle: 'Une residence de luxe qui doit raconter un vrai lieu.',
    heroText:
      "La Grande Voile n'est pas un simple hebergement. C'est une adresse a mettre en scene avec precision : la baie, la reserve marine, les grands appartements et l'elegance catalane.",
    storyTitle: 'Le cap editorial',
    storyParagraphs: [
      "Le nouveau site cherche moins l'effet automatique et davantage une sensation de residence haut de gamme : plus de respiration, plus de lumiere et un vrai travail sur le ton.",
      "L'objectif est de montrer que le luxe ici ne passe pas par l'ostentation, mais par l'emplacement, les volumes, la vue, le calme et l'acces direct a un territoire exceptionnel.",
    ],
    image: getPublicImagePath('images/editorial/banyuls-bay.jpg'),
  },
  contact: {
    eyebrow: 'Contact & sejour',
    title: 'Preparer un sejour a La Grande Voile',
    description:
      "Le contact doit inspirer confiance, donner une impression de service sur mesure et rester simple a parcourir pour les demandes de sejour ou d'information.",
  },
  photoCredits: [
    {
      id: 'banyuls-panorama',
      label: 'Banyuls panorama',
      author: 'cedric.lacrambe / Wikimedia Commons',
      license: 'CC BY-SA 4.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Banyuls_sur_mer_6.jpg',
    },
    {
      id: 'banyuls-bay',
      label: 'Banyuls bay',
      author: 'Jorge Franganillo / Wikimedia Commons',
      license: 'CC BY 2.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Banyuls-sur-Mer_(51020015627).jpg',
    },
    {
      id: 'banyuls-vineyards',
      label: 'Banyuls vineyards',
      author: 'Mfield, via Wikimedia Commons',
      license: 'CC BY 2.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vineyards_in_Banyuls.jpg',
    },
    {
      id: 'activity-diving',
      label: 'Diving activity',
      author: 'Francisco Davids / Pexels',
      license: 'Pexels License',
      sourceUrl: 'https://www.pexels.com/photo/scuba-divers-under-the-sea-14267355/',
    },
    {
      id: 'activity-kayak',
      label: 'Kayak activity',
      author: 'Zeki Okur / Pexels',
      license: 'Pexels License',
      sourceUrl: 'https://www.pexels.com/photo/kayaks-on-a-sea-19155944/',
    },
  ],
}

export const mergeDeep = (base, override) => {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base
  }

  if (typeof base !== 'object' || base === null) {
    return override ?? base
  }

  const result = { ...base }

  Object.keys(override || {}).forEach((key) => {
    const baseValue = base[key]
    const overrideValue = override[key]

    if (
      typeof baseValue === 'object' &&
      baseValue !== null &&
      !Array.isArray(baseValue)
    ) {
      result[key] = mergeDeep(baseValue, overrideValue || {})
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue
    }
  })

  return result
}
