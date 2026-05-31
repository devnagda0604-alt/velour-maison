import { LuxuryButton } from "@/components/LuxuryButton";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { COLLECTIONS, PRODUCTS } from "@/data/products";
import { createRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Route as rootRoute } from "../__root";

export function ComfortPage() {
  const collection = COLLECTIONS.find((c) => c.id === "comfort")!;
  const products = PRODUCTS.filter((p) => p.collectionId === "comfort");

  return (
    <div data-ocid="comfort.page">
      {/* Collection hero */}
      <section
        data-ocid="comfort.hero.section"
        className="relative min-h-[70vh] flex items-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={collection.image}
            alt="The Comfort Collection"
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
              Collection 03 · {collection.productCount} Exceptional Pieces
            </p>
            <h1 className="font-display font-normal text-5xl md:text-7xl text-primary-foreground leading-tight mb-6">
              The Comfort
              <br />
              <em className="italic">Collection</em>
            </h1>
            <p className="text-base text-primary-foreground/70 leading-relaxed text-luxury max-w-lg">
              {collection.description}
            </p>
            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="font-display text-3xl text-accent">3yr</p>
                <p className="tracking-luxury text-[9px] text-primary-foreground/50 mt-1">
                  Cotton Harvest Cycle
                </p>
              </div>
              <div className="w-px h-10 bg-primary-foreground/20" />
              <div>
                <p className="font-display text-3xl text-accent">220g</p>
                <p className="tracking-luxury text-[9px] text-primary-foreground/50 mt-1">
                  Ultra-Fine Weight
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
                  The Comfort Philosophy
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
                  Everyday luxury for the privileged
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
                  &ldquo;True luxury is not worn for others. It is worn for
                  oneself — in the quiet knowledge that the fabric against your
                  skin is the finest that exists.&rdquo;
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                  The Comfort Collection began with a deceptively simple
                  question: why does luxury have to be uncomfortable? The
                  answer, we discovered, is that it does not — provided you are
                  willing to source cotton that most of the world has never
                  heard of.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                  Our tri-annual harvest cotton is cultivated on a strict
                  three-year cycle in a highland valley where altitude,
                  humidity, and mineral-rich soil combine to produce fibres of
                  extraordinary length and fineness. The resulting fabric — at
                  just 220gsm — whispers against the skin in a way that heavier
                  luxury fabrics simply cannot.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                  You could wear these trousers to a board meeting, a long
                  flight, or a quiet Sunday morning. They will serve you equally
                  in all three — because they were made for someone who moves
                  through life without compromise.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Comfort feature callout */}
      <section className="bg-primary py-20">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                stat: "40°",
                label: "Machine Washable",
                desc: "The only Velour Maison collection that can be laundered at home, without sacrificing a single thread of integrity.",
              },
              {
                stat: "360°",
                label: "Stretch Comfort",
                desc: "An invisible 2% elastane integration allows movement without ever losing the clean trouser silhouette.",
              },
              {
                stat: "∞",
                label: "Wearability",
                desc: "Designed to be worn everywhere — boardroom, business travel, leisure — without a single concession to comfort.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-5xl text-accent mb-4">
                  {item.stat}
                </p>
                <p className="tracking-luxury text-[10px] text-primary-foreground/60 mb-3">
                  {item.label}
                </p>
                <p className="text-sm text-primary-foreground/50 leading-relaxed text-luxury">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section
        data-ocid="comfort.products.section"
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
              eyebrow={`${products.length} Everyday Luxury Pieces · Season II`}
              title="The Comfort Edit"
              subtitle="Exceptional softness for those who will not settle for less. Every day."
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
                data-ocid={`comfort.products.item.${i + 1}`}
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
              Begin at the Pinnacle
            </p>
            <p className="font-display text-2xl md:text-3xl text-foreground mb-8">
              Explore The Atelier Collection
            </p>
            <LuxuryButton
              variant="secondary"
              data-ocid="comfort.crosslink.atelier_button"
              asChild
            >
              <Link to="/collections/atelier">View Atelier</Link>
            </LuxuryButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections/comfort",
  component: ComfortPage,
});
