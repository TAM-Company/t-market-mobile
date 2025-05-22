// Données fictives pour l'application T-Market
import { Category, Product } from "../types";

// Catégories de produits
export const categories: Category[] = [
  {
    id: "1",
    name: "Électronique",
    image: "https://via.placeholder.com/150?text=Électronique",
  },
  {
    id: "2",
    name: "Vêtements",
    image: "https://via.placeholder.com/150?text=Vêtements",
  },
  {
    id: "3",
    name: "Maison",
    image: "https://via.placeholder.com/150?text=Maison",
  },
  {
    id: "4",
    name: "Sports",
    image: "https://via.placeholder.com/150?text=Sports",
  },
  {
    id: "5",
    name: "Beauté",
    image: "https://via.placeholder.com/150?text=Beauté",
  },
];

// Produits
export const products: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ",
    description:
      "Un smartphone puissant avec une excellente caméra et une batterie longue durée.",
    price: 699.99,
    stock: 15,
    category: "1",
    images: [
      "https://via.placeholder.com/400?text=Smartphone1",
      "https://via.placeholder.com/400?text=Smartphone2",
      "https://via.placeholder.com/400?text=Smartphone3",
    ],
    features: [
      "Écran 6.5 pouces OLED",
      "Processeur octa-core",
      "Caméra 48MP",
      "Batterie 5000mAh",
      "Mémoire 128GB",
    ],
    additionalDetails: [
      "Garantie 2 ans",
      "Livraison gratuite",
      "Disponible en noir, blanc et bleu",
    ],
  },
  {
    id: "2",
    name: "Ordinateur Portable Pro",
    description:
      "Ordinateur portable professionnel avec des performances exceptionnelles pour tous vos besoins.",
    price: 1299.99,
    stock: 8,
    category: "1",
    images: [
      "https://via.placeholder.com/400?text=Laptop1",
      "https://via.placeholder.com/400?text=Laptop2",
    ],
    features: [
      "Écran 15.6 pouces 4K",
      "Processeur Intel i7",
      "RAM 16GB",
      "SSD 512GB",
      "Carte graphique dédiée",
    ],
    additionalDetails: [
      "Garantie 3 ans",
      "Windows 11 Pro",
      "Clavier rétroéclairé",
    ],
  },
  {
    id: "3",
    name: "T-shirt Premium",
    description:
      "T-shirt de haute qualité en coton bio, confortable et durable.",
    price: 29.99,
    stock: 50,
    category: "2",
    images: [
      "https://via.placeholder.com/400?text=Tshirt1",
      "https://via.placeholder.com/400?text=Tshirt2",
    ],
    features: [
      "100% coton bio",
      "Coupe régulière",
      "Col rond",
      "Lavable en machine",
    ],
    additionalDetails: [
      "Disponible en plusieurs tailles",
      "Fabriqué en France",
      "Certifié écologique",
    ],
  },
  {
    id: "4",
    name: "Canapé Moderne",
    description:
      "Canapé moderne et élégant pour votre salon, alliant confort et style.",
    price: 899.99,
    stock: 5,
    category: "3",
    images: [
      "https://via.placeholder.com/400?text=Canape1",
      "https://via.placeholder.com/400?text=Canape2",
      "https://via.placeholder.com/400?text=Canape3",
    ],
    features: [
      "Tissu premium",
      "3 places",
      "Coussins déhoussables",
      "Pieds en bois massif",
    ],
    additionalDetails: [
      "Livraison et montage inclus",
      "Garantie 5 ans",
      "Disponible en gris, bleu et beige",
    ],
  },
  {
    id: "5",
    name: "Ballon de Football Pro",
    description:
      "Ballon de football professionnel, idéal pour les matchs et entraînements.",
    price: 49.99,
    stock: 30,
    category: "4",
    images: [
      "https://via.placeholder.com/400?text=Football1",
      "https://via.placeholder.com/400?text=Football2",
    ],
    features: [
      "Taille 5",
      "Matériau synthétique durable",
      "Coutures renforcées",
      "Design officiel",
    ],
    additionalDetails: [
      "Utilisé dans les compétitions professionnelles",
      "Résistant aux intempéries",
      "Pompe incluse",
    ],
  },
  {
    id: "6",
    name: "Crème Hydratante Visage",
    description:
      "Crème hydratante pour tous types de peau, enrichie en vitamines et antioxydants.",
    price: 24.99,
    stock: 25,
    category: "5",
    images: [
      "https://via.placeholder.com/400?text=Creme1",
      "https://via.placeholder.com/400?text=Creme2",
    ],
    features: [
      "Hydratation 24h",
      "Sans parabènes",
      "Formule non grasse",
      "Testée dermatologiquement",
    ],
    additionalDetails: [
      "Convient aux peaux sensibles",
      "Ingrédients naturels",
      "Non testée sur les animaux",
    ],
  },
  {
    id: "7",
    name: "Écouteurs Sans Fil",
    description:
      "Écouteurs sans fil avec une qualité sonore exceptionnelle et une longue autonomie.",
    price: 129.99,
    stock: 12,
    category: "1",
    images: [
      "https://via.placeholder.com/400?text=Ecouteurs1",
      "https://via.placeholder.com/400?text=Ecouteurs2",
    ],
    features: [
      "Bluetooth 5.0",
      "Autonomie 8h",
      "Résistants à l'eau IPX5",
      "Réduction de bruit active",
    ],
    additionalDetails: [
      "Étui de chargement inclus",
      "Garantie 1 an",
      "Disponible en noir et blanc",
    ],
  },
  {
    id: "8",
    name: "Veste en Cuir",
    description:
      "Veste en cuir véritable, élégante et durable pour homme et femme.",
    price: 199.99,
    stock: 7,
    category: "2",
    images: [
      "https://via.placeholder.com/400?text=Veste1",
      "https://via.placeholder.com/400?text=Veste2",
    ],
    features: [
      "Cuir véritable",
      "Doublure en polyester",
      "Fermeture éclair YKK",
      "Poches multiples",
    ],
    additionalDetails: [
      "Disponible en noir et marron",
      "Tailles XS à XXL",
      "Entretien facile",
    ],
  },
];

// Fonction pour obtenir les produits par catégorie
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};

// Fonction pour obtenir un produit par ID
export const getProductById = (productId: string): Product | undefined => {
  return products.find((product) => product.id === productId);
};

// Fonction pour filtrer les produits
export const filterProducts = (
  productList: Product[],
  searchQuery: string = "",
  categoryId: string = "",
  minPrice: number | null = null,
  maxPrice: number | null = null,
  inStock: boolean = false
): Product[] => {
  return productList.filter((product) => {
    // Filtre par recherche
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtre par catégorie
    const matchesCategory =
      categoryId === "" || product.category === categoryId;

    // Filtre par prix minimum
    const matchesMinPrice = minPrice === null || product.price >= minPrice;

    // Filtre par prix maximum
    const matchesMaxPrice = maxPrice === null || product.price <= maxPrice;

    // Filtre par stock
    const matchesStock = !inStock || product.stock > 0;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesStock
    );
  });
};
