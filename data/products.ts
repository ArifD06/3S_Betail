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
    origin: "Burkina Faso",
    price: '190.000 FCFA (Possibilité de négociation)',
    flag: "Burkina Faso",
    image: '/images/WhatsApp Image 2026-05-08 at 15.54.22.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-08 at 15.54.22.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~42 kg',
      categorie: 'Standard'
    },
    description: 'Mouton robuste et bien portant, parfait pour une belle Tabaski.',
    longDescription: 'Mouton robuste en très bonne condition, élevé dans de bonnes conditions. Disponible à la livraison sur Abidjan.',
    note: 'Photo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton robuste et bien portant',
      'Prêt pour la Tabaski',
      'Photo réelle',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 2,
    name: 'Mouton N°2',
    category: 'Mouton',
    origin: "Burkina Faso",
    price: '190.000 FCFA (Possibilité de négociation)',
    flag: "Burkina Faso",
    image: '/images/WhatsApp Image 2026-05-08 at 15.54.32.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-08 at 15.54.32.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~43 kg',
      categorie: 'Standard'
    },
    description: 'Mouton de belle prestance, bien développé et en pleine santé.',
    longDescription: 'Mouton de belle prestance, bien développé et en pleine santé. Sélectionné avec soin pour la Tabaski. Disponible à la livraison sur Abidjan.',
    note: 'Photo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton bien développé',
      'Prêt pour la Tabaski',
      'Photo réelle',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 3,
    name: 'Mouton N°3',
    category: 'Mouton',
    origin: "Burkina Faso",
    price: '190.000 FCFA (Possibilité de négociation)',
    flag: "Burkina Faso",
    image: '/images/WhatsApp Image 2026-05-08 at 15.54.36.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-08 at 15.54.36.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~41 kg',
      categorie: 'Standard'
    },
    description: 'Mouton en parfaite santé, idéal pour une célébration réussie.',
    longDescription: 'Mouton en parfaite santé, idéal pour une célébration de Tabaski réussie. Bien nourri et suivi. Disponible à la livraison sur Abidjan.',
    note: 'Photo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton en parfaite santé',
      'Prêt pour la Tabaski',
      'Photo réelle',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 4,
    name: 'Mouton N°4',
    category: 'Mouton',
    origin: " Niger",
    price: '205.000 FCFA (Possibilité de négociation)',
    flag: "Niger",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.29.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.29.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~40 kg',
      categorie: 'Standard'
    },
    description: 'Beau mouton en bonne santé, idéal pour la Tabaski.',
    longDescription: 'Mouton en excellente santé, bien nourri et prêt pour la Tabaski. Disponible à la livraison sur Abidjan.',
    note: 'Photo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton sain et bien nourri',
      'Prêt pour la Tabaski',
      'Photo réelle',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 5,
    name: 'Mouton N°5',
    category: 'Mouton',
    origin: "Niger",
    price: '205.000 FCFA (Possibilité de négociation)',
    flag: "Niger",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.33.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.33.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~42 kg',
      categorie: 'Standard'
    },
    description: 'Mouton robuste et bien portant, parfait pour une belle Tabaski.',
    longDescription: 'Mouton robuste en très bonne condition, élevé dans de bonnes conditions. Disponible à la livraison sur Abidjan.',
    note: 'Photo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton robuste et bien portant',
      'Prêt pour la Tabaski',
      'Photo réelle',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 6,
    name: 'Mouton N°6',
    category: 'Mouton',
    origin: "Niger",
    price: '275.000 FCFA (Possibilité de négociation)',
    flag: "Niger",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.38.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.38.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: 'Grand',
      age: '+3 ans',
      poids: '~55 kg',
      categorie: 'Grand'
    },
    description: 'Grand mouton imposant, de belle prestance et en parfaite santé.',
    longDescription: 'Grand mouton de belle prestance, très bien développé et en pleine santé. Idéal pour une grande famille ou une célébration de Tabaski généreuse. Sélectionné avec soin au Niger. Disponible à la livraison sur Abidjan.',
    note: 'Photo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Grand gabarit, très bien développé',
      'Idéal pour une grande famille',
      'Prêt pour la Tabaski',
      'Photo réelle',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 7,
    name: 'Mouton N°7',
    category: 'Mouton',
    origin: "Niger",
    price: '275.000 FCFA (Possibilité de négociation)',
    flag: "Niger",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.41.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.41.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~41 kg',
      categorie: 'Standard'
    },
    description: 'Mouton bien nourri et en excellente forme pour la Tabaski.',
    longDescription: 'Mouton bien nourri, en excellente forme et prêt pour la Tabaski. Sélectionné avec soin. Disponible à la livraison sur Abidjan.',
    note: 'Photo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton bien nourri',
      'Prêt pour la Tabaski',
      'Photo réelle',
      'Livraison disponible sur Abidjan'
    ]
  },
  {
    id: 8,
    name: 'Mouton N°8',
    category: 'Mouton',
    origin: "Niger",
    price: '150.000 FCFA (Possibilité de négociation)',
    flag: "Niger",
    image: '/images/WhatsApp Image 2026-05-12 at 21.57.47.jpeg',
    images: [
      '/images/WhatsApp Image 2026-05-12 at 21.57.47.jpeg'
    ],
    stock: 'En stock',
    specifications: {
      taille: 'Moyen',
      age: '+2 ans',
      poids: '~40 kg',
      categorie: 'Standard'
    },
    description: 'Mouton bien portant et en bonne santé, prêt pour la Tabaski.',
    longDescription: 'Mouton bien portant et en bonne santé, prêt pour la Tabaski. Disponible à la livraison sur Abidjan.',
    note: 'Photo du mouton réel. Ce que vous voyez est ce que vous recevez.',
    characteristics: [
      'Mouton bien portant',
      'Prêt pour la Tabaski',
      'Photo réelle',
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
