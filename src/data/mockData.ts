// Données fictives pour l'application T-Market
import { Category, Product, SubCategory } from "../types";

// Sous-catégories de produits
export const subCategories = [
  // Sous-catégories Alimentation
  {
    id: "s23",
    name: "Fruits & Légumes",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/fruits-et-legumes-frais-assortiment-de-saison.jpg",
    categoryId: "6",
  },
  {
    id: "s24",
    name: "Boissons",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/boissons-rafraichissantes-assortiment-de-sodas-et.jpg",
    categoryId: "6",
  },
  {
    id: "s25",
    name: "Épicerie",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/produits-d-epicerie-assortiment-de-base.jpg",
    categoryId: "6",
  },
  {
    id: "s26",
    name: "Produits Locaux",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/produits-locaux-specialites-regionales.jpg",
    categoryId: "6",
  },

  // Sous-catégories Électronique
  {
    id: "s1",
    name: "Smartphones",
    image: "https://m.media-amazon.com/images/I/61aiFCe6PpL._AC_SL1500_.jpg",
    categoryId: "1",
  },
  {
    id: "s2",
    name: "Ordinateurs",
    image:
      "https://cf-images.us-east-1.prod.boltdns.net/v1/static/734546229001/b40199f7-371e-495c-b771-2b5f6a4bd686/21dc264f-a3b1-414d-8c6d-946f71e3775b/1920x1080/match/image.jpg",
    categoryId: "1",
  },
  {
    id: "s3",
    name: "Audio",
    image:
      "https://assets.videomaker.com/2000/02/microphone-and-audio-mixer-PZ9UNB5-1-1.jpg",
    categoryId: "1",
  },
  {
    id: "s13",
    name: "Tablettes",
    image:
      "https://www.cdiscount.com/pdt2/0/0/3/1/700x700/sam8806094995003/rw/samsung-galaxy-tab-a9-tablette-android-11-pouces.jpg",
    categoryId: "1",
  },
  {
    id: "s14",
    name: "Accessoires",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc0617125436001/rw/accessoires-pour-telephone-portable-support-de-tel.jpg",
    categoryId: "1",
  },

  // Sous-catégories Vêtements
  {
    id: "s4",
    name: "Hommes",
    image:
      "https://media.istockphoto.com/id/961543084/photo/mens-clothing-and-personal-accessories-isolated-on-white-background.jpg?s=612x612&w=is&k=20&c=7-dcRrCK4EMqFtO_THNtvTdAbWC2ljp43R0lr7hINwo=",
    categoryId: "2",
  },
  {
    id: "s5",
    name: "Femmes",
    image:
      "https://www.shutterstock.com/image-photo/beautiful-womens-clothing-set-girls-260nw-2187903091.jpg",
    categoryId: "2",
  },
  {
    id: "s6",
    name: "Enfants",
    image:
      "https://www.ruffntumblekids.com/cdn/shop/products/25.png?v=1746617170",
    categoryId: "2",
  },
  {
    id: "s15",
    name: "Chaussures",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/mp43950001/rw/baskets-homme-chaussures-de-sport-respirantes-et-l.jpg",
    categoryId: "2",
  },
  {
    id: "s16",
    name: "Accessoires Mode",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/accessoires-de-mode-femme-ensemble-de-6-pieces-col.jpg",
    categoryId: "2",
  },

  // Sous-catégories Maison
  {
    id: "s7",
    name: "Meubles",
    image:
      "https://maisondesmeubles.ci/wp-content/uploads/2023/07/damier-home-11.jpg",
    categoryId: "3",
  },
  {
    id: "s8",
    name: "Décoration",
    image:
      "https://www.traits-dcomagazine.fr/wp-content/uploads/spacejoy-KSfe2Z4REEM-unsplash-copie.jpg",
    categoryId: "3",
  },
  {
    id: "s17",
    name: "Cuisine",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2008632971001/rw/ustensiles-de-cuisine-en-silicone-ensemble-d-uste.jpg",
    categoryId: "3",
  },
  {
    id: "s18",
    name: "Jardin",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009800127001/rw/outils-de-jardinage-ensemble-d-outils-de-jardinag.jpg",
    categoryId: "3",
  },

  // Sous-catégories Sports
  {
    id: "s9",
    name: "Équipements",
    image:
      "https://www.bfmtv.com/comparateur/wp-content/uploads/2020/09/Equipement-sportif-m.jpg",
    categoryId: "4",
  },
  {
    id: "s10",
    name: "Vêtements Sport",
    image:
      "https://www.cdiscount.com/pdt2/2/7/5/2/550x550/mp21336275/rw/ensemble-de-vetement-sport-homme-5-pieces-fitness.jpg",
    categoryId: "4",
  },
  {
    id: "s19",
    name: "Fitness",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2008989735001/rw/kit-fitness-musculation-ensemble-d-halteres-regla.jpg",
    categoryId: "4",
  },
  {
    id: "s20",
    name: "Football",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/ballon-de-football-taille-5-ballon-d-entrainement.jpg",
    categoryId: "4",
  },

  // Sous-catégories Beauté
  {
    id: "s11",
    name: "Soins visage",
    image:
      "https://dakhlaclub.com/wp-content/uploads/2023/11/ezgif.com-gif-maker-10.webp",
    categoryId: "5",
  },
  {
    id: "s12",
    name: "Maquillage",
    image: "https://m.media-amazon.com/images/I/71W2c6xOaYL.jpg",
    categoryId: "5",
  },
  {
    id: "s21",
    name: "Parfums",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009800127001/rw/parfum-homme-eau-de-parfum-pour-homme-100ml.jpg",
    categoryId: "5",
  },
  {
    id: "s22",
    name: "Soins cheveux",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/shampooing-et-apres-shampooing-ensemble-de-soins-c.jpg",
    categoryId: "5",
  },

  // Sous-catégories Santé & Bien-être
  {
    id: "s27",
    name: "Compléments alimentaires",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/complements-alimentaires-vitamines-et-mineraux.jpg",
    categoryId: "7",
  },
  {
    id: "s28",
    name: "Pharmacie",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/produits-de-pharmacie-premiers-soins.jpg",
    categoryId: "7",
  },
  {
    id: "s29",
    name: "Hygiène",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/produits-d-hygiene-personnelle-assortiment.jpg",
    categoryId: "7",
  },
  {
    id: "s30",
    name: "Médecine traditionnelle",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/produits-de-medecine-traditionnelle-africaine.jpg",
    categoryId: "7",
  },
];

