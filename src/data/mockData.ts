import { apiService } from '../services/api';
import { API_ROUTES } from '../config/apiRoutes';
import {
  Product,
  Category,
  SubCategory,
  GetProductsResponse,
  // Assuming simple array responses for these, will define if more structure is needed
  // GetCategoriesResponse,
  // GetSubCategoriesResponse,
} from '../types'; // Ensure all necessary types are imported or defined

// --- Core Mock Data Arrays (Keep these as the source of truth for now) ---

const mockSubCategories: SubCategory[] = [
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

const mockCategories: Category[] = [
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

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ",
    description:
      "Un smartphone puissant avec une excellente caméra et une batterie longue durée.",
    price: 67000,
    stock: 15,
    categoryId: "1", // Corresponds to Électronique
    images: [
      "https://i.notretemps.com/0x450/smart/2023/06/01/samsung-galaxy-a34-5g-1.jpg",
      "https://www.powerplanetonline.com/cdnassets/samsung_galaxy_a05s_plata_01_l.jpg",
      "https://fr.wikomobile.com/shop/media/catalog/product/cache/1/small_image/500x500/9df78eab33525d08d6e5fb8d27136e95/w/i/wiko_power-u10_carbon-grey_3quart-front-01.jpg",
    ],
    // Assuming Product type in types.ts might not have these, add if necessary
    // features: [
    //   "Écran 6.5 pouces OLED",
    //   "Processeur octa-core",
    //   "Caméra 48MP",
    //   "Batterie 5000mAh",
    //   "Mémoire 128GB",
    // ],
    // additionalDetails: [
    //   "Garantie 2 ans",
    //   "Livraison gratuite",
    //   "Disponible en noir, blanc et bleu",
    // ],
    sku: "SKU001",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Ordinateur Portable Pro",
    description:
      "Ordinateur portable professionnel avec des performances exceptionnelles pour tous vos besoins.",
    price: 85000,
    stock: 8,
    categoryId: "1",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9JFVnK6NZfkn65xSi3OXt-KeDF5cwkmSqbw&s",
      "https://img.gkbcdn.com/p/2024-07-24/N-one-Nbook-Pro-Dual-Screen-Laptop-10001295-1._w800_p1_.jpg",
    ],
    sku: "SKU002",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "T-shirt Premium",
    description:
      "T-shirt de haute qualité en coton bio, confortable et durable.",
    price: 25000,
    stock: 50,
    categoryId: "2", // Corresponds to Vêtements
    images: [
      "https://bombaystyle.co.in/cdn/shop/files/photo_2024-07-18_00-14-10.jpg?v=1737639096",
      "https://oase-mode.de/cdn/shop/files/O1CN01DGmENH1DVGMeBoPHk-_1601100221_900x_720x_1e8bd5f9-f15a-4654-82fb-000d7497b29d.jpg?v=1702320900&width=1500",
    ],
    sku: "SKU003",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Canapé Moderne",
    description:
      "Canapé moderne et élégant pour votre salon, alliant confort et style.",
    price: 12000,
    stock: 5,
    categoryId: "3", // Corresponds to Maison
    images: [
      "https://oplayce.ci/cdn/shop/products/WhatsAppImage2023-03-04at17.14.39.jpg?v=1677950988",
      "https://www.cdiscount.com/pdt2/2/9/2/4/700x700/ovo4793565163292/rw/canape-d-angle-revetement-en-tissu-186x136x79-cm-b.jpg",
      "https://media.roche-bobois.com/is/image/rochebobois/sequoia_angle-droit_amb_01-rouge_PP?wid=1250&fmt=pjpeg&resMode=sharp2&qlt=80",
    ],
    sku: "SKU004",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Ballon de Football Pro",
    description:
      "Ballon de football professionnel, idéal pour les matchs et entraînements.",
    price: 32800,
    stock: 30,
    categoryId: "4", // Corresponds to Sports
    images: [
      "https://via.placeholder.com/400?text=Football1",
      "https://via.placeholder.com/400?text=Football2",
    ],
    sku: "SKU005",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Crème Hydratante Visage",
    description:
      "Crème hydratante pour tous types de peau, enrichie en vitamines et antioxydants.",
    price: 15000,
    stock: 25,
    categoryId: "5", // Corresponds to Beauté
    images: [
      "https://via.placeholder.com/400?text=Creme1",
      "https://via.placeholder.com/400?text=Creme2",
    ],
    sku: "SKU006",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Écouteurs Sans Fil",
    description:
      "Écouteurs sans fil avec une qualité sonore exceptionnelle et une longue autonomie.",
    price: 85000,
    stock: 12,
    categoryId: "1",
    images: [
      "https://via.placeholder.com/400?text=Ecouteurs1",
      "https://via.placeholder.com/400?text=Ecouteurs2",
    ],
    sku: "SKU007",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Veste en Cuir",
    description:
      "Veste en cuir véritable, élégante et durable pour homme et femme.",
    price: 19800,
    stock: 7,
    categoryId: "2",
    images: [
      "https://via.placeholder.com/400?text=Veste1",
      "https://via.placeholder.com/400?text=Veste2",
    ],
    sku: "SKU008",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];


