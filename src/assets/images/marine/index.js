// Images marines et sous-marines pour La Grande Voile
import { getPublicImagePath } from '../../../utils/imageUtils';

export const marineImages = {
  // Plongée et vie sous-marine
  diving: {
    underwater: getPublicImagePath('images/marine/underwater.jpg'),
    diver: getPublicImagePath('images/marine/diver.jpg'),
    coral: getPublicImagePath('images/marine/coral.jpg'),
    marine_reserve: getPublicImagePath('images/marine/marine-reserve.jpg')
  },
  
  // Poissons méditerranéens
  fish: {
    merou: getPublicImagePath('images/marine/merou.jpg'),
    sea_bass: getPublicImagePath('images/marine/sea-bass.jpg'),
    dorade: getPublicImagePath('images/marine/dorade.jpg'),
    school_fish: getPublicImagePath('images/marine/underwater.jpg')
  },
  
  // Poulpes et céphalopodes
  octopus: {
    octopus: getPublicImagePath('images/marine/octopus.jpg'),
    seiche: getPublicImagePath('images/marine/seiche.jpg'),
    tentacles: getPublicImagePath('images/marine/octopus.jpg')
  },
  
  // Fonds marins méditerranéens
  seafloor: {
    posidonia: getPublicImagePath('images/marine/posidonia.jpg'),
    rocks: getPublicImagePath('images/marine/rocks.jpg'),
    mediterranean_floor: getPublicImagePath('images/marine/mediterranean-floor.jpg')
  },
  
  // Activités nautiques à Banyuls
  activities: {
    snorkeling: getPublicImagePath('images/marine/snorkeling.jpg'),
    boat_tour: getPublicImagePath('images/marine/boat-tour.jpg'),
    kayak: getPublicImagePath('images/marine/kayak.jpg'),
    sailing: getPublicImagePath('images/marine/sailing.jpg')
  }
}

// Images de plongée et sous-marines
export const divingImages = {
    underwater: getPublicImagePath('images/marine/underwater.jpg'),
    diver: getPublicImagePath('images/marine/diver.jpg'),
    coral: getPublicImagePath('images/marine/coral.jpg'),
    marine_reserve: getPublicImagePath('images/marine/marine-reserve.jpg')
}

// Images de poissons méditerranéens  
export const fishImages = {
    merou: getPublicImagePath('images/marine/merou.jpg'),
    sea_bass: getPublicImagePath('images/marine/sea-bass.jpg'),
    dorade: getPublicImagePath('images/marine/dorade.jpg'),
    school_fish: getPublicImagePath('images/marine/underwater.jpg')
}

// Images de céphalopodes
export const cephalopodImages = {
    octopus: getPublicImagePath('images/marine/octopus.jpg'),
    seiche: getPublicImagePath('images/marine/seiche.jpg'),
    tentacles: getPublicImagePath('images/marine/octopus.jpg')
}

// Images du fond marin
export const seaFloorImages = {
    posidonia: getPublicImagePath('images/marine/posidonia.jpg'),
    rocks: getPublicImagePath('images/marine/rocks.jpg'),
    mediterranean_floor: getPublicImagePath('images/marine/mediterranean-floor.jpg')
}

// Images d'activités marines
export const marineActivities = {
    snorkeling: getPublicImagePath('images/marine/snorkeling.jpg'),
    boat_tour: getPublicImagePath('images/marine/boat-tour.jpg'),
    kayak: getPublicImagePath('images/marine/kayak.jpg'),
    sailing: getPublicImagePath('images/marine/sailing.jpg')
}

// Icônes marines (SVG ou emoji pour les composants)
export const marineIcons = {
    fish: '🐟',
    octopus: '🐙',
    seahorse: '🐴',
    shell: '🐚',
    waves: '🌊',
    anchor: '⚓',
    diving: '🤿',
    boat: '⛵'
}
