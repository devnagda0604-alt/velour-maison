import { LuxuryButton } from "@/components/LuxuryButton";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { COLLECTIONS, PRODUCTS } from "@/data/products";
import { createRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Route as rootRoute } from "../__root";

export function AtelierPage() {
  const collection = COLLECTIONS.find((c) => c.id === "atelier")!;
  const products = PRODUCTS.filter((p) => p.collectionId === "atelier");

  return (
    <div data-ocid="atelier.page">
      {/* Collection hero */}
      <section
        data-ocid="atelier.hero.section"
        className="relative min-h-[70vh] flex items-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={collection.image}
            alt="The Atelier Collection"
            className="w-full h-full object-cover image-luxury"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-primary/20" />
        </div>
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 md:px-16 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            <p className="tracking-luxury text-[10px] text-accent mb-4">
              Collection 01 · {collection.productCount} Exclusive Pieces
            </p>
            <h1 className="font-display font-normal text-5xl md:text-7xl text-primary-foreground leading-tight mb-6">
              The Atelier
              <br />
              <em className="italic">Collection</em>
            </h1>
            <p className="text-base text-primary-foreground/70 leading-relaxed text-luxury max-w-lg">
              {collection.description}
            </p>
            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="font-display text-3xl text-accent">72h</p>
                <p className="tracking-luxury text-[9px] text-primary-foreground/50 mt-1">
                  Artisan Attention
                </p>
              </div>
              <div className="w-px h-10 bg-primary-foreground/20" />
              <div>
                <p className="font-display text-3xl text-accent">80</p>
                <p className="tracking-luxury text-[9px] text-primary-foreground/50 mt-1">
                  Pairs Per Season
                </p>
              </div>
              <div className="w-px h-10 bg-primary-foreground/20" />
              <div>
                <p className="font-display text-3xl text-accent">6,000</p>
                <p className="tracking-luxury text-[9px] text-primary-foreground/50 mt-1">
                  Hand-Stitches
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editorial copy */}
      <section className="bg-background py-20 md:py-24 border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="tracking-luxury text-[10px] text-accent mb-4">
                  The Atelier Philosophy
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
                  For the discerning connoisseur
                </h2>
              </motion.div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-5"
              >
                <p className="font-display text-xl italic text-foreground/70 leading-snug">
                  &ldquo;Conceived in silence. Stitched in devotion. Worn by
                  those who measure quality not in price, but in
                  sacrifice.&rdquo;
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                  The Atelier Collection is not designed for the many. Each
                  piece requires 72 hours of individual artisan attention —
                  three full days of focused devotion before a pair of trousers
                  leaves our Naples workshop. Only four master tailors in the
                  world are permitted to work on Atelier pieces.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                  The cotton — sourced exclusively from a 40-hectare valley in
                  highland Peru — is cultivated on a three-year cycle. This
                  enforced scarcity is not a marketing strategy. It is the
                  nature of the material itself. You cannot rush it. You cannot
                  replicate it.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                  If you are reading this, you have arrived at precisely the
                  right moment. Or perhaps the collection has already found the
                  people it was made for, and what remains is a document of
                  something extraordinary that briefly existed.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section
        data-ocid="atelier.products.section"
        className="bg-muted/40 py-28 md:py-36"
      >
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle
              eyebrow={`${products.length} Available Pieces · Season II`}
              title="The Atelier Edit"
              subtitle="Each numbered. Each irreplaceable. Once a colourway closes, it does not return."
              align="center"
            />
          </motion.div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-ocid={`atelier.products.item.${i + 1}`}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link to Heritage */}
      <section className="bg-background py-20 text-center border-t border-border">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="tracking-luxury text-[10px] text-accent mb-4">
              Also Explore
            </p>
            <p className="font-display text-2xl md:text-3xl text-foreground mb-8">
              Discover The Heritage Collection
            </p>
            <LuxuryButton
              variant="secondary"
              data-ocid="atelier.crosslink.heritage_button"
              asChild
            >
              <Link to="/collections/heritage">View Heritage</Link>
            </LuxuryButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections/atelier",
  component: AtelierPage,
});