// --- Refactored Data Fetching Functions ---

const SIMULATED_DELAY = 500; // ms

// Helper to simulate filtering and pagination
const applyFiltersAndPagination = (
  items: any[],
  params?: {
    page?: number;
    limit?: number;
    categoryId?: string;
    subCategoryId?: string;
    searchQuery?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sortBy?: string;
    onSale?: boolean;
    freeShipping?: boolean;
    // Add other potential filter params here
  }
) => {
  let filteredItems = [...items];

  if (params?.searchQuery) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(params.searchQuery!.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(params.searchQuery!.toLowerCase()))
    );
  }
  if (params?.categoryId) {
    filteredItems = filteredItems.filter((item) => item.categoryId === params.categoryId);
  }
  if (params?.subCategoryId && items === mockProducts) { // Example: products might not have subCategoryId directly
     const subCat = mockSubCategories.find(sc => sc.id === params.subCategoryId);
     if (subCat) {
        filteredItems = filteredItems.filter(p => p.categoryId === subCat.categoryId);
     } else {
        filteredItems = []; // No products if subcategory doesn't exist
     }
  }
  if (params?.minPrice !== undefined) {
    filteredItems = filteredItems.filter((item) => item.price >= params.minPrice!);
  }
  if (params?.maxPrice !== undefined) {
    filteredItems = filteredItems.filter((item) => item.price <= params.maxPrice!);
  }
  if (params?.inStock) {
    filteredItems = filteredItems.filter((item) => item.stock > 0);
  }
  // Add onSale, freeShipping if product data includes these flags or can be derived

  // Sorting (simplified example, adapt from original filterProducts if needed)
  if (params?.sortBy) {
    filteredItems.sort((a, b) => {
      switch (params.sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        default: return 0;
      }
    });
  }

  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const total = filteredItems.length;
  const paginatedData = filteredItems.slice((page - 1) * limit, page * limit);

  return { data: paginatedData, total, page, limit };
};


export const getProducts = async (
  params?: {
    page?: number;
    limit?: number;
    categoryId?: string;
    subCategoryId?: string;
    searchQuery?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sortBy?: string;
    onSale?: boolean;
    freeShipping?: boolean;
  }
): Promise<GetProductsResponse> => {
  // Here we simulate calling apiService.get(API_ROUTES.PRODUCTS, params)
  // The actual fetch is replaced by a promise that resolves with mock data
  console.log(`Simulating API call to: ${API_ROUTES.PRODUCTS} with params:`, params);
  return new Promise((resolve) => {
    setTimeout(() => {
      const { data, total, page, limit } = applyFiltersAndPagination(mockProducts, params);
      resolve({
        products: data,
        total,
        page,
        limit,
      });
    }, SIMULATED_DELAY);
  });
};

export const getProductById = async (productId: string): Promise<Product | undefined> => {
  // Simulating apiService.get(API_ROUTES.PRODUCT_DETAIL(productId))
  console.log(`Simulating API call to: ${API_ROUTES.PRODUCT_DETAIL(productId)}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === productId);
      resolve(product);
    }, SIMULATED_DELAY);
  });
};

export const getCategories = async (
  // Add params if categories can be filtered/paginated
): Promise<Category[]> => {
  // Simulating apiService.get(API_ROUTES.CATEGORIES)
  console.log(`Simulating API call to: ${API_ROUTES.CATEGORIES}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockCategories]); // Return a copy
    }, SIMULATED_DELAY);
  });
};

export const getCategoryById = async (categoryId: string): Promise<Category | undefined> => {
  // Simulating apiService.get(API_ROUTES.CATEGORY_DETAIL(categoryId))
  console.log(`Simulating API call to: ${API_ROUTES.CATEGORY_DETAIL(categoryId)}`);
   return new Promise((resolve) => {
    setTimeout(() => {
      const category = mockCategories.find((c) => c.id === categoryId);
      resolve(category);
    }, SIMULATED_DELAY);
  });
};