// Catégories de produits
export const categories: Category[] = [
  {
    id: "6",
    name: "Alimentation",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/panier-de-fruits-et-legumes-frais-assortiment.jpg",
    subCategories: ["s23", "s24", "s25", "s26"],
  },
  {
    id: "1",
    name: "Électronique",
    image:
      "https://img.freepik.com/photos-gratuite/arrangement-collecte-stationnaire-moderne_23-2149309643.jpg?semt=ais_hybrid&w=740",
    subCategories: ["s1", "s2", "s3", "s13", "s14"],
  },
  {
    id: "2",
    name: "Vêtements",
    image:
      "https://img.leboncoin.fr/api/v1/lbcpb1/images/45/98/2d/45982d31bcc2923dbe3071f9adcaacb4d6192e28.jpg?rule=ad-image",
    subCategories: ["s4", "s5", "s6", "s15", "s16"],
  },
  {
    id: "3",
    name: "Maison",
    image: "https://permiseo.com/wp-content/uploads/types-de-maison.jpg",
    subCategories: ["s7", "s8", "s17", "s18"],
  },
  {
    id: "4",
    name: "Sports",
    image:
      "https://st3.depositphotos.com/3591429/18305/i/450/depositphotos_183057156-stock-photo-sports-tools-green-grass-concept.jpg",
    subCategories: ["s9", "s10", "s19", "s20"],
  },
  {
    id: "5",
    name: "Beauté",
    image:
      "https://img.passeportsante.net/1200x675/2021-05-06/i106268-cosmetique-beaute-produits-cancer-allergenes.webp",
    subCategories: ["s11", "s12", "s21", "s22"],
  },
  {
    id: "7",
    name: "Santé & Bien-être",
    image:
      "https://www.cdiscount.com/pdt2/0/0/1/1/700x700/auc2009961151001/rw/produits-de-sante-et-bien-etre-assortiment.jpg",
    subCategories: ["s27", "s28", "s29", "s30"],
  },
];

