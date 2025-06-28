// Index principal des images de La Grande Voile
import { getPublicImagePath } from '../../utils/imageUtils';

// Imports des images d'appartements
import vaisseauAmiralImagesArray, { vaisseauAmiralPlan } from './appartements/vaisseau-amiral'
import caravelleImagesArray, { caravellePlan } from './appartements/caravelle'
import goeletteImagesArray, { goelettePlan } from './appartements/goelette'
import quatreMatsImagesArray, { quatreMatsPlan } from './appartements/quatre-mats'
import drakkarImagesArray, { drakkarPlan } from './appartements/drakkar'
import jonqueImagesArray, { jonquePlan } from './appartements/jonque'

// Imports des autres images
import heroImagesArray from './hero'
import banyulsImagesArray, { activitiesImages } from './banyuls'
import { marineImages, marineIcons } from './marine'

// Images des appartements
export { default as vaisseauAmiralImages, vaisseauAmiralPlan, vaisseauAmiralImages as vaisseauAmiralImagesList } from './appartements/vaisseau-amiral'
export { default as caravelleImages, caravellePlan, caravelleImages as caravelleImagesList } from './appartements/caravelle'
export { default as goeletteImages, goelettePlan, goeletteImages as goeletteImagesList } from './appartements/goelette'
export { default as quatreMatsImages, quatreMatsPlan, quatreMatsImages as quatreMatsImagesList } from './appartements/quatre-mats'
export { default as drakkarImages, drakkarPlan, drakkarImages as drakkarImagesList } from './appartements/drakkar'
export { default as jonqueImages, jonquePlan, jonqueImages as jonqueImagesList } from './appartements/jonque'

// Images héro et Banyuls
export { default as heroImages } from './hero'
export { default as banyulsImages, activitiesImages } from './banyuls'

// Images marines
export { marineImages, marineIcons } from './marine'

// Logo et branding
export const logoUrl = '/logo-la-grande-voile.png'
export const faviconUrl = '/favicon-marine.ico'

// Images par catégorie
export const imageCategories = {
  appartements: {
    'vaisseau-amiral': { images: vaisseauAmiralImagesArray, plan: vaisseauAmiralPlan },
    'caravelle': { images: caravelleImagesArray, plan: caravellePlan },
    'goelette': { images: goeletteImagesArray, plan: goelettePlan },
    'quatre-mats': { images: quatreMatsImagesArray, plan: quatreMatsPlan },
    'drakkar': { images: drakkarImagesArray, plan: drakkarPlan },
    'jonque': { images: jonqueImagesArray, plan: jonquePlan }
  },
  
  hotel: {
    hero: heroImagesArray,
    banyuls: banyulsImagesArray,
    activities: activitiesImages
  },
  
  marine: {
    diving: marineImages.diving,
    fish: marineImages.fish,
    octopus: marineImages.octopus,
    seafloor: marineImages.seafloor,
    activities: marineImages.activities
  }
}

// Fonction utilitaire pour obtenir des images par appartement
export const getAppartementImages = (appartementId) => {
  const appartementMap = {
    1: 'vaisseau-amiral',
    2: 'caravelle', 
    3: 'goelette',
    4: 'quatre-mats',
    5: 'drakkar',
    6: 'jonque'
  }
  
  const appartementKey = appartementMap[appartementId]
  return appartementKey ? imageCategories.appartements[appartementKey] : null
}

// Images par défaut
export const defaultImages = {
  apartment: getPublicImagePath('images/appartements/vaisseau-amiral/SALON-VAISSEAU-AMIRAL.png'),
  hero: getPublicImagePath('images/hero/hero1.jpg'),
  marine: getPublicImagePath('images/marine/underwater.jpg')
}
