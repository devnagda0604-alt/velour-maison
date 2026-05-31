import { LuxuryButton } from "@/components/LuxuryButton";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { COLLECTIONS, PRODUCTS } from "@/data/products";
import { createRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Route as rootRoute } from "../__root";

export function HeritagePage() {
  const collection = COLLECTIONS.find((c) => c.id === "heritage")!;
  const products = PRODUCTS.filter((p) => p.collectionId === "heritage");

  return (
    <div data-ocid="heritage.page">
      {/* Collection hero */}
      <section
        data-ocid="heritage.hero.section"
        className="relative min-h-[70vh] flex items-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={collection.image}
            alt="The Heritage Collection"
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
              Collection 02 · {collection.productCount} Timeless Pieces
            </p>
            <h1 className="font-display font-normal text-5xl md:text-7xl text-primary-foreground leading-tight mb-6">
              The Heritage
              <br />
              <em className="italic">Collection</em>
            </h1>
            <p className="text-base text-primary-foreground/70 leading-relaxed text-luxury max-w-lg">
              {collection.description}
            </p>
            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="font-display text-3xl text-accent">4</p>
                <p className="tracking-luxury text-[9px] text-primary-foreground/50 mt-1">
                  Generations of Craft
                </p>
              </div>
              <div className="w-px h-10 bg-primary-foreground/20" />
              <div>
                <p className="font-display text-3xl text-accent">Naples</p>
                <p className="tracking-luxury text-[9px] text-primary-foreground/50 mt-1">
                  City of Origin
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
                  The Heritage Philosophy
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
                  Timeless cuts passed through generations
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
                  &ldquo;Some things should never change. The Heritage
                  Collection is our vow to the tailors who came before
                  us.&rdquo;
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                  The Heritage Collection draws from four generations of
                  Neapolitan tailoring tradition. These are patterns refined
                  over decades — cuts that have survived changing silhouettes
                  because they were never about fashion. They were about form.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                  We commissioned the grandchildren of the original Neapolitan
                  families to recreate these patterns using the same techniques
                  documented in their grandparents' notebooks. The hand-rolled
                  hems. The diagonal canvas. The natural shoulder. All of it
                  intact. None of it conceded to modernity.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                  A Heritage trouser does not announce itself. It simply
                  elevates everything worn with it — and the wearer knows why,
                  even if no one else in the room does.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section
        data-ocid="heritage.products.section"
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
              eyebrow={`${products.length} Timeless Pieces · Season II`}
              title="The Heritage Edit"
              subtitle="Cuts conceived across generations. Integrity woven into every thread."
              align="center"
            />
          </motion.div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-ocid={`heritage.products.item.${i + 1}`}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link */}
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
              Experience The Comfort Collection
            </p>
            <LuxuryButton
              variant="secondary"
              data-ocid="heritage.crosslink.comfort_button"
              asChild
            >
              <Link to="/collections/comfort">View Comfort</Link>
            </LuxuryButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections/heritage",
  component: HeritagePage,
});
