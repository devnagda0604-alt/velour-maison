import { cn } from "@/lib/utils";
import type { Collection } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface CollectionCardProps {
  collection: Collection;
  className?: string;
  featured?: boolean;
}

export function CollectionCard({
  collection,
  className,
  featured = false,
}: CollectionCardProps) {
  const navigate = useNavigate();

  function handleClick() {
    const path = `/collections/${collection.id}` as
      | "/collections/atelier"
      | "/collections/heritage"
      | "/collections/comfort";
    navigate({ to: path });
  }

  return (
    <a
      href={`/collections/${collection.id}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      data-ocid={`collection.${collection.id}.card`}
      className={cn(
        "group relative block overflow-hidden transition-luxury cursor-pointer",
        featured ? "aspect-[3/4]" : "aspect-[4/5]",
        className,
      )}
    >
      {/* Image */}
      <img
        src={collection.image}
        alt={collection.name}
        className="absolute inset-0 w-full h-full object-cover image-luxury transition-luxury group-hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-luxury" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <p className="tracking-luxury text-[10px] text-accent mb-3">
          {collection.highlight}
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-2 leading-tight">
          {collection.name}
        </h3>
        <p className="text-sm text-primary-foreground/70 mb-6 leading-relaxed line-clamp-2">
          {collection.tagline}
        </p>
        <span className="inline-flex items-center gap-2 tracking-luxury text-[10px] text-primary-foreground border-b border-primary-foreground/40 pb-0.5 group-hover:border-accent group-hover:text-accent transition-luxury">
          Explore Collection <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
}
