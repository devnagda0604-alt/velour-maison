import type { Cart, CartItem, Product, ProductSize } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; product: Product; size: ProductSize; quantity: number }
  | { type: "REMOVE"; productId: string; size: ProductSize }
  | { type: "UPDATE"; productId: string; size: ProductSize; quantity: number }
  | { type: "CLEAR" }
  | { type: "LOAD"; items: CartItem[] };

interface CartContextValue {
  cart: Cart;
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  removeItem: (productId: string, size: ProductSize) => void;
  updateItem: (productId: string, size: ProductSize, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "LOAD":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.findIndex(
        (i) => i.product.id === action.product.id && i.size === action.size,
      );
      if (existing >= 0) {
        const items = [...state.items];
        items[existing] = {
          ...items[existing],
          quantity: items[existing].quantity + action.quantity,
        };
        return { items };
      }
      return {
        items: [
          ...state.items,
          {
            product: action.product,
            size: action.size,
            quantity: action.quantity,
          },
        ],
      };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (i) => !(i.product.id === action.productId && i.size === action.size),
        ),
      };
    case "UPDATE":
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) =>
              !(i.product.id === action.productId && i.size === action.size),
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId && i.size === action.size
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

function buildCart(items: CartItem[]): Cart {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );
  return { items, totalItems, subtotal };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vm_cart");
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        dispatch({ type: "LOAD", items: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vm_cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = useCallback(
    (product: Product, size: ProductSize, quantity = 1) =>
      dispatch({ type: "ADD", product, size, quantity }),
    [],
  );
  const removeItem = useCallback(
    (productId: string, size: ProductSize) =>
      dispatch({ type: "REMOVE", productId, size }),
    [],
  );
  const updateItem = useCallback(
    (productId: string, size: ProductSize, quantity: number) =>
      dispatch({ type: "UPDATE", productId, size, quantity }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  return (
    <CartContext.Provider
      value={{
        cart: buildCart(state.items),
        addItem,
        removeItem,
        updateItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
