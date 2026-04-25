export interface Product {
  id: number
  name: string
  category: string
  origin: string
  price: string
  flag: string
  image: string
  images: string[]
  stock: string
  specifications: {
    taille: string
    age: string
    poids: string
    categorie: string
  }
  description: string
  longDescription: string
  note: string
  characteristics: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Mouton du Sahel - Taille J',
    category: 'Mouton',
    origin: 'Côte d\'Ivoire',
    price: '150.000 FCFA',
    flag: 'Côte d\'Ivoire',
    image: '/images/WhatsApp Image 2026-04-19 at 12.39.42.jpeg',
    images: [
      '/images/WhatsApp Image 2026-04-19 at 12.39.42.jpeg',
      '/images/WhatsApp Image 2026-04-19 at 12.39.42 (1).jpeg',
      '/images/WhatsApp Image 2026-04-19 at 12.39.42 (2).jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: '80 x 117 cm',
      age: '+2 ans',
      poids: '40-43kg',
      categorie: 'Extra 1'
    },
    description: 'Mouton du Sahel, Taille J (80 x 117 cm), Extra 1 - Sélectionné avec soin pour la fête de Tabaski.',
    longDescription: 'Le Mouton du Sahel de Taille J est un spécimen exceptionnel provenant des régions arides du Sahel. Élevé dans des conditions optimales avec une alimentation naturelle et un suivi vétérinaire rigoureux, ce mouton présente une morphologie idéale pour les célébrations de Tabaski. Sa robe blanche immaculée et sa conformation harmonieuse en font un choix prestigieux pour les familles exigeantes.',
    note: 'L\'image est fournie à titre illustratif. La couleur du bétail peut varier lors de la livraison. La sélection est effectuée selon les critères de taille (80x117 cm, +2 ans) et de poids (40-43kg).',
    characteristics: [
      'Robe blanche de qualité supérieure',
      'Cornes bien développées et symétriques',
      'Excellente conformation corporelle',
      'Certifié sans maladie',
      'Alimentation 100% naturelle'
    ]
  },
  {
    id: 2,
    name: 'Mouton Ladoum - Premium',
    category: 'Mouton',
    origin: 'Côte d\'Ivoire',
    price: '150.000FCFA',
    flag: 'Côte d\'Ivoire',
    image: '/images/WhatsApp Image 2026-04-19 at 12.39.42 (1).jpeg',
    images: [
      '/images/WhatsApp Image 2026-04-19 at 12.39.42 (1).jpeg',
      '/images/WhatsApp Image 2026-04-19 at 12.39.42.jpeg',
      '/images/WhatsApp Image 2026-04-19 at 12.39.43.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: '85 x 125 cm',
      age: '+2 ans',
      poids: '45-48kg',
      categorie: 'Premium'
    },
    description: 'Mouton Ladoum Premium - Race noble sélectionnée pour les célébrations prestigieuses.',
    longDescription: 'Le Mouton Ladoum Premium représente l\'excellence de l\'élevage ouest-africain. Cette race noble, réputée pour sa taille imposante et sa robe immaculée, est le choix privilégié des familles qui recherchent le meilleur pour Tabaski. Chaque spécimen est sélectionné manuellement par nos experts pour garantir une qualité exceptionnelle et une présentation digne des plus grandes célébrations.',
    note: 'L\'image est fournie à titre illustratif. La couleur du bétail peut varier lors de la livraison. La sélection est effectuée selon les critères de taille (85x125 cm, +2 ans) et de poids (45-48kg).',
    characteristics: [
      'Race Ladoum pure et certifiée',
      'Taille XXL impressionnante',
      'Robe d\'un blanc éclatant',
      'Poids optimal pour Tabaski',
      'Certificat de pedigree fourni'
    ]
  },
  {
    id: 3,
    name: 'Mouton du Nord - Taille M',
    category: 'Mouton',
    origin: 'Mali',
    price: '150.000FCFA',
    flag: 'Mali',
    image: '/images/WhatsApp Image 2026-04-19 at 12.39.42 (2).jpeg',
    images: [
      '/images/WhatsApp Image 2026-04-19 at 12.39.42 (2).jpeg',
      '/images/WhatsApp Image 2026-04-19 at 12.39.42.jpeg',
      '/images/WhatsApp Image 2026-04-19 at 12.39.43.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: '75 x 110 cm',
      age: '+2 ans',
      poids: '38-41kg',
      categorie: 'Standard'
    },
    description: 'Mouton du Nord, Taille M - Qualité garantie et excellent rapport qualité-prix.',
    longDescription: 'Le Mouton du Nord de Taille M est une excellente option pour les familles qui recherchent la qualité sans compromettre leur budget. Provenant des élevages réputés du nord du Mali, ce mouton combine robustesse et esthétique. Son développement harmonieux et sa santé irréprochable en font un choix fiable pour célébrer Tabaski dans la tradition et la sérénité.',
    note: 'L\'image est fournie à titre illustratif. La couleur du bétail peut varier lors de la livraison. La sélection est effectuée selon les critères de taille (75x110 cm, +2 ans) et de poids (38-41kg).',
    characteristics: [
      'Élevage traditionnel malien',
      'Excellente adaptation climatique',
      'Robe dense et soyeuse',
      'Tempérament calme et docile',
      'Certification sanitaire complète'
    ]
  },
  
  {
    id: 4,
    name: 'Mouton Sahélien - Taille L',
    category: 'Mouton',
    origin: 'Côte d\'Ivoire',
    price: '150.000 FCFA',
    flag: 'Côte d\'Ivoire',
    image: '/images/WhatsApp Image 2026-04-19 at 12.39.43.jpeg',
    images: [
      '/images/WhatsApp Image 2026-04-19 at 12.39.43.jpeg',
      '/images/WhatsApp Image 2026-04-19 at 12.39.42 (1).jpeg',
      '/images/WhatsApp Image 2026-04-19 at 12.39.42 (2).jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: '90 x 130 cm',
      age: '+3 ans',
      poids: '50-55kg',
      categorie: 'Extra Large'
    },
    description: 'Mouton Sahélien Taille L - Spécimen exceptionnel pour les célébrations mémorables.',
    longDescription: 'Le Mouton Sahélien de Taille L est un véritable géant parmi les moutons de Tabaski. Avec ses dimensions impressionnantes et sa masse musculaire bien développée, il est destiné aux familles qui souhaitent marquer leur célébration avec un spécimen hors du commun. Son élevage prolongé de 3 ans garantit une maturité parfaite et une qualité de viande exceptionnelle.',
    note: 'L\'image est fournie à titre illustratif. La couleur du bétail peut varier lors de la livraison. La sélection est effectuée selon les critères de taille (90x130 cm, +3 ans) et de poids (50-55kg).',
    characteristics: [
      'Dimensions XXL exceptionnelles',
      'Maturité de 3 ans garantie',
      'Masse musculaire impressionnante',
      'Robe d\'une pureté remarquable',
      'Suivi vétérinaire premium'
    ]
  }
  
]

// Fonction pour récupérer un produit par son ID
export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id)
}

// Fonction pour récupérer les produits par pays
export function getProductsByCountry(country: string): Product[] {
  return products.filter(product => product.origin === country)
}

// Fonction pour récupérer les produits par catégorie
export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}
