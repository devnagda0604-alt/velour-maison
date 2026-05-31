import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserPreferences {
    vipEnrolledAt?: Timestamp;
    vipStatus: boolean;
    sizePreference?: string;
    newsletter: boolean;
    fitQuizResult?: FitQuizResult;
}
export type Timestamp = bigint;
export interface ProductPublic {
    id: ProductId;
    collection: Collection;
    rarityMessage: string;
    name: string;
    createdAt: Timestamp;
    description: string;
    totalStock: bigint;
    price: bigint;
    sizeStocks: Array<SizeStock>;
    material: string;
    images: Array<string>;
}
export interface ShippingAddress {
    country: string;
    city: string;
    postalCode: string;
    fullName: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
}
export interface WishlistItem {
    productId: ProductId;
    addedAt: Timestamp;
}
export interface OrderItem {
    size: Size;
    productId: ProductId;
    productName: string;
    quantity: bigint;
    unitPrice: bigint;
}
export interface OrderPublic {
    id: OrderId;
    status: OrderStatus;
    owner: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    totalAmount: bigint;
    shippingAddress: ShippingAddress;
    items: Array<OrderItem>;
    billingInfo: BillingInfo;
}
export interface UserProfilePublic {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    email: string;
    preferences: UserPreferences;
    updatedAt: Timestamp;
}
export interface FitQuizResultInput {
    confidenceScore: bigint;
    recommendedSize: string;
    fitPreference: string;
    bodyType: string;
}
export type UserId = Principal;
export interface BillingInfo {
    country: string;
    city: string;
    postalCode: string;
    fullName: string;
    email: string;
    addressLine1: string;
}
export interface FitQuizResult {
    completedAt: Timestamp;
    confidenceScore: bigint;
    recommendedSize: string;
    fitPreference: string;
    bodyType: string;
}
export type ProductId = bigint;
export interface SizeStock {
    size: Size;
    stock: bigint;
}
export interface CartPublic {
    owner: UserId;
    updatedAt: Timestamp;
    items: Array<CartItem>;
}
export interface CartItem {
    size: Size;
    productId: ProductId;
    quantity: bigint;
}
export type OrderId = bigint;
export enum Collection {
    Comfort = "Comfort",
    Atelier = "Atelier",
    Heritage = "Heritage"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    Shipped = "Shipped",
    Pending = "Pending"
}
export enum Size {
    L = "L",
    M = "M",
    S = "S",
    XL = "XL",
    XS = "XS",
    XXL = "XXL"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToCart(productId: ProductId, size: Size, quantity: bigint): Promise<CartPublic>;
    addToWishlist(productId: ProductId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    createOrder(shippingAddress: ShippingAddress, billingInfo: BillingInfo): Promise<OrderPublic>;
    enrollVIP(): Promise<void>;
    getCallerUserProfile(): Promise<UserProfilePublic | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<CartPublic>;
    getFitQuizResult(): Promise<FitQuizResult | null>;
    getOrder(orderId: OrderId): Promise<OrderPublic | null>;
    getProduct(id: ProductId): Promise<ProductPublic | null>;
    getUserProfile(user: UserId): Promise<UserProfilePublic | null>;
    getVIPStatus(): Promise<boolean>;
    getWishlist(): Promise<Array<WishlistItem>>;
    isCallerAdmin(): Promise<boolean>;
    listOrders(): Promise<Array<OrderPublic>>;
    listProducts(): Promise<Array<ProductPublic>>;
    listProductsByCollection(collection: Collection): Promise<Array<ProductPublic>>;
    removeFromCart(productId: ProductId, size: Size): Promise<CartPublic>;
    removeFromWishlist(productId: ProductId): Promise<void>;
    saveCallerUserProfile(name: string, email: string, preferences: UserPreferences): Promise<UserProfilePublic>;
    saveFitQuizResult(result: FitQuizResultInput): Promise<void>;
    seedProducts(entries: Array<{
        collection: Collection;
        rarityMessage: string;
        name: string;
        description: string;
        price: bigint;
        sizeStocks: Array<SizeStock>;
        material: string;
        images: Array<string>;
    }>): Promise<bigint>;
    updateCartQuantity(productId: ProductId, size: Size, quantity: bigint): Promise<CartPublic>;
    updateProductStock(id: ProductId, sizeStocks: Array<SizeStock>): Promise<boolean>;
}
