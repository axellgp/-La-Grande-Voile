// Images héro et Banyuls-sur-Mer pour La Grande Voile
import { getPublicImagePath } from '../../../utils/imageUtils';

// Images héro principales
const heroImages = [
  getPublicImagePath('images/hero/hero1.jpg'),
  getPublicImagePath('images/hero/hero2.jpg'), 
  getPublicImagePath('images/hero/hero3.jpg'),
  getPublicImagePath('images/hero/hero4.jpg')
]

// Images de Banyuls-sur-Mer
export const banyulsImages = [
  getPublicImagePath('images/banyuls/banyuls-sur-mer-mer-FOND.png'),
  getPublicImagePath('images/banyuls/bay.jpg'),
  getPublicImagePath('images/banyuls/coastline.jpg'),
  getPublicImagePath('images/banyuls/marina.jpg'),
  getPublicImagePath('images/banyuls/port.jpg'),
  getPublicImagePath('images/banyuls/vineyards.jpg')
]

// Images pour les activités
export const activitiesImages = {
  wine: getPublicImagePath('images/banyuls/vineyards.jpg'),
  sea: getPublicImagePath('images/banyuls/coastline.jpg'),
  port: getPublicImagePath('images/banyuls/port.jpg'),
  marina: getPublicImagePath('images/banyuls/marina.jpg')
}

export default heroImages
