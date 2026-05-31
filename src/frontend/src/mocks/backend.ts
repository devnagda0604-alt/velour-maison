import type { backendInterface } from "../backend";
import { Collection, OrderStatus, Size, UserRole } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.fromText("aaaaa-aa");
const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleProducts = [
  {
    id: BigInt(1),
    collection: Collection.Atelier,
    rarityMessage: "Only 12 pairs exist worldwide",
    name: "The Atelier Noir",
    createdAt: now,
    description:
      "Hand-finished in our Parisian atelier, each pair features 6,000 hand-stitched logo details. Crafted from our signature limited-harvest cotton, these trousers represent the pinnacle of our craft.",
    totalStock: BigInt(12),
    price: BigInt(189500),
    sizeStocks: [
      { size: Size.S, stock: BigInt(2) },
      { size: Size.M, stock: BigInt(4) },
      { size: Size.L, stock: BigInt(4) },
      { size: Size.XL, stock: BigInt(2) },
    ],
    material: "Single-origin Egyptian cotton, 800 thread count",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4b4e49?w=800"],
  },
  {
    id: BigInt(2),
    collection: Collection.Heritage,
    rarityMessage: "Only 8 pairs remain",
    name: "The Heritage Ivory",
    createdAt: now,
    description:
      "Our Heritage collection pays homage to generations of artisanal mastery. Woven from rare, hand-combed cotton cultivated in a single valley in Peru.",
    totalStock: BigInt(8),
    price: BigInt(224000),
    sizeStocks: [
      { size: Size.S, stock: BigInt(1) },
      { size: Size.M, stock: BigInt(3) },
      { size: Size.L, stock: BigInt(3) },
      { size: Size.XL, stock: BigInt(1) },
    ],
    material: "Single-valley Peruvian cotton, hand-combed",
    images: ["https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800"],
  },
  {
    id: BigInt(3),
    collection: Collection.Comfort,
    rarityMessage: "Limited to 24 pairs",
    name: "The Comfort Maison",
    createdAt: now,
    description:
      "The ultimate expression of effortless luxury. Supremely soft, impossibly refined. Each pair is numbered and comes with a certificate of authenticity.",
    totalStock: BigInt(24),
    price: BigInt(156000),
    sizeStocks: [
      { size: Size.XS, stock: BigInt(2) },
      { size: Size.S, stock: BigInt(4) },
      { size: Size.M, stock: BigInt(8) },
      { size: Size.L, stock: BigInt(6) },
      { size: Size.XL, stock: BigInt(3) },
      { size: Size.XXL, stock: BigInt(1) },
    ],
    material: "Rare limited-harvest Nile Valley cotton",
    images: ["https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800"],
  },
];

const sampleCart = {
  owner: samplePrincipal,
  updatedAt: now,
  items: [],
};

const sampleUserProfile = {
  id: samplePrincipal,
  name: "Valued Client",
  createdAt: now,
  email: "client@velourmaistion.com",
  preferences: {
    newsletter: true,
    sizePreference: "M",
    vipStatus: false,
    vipEnrolledAt: undefined,
    fitQuizResult: undefined,
  },
  updatedAt: now,
};

export const mockBackend: backendInterface = {
  addToCart: async () => sampleCart,
  addToWishlist: async () => undefined,
  assignCallerUserRole: async () => undefined,
  clearCart: async () => undefined,
  createOrder: async (shippingAddress, billingInfo) => ({
    id: BigInt(1),
    status: OrderStatus.Confirmed,
    owner: samplePrincipal,
    createdAt: now,
    updatedAt: now,
    totalAmount: BigInt(189500),
    shippingAddress,
    items: [
      {
        size: Size.M,
        productId: BigInt(1),
        productName: "The Atelier Noir",
        quantity: BigInt(1),
        unitPrice: BigInt(189500),
      },
    ],
    billingInfo,
  }),
  enrollVIP: async () => undefined,
  getCallerUserProfile: async () => null,
  getCallerUserRole: async () => UserRole.guest,
  getCart: async () => sampleCart,
  getFitQuizResult: async () => null,
  getOrder: async () => null,
  getProduct: async (id) => sampleProducts.find((p) => p.id === id) ?? null,
  getUserProfile: async () => sampleUserProfile,
  getVIPStatus: async () => false,
  getWishlist: async () => [],
  isCallerAdmin: async () => false,
  listOrders: async () => [],
  listProducts: async () => sampleProducts,
  listProductsByCollection: async (collection) =>
    sampleProducts.filter((p) => p.collection === collection),
  removeFromCart: async () => sampleCart,
  removeFromWishlist: async () => undefined,
  saveCallerUserProfile: async (name, email, preferences) => ({
    ...sampleUserProfile,
    name,
    email,
    preferences,
  }),
  saveFitQuizResult: async () => undefined,
  seedProducts: async () => BigInt(3),
  updateCartQuantity: async () => sampleCart,
  updateProductStock: async () => true,
  _initializeAccessControl: async () => {},
};