export const getSubCategories = async (
    params?: { categoryId?: string }
): Promise<SubCategory[]> => {
    // Simulating apiService.get(API_ROUTES.SOME_SUBROUTE_FOR_SUBCATEGORIES, params)
    // Assuming API_ROUTES would have a route for subcategories, e.g., /subcategories or /categories/:id/subcategories
    let route = "/subcategories"; // Placeholder if no specific route in API_ROUTES
    if (params?.categoryId) {
        // This assumes your API_ROUTES.PRODUCTS_BY_CATEGORY or similar might be relevant,
        // or you'd have a dedicated subcategory route.
        // For mock, we just use the param.
        route = `/categories/${params.categoryId}/subcategories`; // Example simulated route
    }
    console.log(`Simulating API call to fetch subcategories with params:`, params);

    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredSubCategories = [...mockSubCategories];
            if (params?.categoryId) {
                filteredSubCategories = filteredSubCategories.filter(
                    (sc) => sc.categoryId === params.categoryId
                );
            }
            resolve(filteredSubCategories);
        }, SIMULATED_DELAY);
    });
};


export const getSubCategoryById = async (subCategoryId: string): Promise<SubCategory | undefined> => {
  // Simulating an API call, e.g. apiService.get(`/subcategories/${subCategoryId}`)
  // API_ROUTES should define this if it's a common pattern.
  console.log(`Simulating API call to fetch subcategory by ID: ${subCategoryId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const subCategory = mockSubCategories.find((sc) => sc.id === subCategoryId);
      resolve(subCategory);
    }, SIMULATED_DELAY);
  });
};


// --- Potentially keep some synchronous utility functions if they are used for client-side logic ---
// --- For example, if filterProducts is used by UI components AFTER fetching all products. ---
// --- However, the goal is to make data *fetching* functions asynchronous. ---

// The original filterProducts function might still be useful if you fetch a larger dataset
// and then allow client-side refinement. Or, its logic can be fully embedded into
// the new getProducts's applyFiltersAndPagination helper.
// For this refactor, we'll assume most filtering happens "server-side" (i.e., within the getProducts Promise).

export const filterProductsClientSide = ( // Renamed to clarify its scope
  productList: Product[],
  searchQuery: string = "",
  categoryId: string = "",
  minPrice: number | null = null,
  maxPrice: number | null = null,
  inStock: boolean = false,
  sortBy: string = "default",
  onSale: boolean = false, // Assuming Product type has an onSale property or it's derived
  freeShipping: boolean = false // Assuming Product type has a freeShipping property or it's derived
): Product[] => {
  let filtered = [...productList];

  if (searchQuery) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (categoryId) {
    filtered = filtered.filter((product) => product.categoryId === categoryId);
  }
  if (minPrice !== null) {
    filtered = filtered.filter((product) => product.price >= minPrice);
  }
  if (maxPrice !== null) {
    filtered = filtered.filter((product) => product.price <= maxPrice);
  }
  if (inStock) {
    filtered = filtered.filter((product) => product.stock > 0);
  }
  // Add onSale and freeShipping filters if applicable to Product type

  if (sortBy !== "default") {
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "name-asc": return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        // case "newest": // Requires a date field on Product
        //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0;
      }
    });
  }
  return filtered;
};

// Note: The original getProductsByCategory and getProductsBySubCategory are now effectively
// covered by getProducts({ categoryId: '...' }) and getProducts({ subCategoryId: '...' })
// respectively, by passing parameters to the main getProducts function.
// If direct, simpler functions are still desired, they can be kept:

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  console.log(`Simulating API call for products by category: ${categoryId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => p.categoryId === categoryId);
      resolve(products); // This is a simplified return, not paginated. Adjust if needed.
    }, SIMULATED_DELAY);
  });
};

export const getProductsBySubCategory = async (subCategoryId: string): Promise<Product[]> => {
  console.log(`Simulating API call for products by subCategory: ${subCategoryId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const subCategory = mockSubCategories.find(sc => sc.id === subCategoryId);
      if (subCategory) {
        const products = mockProducts.filter(p => p.categoryId === subCategory.categoryId);
        resolve(products); // Simplified return
      } else {
        resolve([]);
      }
    }, SIMULATED_DELAY);
  });
};

// The Product type in `src/types/index.ts` or `src/types/api.ts` should be the single source of truth.
// Ensure mockProducts align with the Product definition in `src/types/api.ts`.
// This means fields like `sku`, `createdAt`, `updatedAt` should be added to mockProducts.
// The `features` and `additionalDetails` fields were present in the original mock but not in `src/types/api.ts Product`.
// For this refactor, I've commented them out from mockProducts to align with the defined Product type.
// If they are needed, the Product type in `src/types/api.ts` should be updated.
// I've added sku, createdAt, updatedAt to the mockProducts.
// I've also assumed that the Product type in `src/types/index.ts` is compatible or the same as `src/types/api.ts`.
// If they differ, `src/types/index.ts` might need updates or this file should strictly use types from `src/types/api.ts`.
// For now, I'm using `Product` from `../types` which implies `src/types/index.ts`.
// It's better to ensure consistency, e.g., by having `src/types/index.ts` export from `src/types/api.ts` or vice-versa for shared types.
