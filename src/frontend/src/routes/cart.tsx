import { LuxuryButton } from "@/components/LuxuryButton";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Route as rootRoute } from "@/routes/__root";
import { Link } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const SHIPPING_ESTIMATE = 15;

function CartPage() {
  const { cart, removeItem, updateItem } = useCart();
  const { items, subtotal } = cart;

  const total = subtotal + (items.length > 0 ? SHIPPING_ESTIMATE : 0);

  if (items.length === 0) {
    return (
      <div
        data-ocid="cart.empty_state"
        className="min-h-[80vh] flex flex-col items-center justify-center gap-10 px-8 text-center"
      >
        <div className="w-20 h-20 border border-border flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <p className="tracking-luxury text-[10px] text-accent mb-4">
            Your Selection
          </p>
          <h1 className="font-display text-4xl text-foreground mb-4">
            Your Cart Is Empty
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm">
            The world's rarest trousers await. Each piece is a numbered
            invitation to something truly extraordinary.
          </p>
        </div>
        <LuxuryButton variant="gold" size="lg" asChild>
          <Link to="/collections" data-ocid="cart.explore_collections.link">
            Explore the Collections
          </Link>
        </LuxuryButton>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Page header */}
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 pt-14 pb-10 border-b border-border">
        <p className="tracking-luxury text-[10px] text-accent mb-3">
          Your Selection
        </p>
        <h1 className="font-display text-5xl text-foreground">Shopping Cart</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "piece" : "pieces"} reserved for
          you
        </p>
      </div>

      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
          {/* Cart items */}
          <div
            data-ocid="cart.list"
            className="flex flex-col divide-y divide-border"
          >
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.size}`}
                data-ocid={`cart.item.${idx + 1}`}
                className="flex gap-6 py-10 first:pt-0"
              >
                {/* Product image */}
                <Link
                  to="/collections/products/$productId"
                  params={{
                    productId: item.product.id,
                  }}
                  className="shrink-0 w-28 h-36 overflow-hidden bg-muted"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover image-luxury transition-luxury hover:scale-105"
                  />
                </Link>

                {/* Product details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="tracking-luxury text-[9px] text-accent mb-1">
                        {item.product.collectionName}
                      </p>
                      <Link
                        to="/collections/products/$productId"
                        params={{
                          productId: item.product.id,
                        }}
                        className="font-display text-xl text-foreground hover:text-accent transition-luxury block truncate"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.product.subtitle}
                      </p>
                    </div>
                    <p className="font-display text-xl text-foreground shrink-0">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between flex-wrap gap-4">
                    {/* Size tag */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="tracking-luxury text-[9px] text-muted-foreground">
                          Size
                        </span>
                        <span className="tracking-luxury text-[10px] text-foreground border border-border px-3 py-1">
                          {item.size}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ${item.product.price.toLocaleString()} each
                      </span>
                    </div>

                    {/* Quantity stepper + remove */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(
                              item.product.id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          data-ocid={`cart.qty_decrease.${idx + 1}`}
                          className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-luxury"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span
                          data-ocid={`cart.qty_value.${idx + 1}`}
                          className="w-9 h-9 flex items-center justify-center tracking-luxury text-xs border-x border-border"
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateItem(
                              item.product.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          data-ocid={`cart.qty_increase.${idx + 1}`}
                          className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-luxury"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id, item.size)}
                        data-ocid={`cart.delete_button.${idx + 1}`}
                        className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-luxury"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary sidebar */}
          <div
            data-ocid="cart.summary_panel"
            className="bg-card border border-border p-8 lg:sticky lg:top-28"
          >
            <p className="tracking-luxury text-[10px] text-muted-foreground mb-8">
              Order Summary
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Shipping (est.)
                </span>
                <span className="font-medium text-foreground">
                  ${SHIPPING_ESTIMATE}
                </span>
              </div>
              <div className="border-t border-border pt-5 flex items-center justify-between">
                <span className="tracking-luxury text-[10px] text-foreground">
                  Total
                </span>
                <span className="font-display text-2xl text-foreground">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <LuxuryButton variant="gold" size="lg" asChild className="w-full">
                <Link to="/checkout" data-ocid="cart.checkout_button">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </LuxuryButton>
              <LuxuryButton
                variant="secondary"
                size="lg"
                asChild
                className="w-full"
              >
                <Link to="/collections" data-ocid="cart.continue_shopping.link">
                  Continue Browsing
                </Link>
              </LuxuryButton>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span className="tracking-luxury text-[9px]">
                Secure & Encrypted Checkout
              </span>
            </div>

            {/* Exclusive note */}
            <div className="mt-8 p-4 bg-muted/40 border border-border">
              <p className="tracking-luxury text-[9px] text-accent mb-2">
                Your Privilege
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Each piece is held exclusively for you for 24 hours. Your
                selection reflects access that fewer than 0.1% of visitors ever
                receive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
