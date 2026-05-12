export interface Product {
  id: number
  name: string
  category: string
  origin: string
  price: string
  flag: string
  image: string
  images: string[]
  video?: string
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
    name: 'Mouton N°1',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '/images/WhatsApp Image 2026-05-08 at 15.54.19.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-08 at 15.54.19.jpeg'
    ],
    video: '/images/WhatsApp Video 2026-05-08 at 15.54.16.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~40 kg',
      categorie: 'Standard'
    },
    description: 'Beau mouton en bonne santé, idéal pour la Tabaski.',
    longDescription: 'Mouton en excellente santé, bien nourri et prêt pour la Tabaski. Disponible à la livraison sur Abidjan.',
    note: 'Photos et vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton sain et bien nourri',
      'Prêt pour la Tabaski',
      'Photos et vidéo réelles',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 2,
    name: 'Mouton N°2',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '/images/WhatsApp Image 2026-05-08 at 15.54.22.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-08 at 15.54.22.jpeg'
    ],
    video: '/images/WhatsApp Video 2026-05-08 at 15.54.21.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~42 kg',
      categorie: 'Standard'
    },
    description: 'Mouton robuste et bien portant, parfait pour une belle Tabaski.',
    longDescription: 'Mouton robuste en très bonne condition, élevé dans de bonnes conditions. Disponible à la livraison sur Abidjan.',
    note: 'Photos et vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton robuste et bien portant',
      'Prêt pour la Tabaski',
      'Photos et vidéo réelles',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 3,
    name: 'Mouton N°3',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '/images/WhatsApp Image 2026-05-08 at 15.54.32.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-08 at 15.54.32.jpeg'
    ],
    video: '/images/WhatsApp Video 2026-05-08 at 15.54.34.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~43 kg',
      categorie: 'Standard'
    },
    description: 'Mouton de belle prestance, bien développé et en pleine santé.',
    longDescription: 'Mouton de belle prestance, bien développé et en pleine santé. Sélectionné avec soin pour la Tabaski. Disponible à la livraison sur Abidjan.',
    note: 'Photos et vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton bien développé',
      'Prêt pour la Tabaski',
      'Photos et vidéo réelles',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 4,
    name: 'Mouton N°4',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '/images/WhatsApp Image 2026-05-08 at 15.54.36.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-08 at 15.54.36.jpeg'
    ],
    video: '/images/WhatsApp Video 2026-05-08 at 15.54.35.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~41 kg',
      categorie: 'Standard'
    },
    description: 'Mouton en parfaite santé, idéal pour une célébration réussie.',
    longDescription: 'Mouton en parfaite santé, idéal pour une célébration de Tabaski réussie. Bien nourri et suivi. Disponible à la livraison sur Abidjan.',
    note: 'Photos et vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton en parfaite santé',
      'Prêt pour la Tabaski',
      'Photos et vidéo réelles',
      'Livraison disponible sur Abidjan'
    ]
  }
  ,
  {
    id: 5,
    name: 'Mouton N°5',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '',
    images: [],
    video: '/images/WhatsApp Video 2026-05-08 at 15.54.26.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~41 kg',
      categorie: 'Standard'
    },
    description: 'Beau mouton en bonne santé, disponible en vidéo.',
    longDescription: 'Mouton en bonne santé, bien nourri et prêt pour la Tabaski. Visionnez la vidéo pour le voir en détail. Disponible à la livraison sur Abidjan.',
    note: 'Vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton sain et bien nourri',
      'Prêt pour la Tabaski',
      'Vidéo réelle disponible',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 6,
    name: 'Mouton N°6',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '',
    images: [],
    video: '/images/WhatsApp Video 2026-05-08 at 15.54.30.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~40 kg',
      categorie: 'Standard'
    },
    description: 'Mouton bien portant, disponible en vidéo pour mieux l\'apprécier.',
    longDescription: 'Mouton bien portant et en excellente condition, visible en vidéo. Disponible à la livraison sur Abidjan.',
    note: 'Vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton bien portant',
      'Prêt pour la Tabaski',
      'Vidéo réelle disponible',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 7,
    name: 'Mouton N°7',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.29.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.29.jpeg'
    ],
    video: '/images/WhatsApp Video 2026-05-12 at 21.57.32.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~40 kg',
      categorie: 'Standard'
    },
    description: 'Beau mouton en bonne santé, idéal pour la Tabaski.',
    longDescription: 'Mouton en excellente santé, bien nourri et prêt pour la Tabaski. Disponible à la livraison sur Abidjan.',
    note: 'Photos et vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton sain et bien nourri',
      'Prêt pour la Tabaski',
      'Photos et vidéo réelles',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 8,
    name: 'Mouton N°8',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.33.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.33.jpeg'
    ],
    video: '/images/WhatsApp Video 2026-05-12 at 21.57.36.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~42 kg',
      categorie: 'Standard'
    },
    description: 'Mouton robuste et bien portant, parfait pour une belle Tabaski.',
    longDescription: 'Mouton robuste en très bonne condition, élevé dans de bonnes conditions. Disponible à la livraison sur Abidjan.',
    note: 'Photos et vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton robuste et bien portant',
      'Prêt pour la Tabaski',
      'Photos et vidéo réelles',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 9,
    name: 'Mouton N°9',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.38.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.38.jpeg',
      '/images/WhatsApp Image 2026-05-12 at 21.57.38 (1).jpeg'
    ],
    video: '/images/WhatsApp Video 2026-05-12 at 21.57.40.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~43 kg',
      categorie: 'Standard'
    },
    description: 'Mouton de belle prestance, bien développé et en pleine santé.',
    longDescription: 'Mouton de belle prestance, bien développé et en pleine santé. Sélectionné avec soin pour la Tabaski. Disponible à la livraison sur Abidjan.',
    note: 'Photos et vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton bien développé',
      'Prêt pour la Tabaski',
      'Photos et vidéo réelles',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 10,
    name: 'Mouton N°10',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.41.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.41.jpeg'
    ],
    video: '/images/WhatsApp Video 2026-05-12 at 21.57.44.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~41 kg',
      categorie: 'Standard'
    },
    description: 'Mouton en parfaite santé, idéal pour une célébration réussie.',
    longDescription: 'Mouton en parfaite santé, idéal pour une célébration de Tabaski réussie. Bien nourri et suivi. Disponible à la livraison sur Abidjan.',
    note: 'Photos et vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton en parfaite santé',
      'Prêt pour la Tabaski',
      'Photos et vidéo réelles',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 11,
    name: 'Mouton N°11',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.47.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.47.jpeg'
    ],
    video: '/images/WhatsApp Video 2026-05-12 at 21.57.46.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~40 kg',
      categorie: 'Standard'
    },
    description: 'Mouton bien nourri et en excellente forme pour la Tabaski.',
    longDescription: 'Mouton bien nourri, en excellente forme et prêt pour la Tabaski. Sélectionné avec soin. Disponible à la livraison sur Abidjan.',
    note: 'Photos et vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton bien nourri',
      'Prêt pour la Tabaski',
      'Photos et vidéo réelles',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 12,
    name: 'Mouton N°12',
    category: 'Mouton',
    origin: "Côte d'Ivoire",
    price: '180.000 FCFA',
    flag: "Côte d'Ivoire",
    image: '',
    images: [],
    video: '/images/WhatsApp Video 2026-05-12 at 21.57.50.mp4',
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~40 kg',
      categorie: 'Standard'
    },
    description: 'Mouton bien portant, disponible en vidéo pour mieux l\'apprécier.',
    longDescription: 'Mouton bien portant et en excellente condition, visible en vidéo. Disponible à la livraison sur Abidjan.',
    note: 'Vidéo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton bien portant',
      'Prêt pour la Tabaski',
      'Vidéo réelle disponible',
      'Livraison disponible sur Abidjan'
    ]
  }
]

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCountry(country: string): Product[] {
  return products.filter(product => product.origin === country)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}
