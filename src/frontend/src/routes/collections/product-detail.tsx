import { Breadcrumb } from "@/components/Breadcrumb";
import { LuxuryButton } from "@/components/LuxuryButton";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/utils";
import { Route as collectionsRoute } from "@/routes/collections";
import type { ProductSize } from "@/types";
import { Link, createRoute, useParams } from "@tanstack/react-router";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Feather,
  Gem,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";

export const Route = createRoute({
  getParentRoute: () => collectionsRoute,
  path: "/products/$productId",
  component: ProductDetailPage,
});

const ARTISAN_CARDS = [
  {
    icon: Gem,
    title: "Handcrafted Excellence",
    body: "Every VM monogram is hand-stitched by a single master artisan using 6,000 individual passes of 24-carat gold thread. Each logo takes over 14 hours of focused artisan attention — a tradition we will never automate.",
  },
  {
    icon: Feather,
    title: "The Material Story",
    body: "Our cotton is sourced from a 40-hectare valley in Peru, harvested only once every three years under strict biodynamic protocols. Each bale is numbered and traceable — there is simply no other fabric like it on earth.",
  },
  {
    icon: Award,
    title: "Artisan Signature",
    body: "Inside every waistband rests a hand-signed card from the artisan who stitched your garment — their name, atelier number, and the date of completion. You own a piece of their legacy.",
  },
];

function ProductDetailPage() {
  const { collectionId, productId } = useParams({ strict: false }) as {
    collectionId: string;
    productId: string;
  };
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const crossSell = PRODUCTS.filter(
    (p) => p.id !== productId && p.collectionId === collectionId,
  ).slice(0, 2);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-display text-2xl text-muted-foreground">
          Product not found.
        </p>
      </div>
    );
  }

  const isRare = product.availableCount <= 5;
  const isScarce = product.availableCount <= 12;

  function handleAddToCart() {
    if (!selectedSize || !product) return;
    addItem(product!, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const images =
    product.images.length > 1
      ? product.images
      : [product.images[0], product.images[0]];

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb bar */}
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 pt-10 pb-4">
        <Breadcrumb
          items={[
            { label: "Collections", href: "/collections" },
            {
              label: product.collectionName,
              href: `/collections/${collectionId}`,
            },
            { label: product.name },
          ]}
        />
      </div>

      {/* Main layout: image + info */}
      <section className="max-w-screen-2xl mx-auto px-8 md:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 xl:gap-20 items-start">
          {/* LEFT — image gallery */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div
              data-ocid="product_detail.main_image"
              className="relative overflow-hidden aspect-[4/5] bg-muted"
            >
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover image-luxury transition-luxury"
              />
              {product.isLimitedEdition && (
                <div className="absolute top-6 left-6 bg-accent text-accent-foreground tracking-luxury text-[9px] px-3 py-1.5">
                  Limited Edition
                </div>
              )}
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage(
                        (i) => (i - 1 + images.length) % images.length,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-luxury"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage((i) => (i + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-luxury"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  data-ocid={`product_detail.thumbnail.${idx + 1}`}
                  className={cn(
                    "w-20 h-24 overflow-hidden border-2 transition-luxury shrink-0",
                    activeImage === idx
                      ? "border-accent"
                      : "border-transparent hover:border-border",
                  )}
                  aria-label={`Image ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover image-luxury"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — product info */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            {/* Collection tag */}
            <p className="tracking-luxury text-[10px] text-accent">
              {product.collectionName}
            </p>

            {/* Name + price */}
            <div>
              <h1 className="font-display text-4xl xl:text-5xl leading-tight text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mb-4">
                {product.subtitle}
              </p>
              <p
                data-ocid="product_detail.price"
                className="font-display text-3xl text-accent"
              >
                ${product.price.toLocaleString()}
              </p>
            </div>

            {/* Rarity badge */}
            {isScarce && (
              <div
                data-ocid="product_detail.rarity_badge"
                className={cn(
                  "flex items-center gap-3 px-5 py-4 border",
                  isRare
                    ? "border-accent bg-accent/5"
                    : "border-border bg-secondary",
                )}
              >
                <span className="w-2 h-2 rounded-full bg-accent shrink-0 animate-pulse" />
                <span className="tracking-luxury text-[10px] text-foreground">
                  {isRare
                    ? `Only ${product.availableCount} remaining worldwide`
                    : `${product.availableCount} pieces available — this season only`}
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-luxury text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Artisan callout cards */}
            <div className="flex flex-col gap-4">
              {ARTISAN_CARDS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="flex gap-4 p-5 bg-card border border-border hover:border-accent/40 transition-luxury"
                >
                  <Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="tracking-luxury text-[10px] text-foreground mb-2">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Size selector */}
            <div>
              <p className="tracking-luxury text-[10px] text-muted-foreground mb-4">
                Select Size
                {!selectedSize && (
                  <span className="ml-2 text-accent">— required</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    data-ocid={`product_detail.size.${size}`}
                    className={cn(
                      "w-14 h-12 tracking-luxury text-xs border transition-luxury",
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-foreground border-border hover:border-foreground",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity picker */}
            <div>
              <p className="tracking-luxury text-[10px] text-muted-foreground mb-4">
                Quantity
              </p>
              <div className="flex items-center gap-0 border border-border w-fit">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  data-ocid="product_detail.qty_decrease"
                  className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-luxury"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span
                  data-ocid="product_detail.qty_value"
                  className="w-12 h-12 flex items-center justify-center tracking-luxury text-sm font-medium border-x border-border"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  data-ocid="product_detail.qty_increase"
                  className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-luxury"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Add to cart CTA */}
            <div className="flex flex-col gap-3">
              <LuxuryButton
                variant="gold"
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedSize}
                data-ocid="product_detail.add_to_cart_button"
                className="w-full"
              >
                {added ? "Added to Your Selection ✓" : "Add to My Selection"}
              </LuxuryButton>
              {!selectedSize && (
                <p className="tracking-luxury text-[9px] text-center text-muted-foreground">
                  Please select a size to continue
                </p>
              )}
              <LuxuryButton
                variant="secondary"
                size="lg"
                asChild
                className="w-full"
              >
                <Link to="/cart">View My Cart</Link>
              </LuxuryButton>
            </div>

            {/* Material tag */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="tracking-luxury text-[9px] text-muted-foreground">
                Material
              </span>
              <span className="tracking-luxury text-[9px] text-foreground">
                {product.material}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* You may also love */}
      {crossSell.length > 0 && (
        <section className="bg-muted/30 py-24">
          <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
            <p className="tracking-luxury text-[10px] text-accent mb-2">
              Curated For You
            </p>
            <h2 className="font-display text-3xl text-foreground mb-12">
              You May Also Love
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
              {crossSell.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