// Fonctions utilitaires pour les sous-catégories
export const getSubCategoriesByCategory = (
  categoryId: string
): SubCategory[] => {
  return subCategories.filter((subCat) => subCat.categoryId === categoryId);
};

export const getSubCategoryById = (
  subCategoryId: string
): SubCategory | undefined => {
  return subCategories.find((subCat) => subCat.id === subCategoryId);
};

export const getProductsBySubCategory = (subCategoryId: string): Product[] => {
  const subCategory = getSubCategoryById(subCategoryId);
  if (!subCategory) return [];

  // Pour l'instant, nous allons simplement retourner tous les produits de la catégorie parente
  // Dans une vraie application, chaque produit aurait une propriété subCategory
  return products.filter(
    (product) => product.category === subCategory.categoryId
  );
};

// Produits
export const products: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ",
    description:
      "Un smartphone puissant avec une excellente caméra et une batterie longue durée.",
    price: 67000,
    stock: 15,
    category: "1",
    images: [
      "https://i.notretemps.com/0x450/smart/2023/06/01/samsung-galaxy-a34-5g-1.jpg",
      "https://www.powerplanetonline.com/cdnassets/samsung_galaxy_a05s_plata_01_l.jpg",
      "https://fr.wikomobile.com/shop/media/catalog/product/cache/1/small_image/500x500/9df78eab33525d08d6e5fb8d27136e95/w/i/wiko_power-u10_carbon-grey_3quart-front-01.jpg",
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
    price: 85000,
    stock: 8,
    category: "1",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9JFVnK6NZfkn65xSi3OXt-KeDF5cwkmSqbw&s",
      "https://img.gkbcdn.com/p/2024-07-24/N-one-Nbook-Pro-Dual-Screen-Laptop-10001295-1._w800_p1_.jpg",
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
    price: 25000,
    stock: 50,
    category: "2",
    images: [
      "https://bombaystyle.co.in/cdn/shop/files/photo_2024-07-18_00-14-10.jpg?v=1737639096",
      "https://oase-mode.de/cdn/shop/files/O1CN01DGmENH1DVGMeBoPHk-_1601100221_900x_720x_1e8bd5f9-f15a-4654-82fb-000d7497b29d.jpg?v=1702320900&width=1500",
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
    price: 12000,
    stock: 5,
    category: "3",
    images: [
      "https://oplayce.ci/cdn/shop/products/WhatsAppImage2023-03-04at17.14.39.jpg?v=1677950988",
      "https://www.cdiscount.com/pdt2/2/9/2/4/700x700/ovo4793565163292/rw/canape-d-angle-revetement-en-tissu-186x136x79-cm-b.jpg",
      "https://media.roche-bobois.com/is/image/rochebobois/sequoia_angle-droit_amb_01-rouge_PP?wid=1250&fmt=pjpeg&resMode=sharp2&qlt=80",
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
    price: 32800,
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
    price: 15000,
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
    price: 85000,
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
    price: 19800,
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
  inStock: boolean = false,
  sortBy: string = "default",
  onSale: boolean = false,
  freeShipping: boolean = false
): Product[] => {
  // Filtrer les produits
  let filtered = productList.filter((product) => {
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

    // Filtre par promotion (simulation)
    const matchesOnSale =
      !onSale || product.id === "3" || product.id === "6" || product.id === "8";

    // Filtre par livraison gratuite (simulation)
    const matchesFreeShipping =
      !freeShipping ||
      product.additionalDetails.some((detail) =>
        detail.toLowerCase().includes("livraison gratuite")
      );

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesStock &&
      matchesOnSale &&
      matchesFreeShipping
    );
  });

  // Trier les produits
  if (sortBy !== "default") {
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "newest":
          // Simulation: utiliser l'ID comme indicateur de nouveauté
          return parseInt(b.id) - parseInt(a.id);
        default:
          return 0;
      }
    });
  }

  return filtered;
};
