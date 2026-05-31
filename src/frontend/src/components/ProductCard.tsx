import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const badgeLabel =
    product.availableCount <= 5
      ? `Only ${product.availableCount} left`
      : product.isNew
        ? "New"
        : product.isBestseller
          ? "Bestseller"
          : product.isLimitedEdition
            ? "Limited"
            : null;

  return (
    <div
      data-ocid={`product.${product.id}.card`}
      className={cn("group relative", className)}
    >
      {/* Image container */}
      <Link
        to="/collections/products/$productId"
        params={{ productId: product.id }}
        className="block relative overflow-hidden aspect-[3/4]"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover image-luxury transition-luxury group-hover:scale-105"
        />
        {/* Badge */}
        {badgeLabel && (
          <div
            className={cn(
              "absolute top-4 left-4 tracking-luxury text-[9px] px-3 py-1.5",
              product.availableCount <= 5
                ? "bg-foreground text-background"
                : "bg-accent text-accent-foreground",
            )}
          >
            {badgeLabel}
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-luxury flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100">
          <span className="tracking-luxury text-[10px] text-primary-foreground border-b border-primary-foreground/60 pb-0.5">
            View Details
          </span>
        </div>
        {/* Quick add icon */}
        <button
          type="button"
          className="absolute top-4 right-4 w-9 h-9 bg-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-luxury hover:bg-primary hover:text-primary-foreground"
          aria-label={`Quick view ${product.name}`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
        </button>
      </Link>

      {/* Info */}
      <div className="pt-5 pb-2">
        <p className="tracking-luxury text-[9px] text-muted-foreground mb-1.5">
          {product.subtitle}
        </p>
        <Link
          to="/collections/products/$productId"
          params={{ productId: product.id }}
          className="font-display text-xl text-foreground hover:text-accent transition-luxury block leading-snug"
        >
          {product.name}
        </Link>
        <p className="mt-2 text-sm font-medium text-foreground">
          ${product.price.toLocaleString()}
          {product.isLimitedEdition && (
            <span className="ml-2 tracking-luxury text-[9px] text-accent">
              Limited Edition
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
