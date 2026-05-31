import { LuxuryButton } from "@/components/LuxuryButton";
import { SectionTitle } from "@/components/SectionTitle";
import { COLLECTIONS } from "@/data/products";
import { createRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Route as rootRoute } from "./__root";

const EDITORIAL: Record<string, { pull: string; body: string[] }> = {
  atelier: {
    pull: "Reserved for those who understand that true luxury cannot be hurried.",
    body: [
      "The Atelier Collection is our pinnacle expression — pieces born from 72 hours of individual artisan attention. Each trouser is conceived, cut, and hand-finished in a single atelier in Naples where only four master tailors are permitted to work on the garments.",
      "Production is capped at 80 pairs per season. Once a colourway sells out, it is retired. It does not return.",
    ],
  },
  heritage: {
    pull: "Four generations of knowledge pressed into every seam.",
    body: [
      "Heritage is our tribute to the old world — the Neapolitan tailors, the Savile Row cutters, the Venetian dyers who gave the trouser its language of refinement. We traced these lineages, commissioned the families who still carry them, and encoded their methods into each Heritage piece.",
      "Where Atelier is about statement, Heritage is about permanence. These trousers will outlast trends. They are designed to be passed on.",
    ],
  },
  comfort: {
    pull: "The privilege of feeling exceptional in everything you do.",
    body: [
      "The Comfort Collection begins with a radical question: why should luxury be uncomfortable? Our answer was to source a cotton so rare — harvested only once every three years from a single highland valley — that its softness is unlike anything the trouser world has seen.",
      "The result is a garment structured enough for the boardroom and forgiving enough for a transatlantic flight. Everyday luxury for those who will not settle.",
    ],
  },
};

export function CollectionsPage() {
  return (
    <div data-ocid="collections.page">
      {/* Page hero */}
      <section className="bg-primary py-32 md:py-44 text-center">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="tracking-luxury text-[10px] text-accent mb-5">
              Velour Maison · Three Universes
            </p>
            <h1 className="font-display font-normal text-5xl md:text-7xl text-primary-foreground leading-tight">
              The Collections
            </h1>
            <p className="mt-6 text-base text-primary-foreground/60 max-w-xl mx-auto leading-relaxed text-luxury">
              Three distinct philosophies. One uncompromising standard. Each
              pair hand-sewn from the rarest cotton on earth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collection details — alternating layout */}
      {COLLECTIONS.map((collection, i) => {
        const editorial = EDITORIAL[collection.id];
        const isEven = i % 2 === 0;
        return (
          <section
            key={collection.id}
            data-ocid={`collections.${collection.id}.section`}
            className={
              isEven
                ? "bg-background py-28 md:py-36"
                : "bg-muted/40 py-28 md:py-36"
            }
          >
            <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  isEven ? "" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={isEven ? "" : "lg:col-start-2"}
                >
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover image-luxury transition-luxury hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <p className="tracking-luxury text-[9px] text-accent mb-2">
                        {collection.highlight}
                      </p>
                      <p className="font-display text-xl text-primary-foreground">
                        {collection.tagline}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}
                >
                  <p className="tracking-luxury text-[10px] text-accent mb-4">
                    0{i + 1} — Collection
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-6">
                    {collection.name}
                  </h2>
                  <p className="font-display text-xl text-foreground/60 italic mb-8 leading-snug">
                    &ldquo;{editorial.pull}&rdquo;
                  </p>
                  {editorial.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-sm text-muted-foreground leading-relaxed text-luxury mb-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                  <div className="mt-10 flex items-center gap-6">
                    <LuxuryButton
                      variant="primary"
                      data-ocid={`collections.${collection.id}.explore_button`}
                      asChild
                    >
                      <a href={`/collections/${collection.id}`}>
                        Explore{" "}
                        {collection.name
                          .replace("The ", "")
                          .replace(" Collection", "")}
                      </a>
                    </LuxuryButton>
                    <span className="tracking-luxury text-[10px] text-muted-foreground">
                      {collection.productCount} exclusive pieces
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA band */}
      <section className="bg-primary py-20 text-center">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display text-2xl md:text-3xl text-primary-foreground mb-3">
              The season moves quickly.
            </p>
            <p className="text-sm text-primary-foreground/60 mb-8 text-luxury">
              Once a piece sells, it is retired permanently.
            </p>
            <LuxuryButton
              variant="gold"
              size="lg"
              data-ocid="collections.cta.shop_button"
              asChild
            >
              <Link to="/collections/atelier">
                Begin with The Atelier <ArrowRight className="w-4 h-4" />
              </Link>
            </LuxuryButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections",
  component: CollectionsPage,
});
