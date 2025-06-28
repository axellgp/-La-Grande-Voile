// Images de Banyuls-sur-Mer pour La Grande Voile
import { getPublicImagePath } from '../../../utils/imageUtils';

// Images de Banyuls-sur-Mer et ses environs
const banyulsImages = [
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
  marina: getPublicImagePath('images/banyuls/marina.jpg'),
  diving: getPublicImagePath('images/marine/underwater.jpg'),
  hiking: getPublicImagePath('images/banyuls/coastline.jpg'),
  sailing: getPublicImagePath('images/banyuls/marina.jpg'),
  culture: getPublicImagePath('images/banyuls/port.jpg')
}

export default banyulsImages
