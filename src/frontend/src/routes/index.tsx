import { CollectionCard } from "@/components/CollectionCard";
import { LuxuryButton } from "@/components/LuxuryButton";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { COLLECTIONS, PRODUCTS } from "@/data/products";
import { createRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Crown, Gem, Leaf, Scissors } from "lucide-react";
import { motion } from "motion/react";
import { Route as rootRoute } from "./__root";

const DIFFERENTIATORS = [
  {
    icon: Scissors,
    label: "6,000 Hand-Stitches",
    description:
      "Every VM monogram is hand-embroidered with six thousand individual stitches by master artisans. A process requiring sixteen hours of devoted attention per garment.",
  },
  {
    icon: Gem,
    label: "Rare Heirloom Cotton",
    description:
      "Our cotton is cultivated in a single 40-hectare valley in highland Peru — a variety so rare it is harvested only once every three years. No substitutions are ever made.",
  },
  {
    icon: Leaf,
    label: "Artisan Crafted",
    description:
      "Each pair is born in a family atelier where four generations of Neapolitan tailors have refined the same patterns. Production is intentionally capped at 300 pairs per season.",
  },
];

export function IndexPage() {
  const featuredProducts = PRODUCTS.filter((p) => p.isBestseller).slice(0, 3);

  return (
    <div data-ocid="home.page">
      {/* ─── HERO ─── */}
      <section
        data-ocid="home.hero.section"
        className="relative min-h-[100svh] flex items-end overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-homepage.dim_1920x1080.jpg"
            alt="Velour Maison atelier"
            className="w-full h-full object-cover image-luxury"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-primary/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
        </div>

        {/* Scarcity ticker */}
        <div className="absolute top-24 right-8 md:right-16 flex flex-col items-end gap-1 z-10">
          <span className="tracking-luxury text-[9px] text-accent">
            Season II — 2026
          </span>
          <span className="tracking-luxury text-[9px] text-primary-foreground/50">
            47 of 300 remaining
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-8 md:px-16 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <p className="tracking-luxury text-[10px] text-accent mb-6">
              The Privileged Few · Est. 2019
            </p>
            <h1 className="font-display font-normal text-5xl md:text-7xl xl:text-8xl text-primary-foreground leading-[0.95] mb-6">
              Crafted by Hand.
              <br />
              <em className="italic">Limited by Nature.</em>
            </h1>
            <p className="text-base text-primary-foreground/70 leading-relaxed mb-10 max-w-md text-luxury">
              Only 300 pairs exist each season. You are among the select few
              privileged to discover Velour Maison.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LuxuryButton
                variant="gold"
                size="lg"
                data-ocid="home.hero.explore_button"
                asChild
              >
                <Link to="/collections">Explore Collections</Link>
              </LuxuryButton>
              <LuxuryButton
                variant="outline"
                size="lg"
                data-ocid="home.hero.atelier_button"
                asChild
              >
                <Link to="/collections/atelier">The Atelier</Link>
              </LuxuryButton>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <span className="tracking-luxury text-[8px] text-primary-foreground/40">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary-foreground/40 to-transparent" />
        </div>
      </section>

      {/* ─── DIFFERENTIATORS ─── */}
      <section
        data-ocid="home.differentiators.section"
        className="bg-background py-28 md:py-36"
      >
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle
              eyebrow="Why Velour Maison"
              title="The Standard No One Else Meets"
              subtitle="Three uncompromising pillars that place Velour Maison beyond the reach of ordinary luxury."
              align="center"
            />
          </motion.div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {DIFFERENTIATORS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 border border-accent/30 mb-7 group-hover:border-accent transition-luxury">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-4">
                    {d.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-luxury">
                    {d.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS PREVIEW ─── */}
      <section
        data-ocid="home.collections.section"
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
              eyebrow="Three Worlds of Luxury"
              title="Our Collections"
              subtitle="Each collection represents a distinct philosophy — but all share the same rare materials and obsessive craft."
              align="center"
            />
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLLECTIONS.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
              >
                <CollectionCard collection={collection} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <LuxuryButton
              variant="ghost"
              data-ocid="home.collections.view_all_button"
              asChild
            >
              <Link to="/collections">
                View All Collections <ArrowRight className="w-3 h-3" />
              </Link>
            </LuxuryButton>
          </div>
        </div>
      </section>

      {/* ─── ARTISAN DETAIL ─── */}
      <section
        data-ocid="home.artisan.section"
        className="bg-background py-28 md:py-36 overflow-hidden"
      >
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionTitle
                eyebrow="The Art of the Stitch"
                title="6,000 Reasons to Believe"
                subtitle={undefined}
                align="left"
              />
              <p className="mt-6 text-base text-muted-foreground leading-relaxed text-luxury max-w-lg">
                Before a single thread is cut, our master embroiderers study the
                grain of each cloth for two days. The VM monogram — rendered in
                24-carat gold thread — demands sixteen hours and 6,000
                individual stitches. No machine has ever touched the logo. No
                machine ever will.
              </p>
              <p className="mt-5 text-base text-muted-foreground leading-relaxed text-luxury max-w-lg">
                When you wear Velour Maison, you carry a tradition that most
                people will never witness, in a trouser that fewer than 300
                people in the world will own this season.
              </p>
              <div className="mt-10 flex items-center gap-10">
                <div>
                  <p className="font-display text-4xl text-foreground">6,000</p>
                  <p className="tracking-luxury text-[9px] text-muted-foreground mt-1">
                    Hand-Stitches Per Logo
                  </p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="font-display text-4xl text-foreground">16h</p>
                  <p className="tracking-luxury text-[9px] text-muted-foreground mt-1">
                    Artisan Attention
                  </p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="font-display text-4xl text-foreground">300</p>
                  <p className="tracking-luxury text-[9px] text-muted-foreground mt-1">
                    Pairs Per Season
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <img
                src="/assets/generated/artisan-stitching.dim_1200x800.jpg"
                alt="Artisan hand-stitching the VM monogram"
                className="w-full aspect-[4/3] object-cover image-luxury shadow-elevated"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-6 shadow-luxury border border-border">
                <p className="tracking-luxury text-[9px] text-accent mb-1">
                  Master Craft
                </p>
                <p className="font-display text-lg text-foreground leading-tight">
                  Each stitch, a testament.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section
        data-ocid="home.featured.section"
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
              eyebrow="The Sought-After Few"
              title="Most Wanted"
              subtitle="Pieces that those in the know acquire first. Act without hesitation."
              align="center"
            />
          </motion.div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ─── */}
      {/* ─── LOOKBOOK BAND ─── */}
      <section
        data-ocid="home.lookbook.section"
        className="relative bg-primary py-28 md:py-36 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/assets/generated/lookbook-editorial.dim_1200x800.jpg"
                alt="Velour Maison Lookbook editorial"
                className="w-full aspect-[4/3] object-cover image-luxury shadow-elevated"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent pointer-events-none" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <p className="tracking-luxury text-[10px] text-accent mb-5 flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> The Velour Maison Lookbook
              </p>
              <h2 className="font-display font-normal text-4xl md:text-5xl text-primary-foreground leading-[1.05] mb-6">
                Stories Woven
                <br />
                <em className="italic">in Silence</em>
              </h2>
              <p className="text-base text-primary-foreground/70 leading-relaxed text-luxury max-w-md mb-10">
                Step inside the world of Velour Maison — where highland valleys,
                Neapolitan ateliers, and the quiet certainty of the discerning
                few converge into images that transcend fashion and become
                memory.
              </p>
              <LuxuryButton
                variant="gold"
                size="lg"
                data-ocid="home.lookbook.explore_button"
                asChild
              >
                <Link to="/lookbook">
                  Explore Stories <ArrowRight className="w-3 h-3" />
                </Link>
              </LuxuryButton>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </section>
      <section
        data-ocid="home.story.section"
        className="bg-primary py-28 md:py-36"
      >
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/assets/generated/rare-cotton-field.dim_1200x800.jpg"
                alt="Rare heirloom cotton fields of highland Peru"
                className="w-full aspect-[4/3] object-cover image-luxury shadow-elevated"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <SectionTitle
                eyebrow="Our Origin"
                title="Born from a Refusal to Compromise"
                align="left"
                light
              />
              <p className="mt-6 text-base text-primary-foreground/70 leading-relaxed text-luxury">
                Velour Maison began with a single conviction: that the trouser —
                the foundation of every refined wardrobe — deserved to be
                reimagined without concession. We sourced a cotton so rare it
                grows in a single valley. We commissioned artisans whose
                techniques predate mechanised industry. We capped production so
                that every client remains part of a circle so small, its members
                recognise each other.
              </p>
              <p className="mt-5 text-base text-primary-foreground/70 leading-relaxed text-luxury">
                You are not browsing a catalogue. You are being extended an
                invitation — one that is withdrawn the moment our season closes.
              </p>
              <div className="mt-10">
                <LuxuryButton
                  variant="outline"
                  size="lg"
                  data-ocid="home.story.about_button"
                  asChild
                >
                  <Link to="/about">Our Story</Link>
                </LuxuryButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SCARCITY NOTICE ─── */}
      {/* ─── VIP INNER CIRCLE ─── */}
      <section
        data-ocid="home.vip.section"
        className="relative bg-background py-28 md:py-36 border-t border-border overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 border border-accent/40 mb-8 bg-accent/5">
              <Crown className="w-6 h-6 text-accent" />
            </div>
            <p className="tracking-luxury text-[10px] text-accent mb-5">
              Strictly By Invitation · The Inner Circle
            </p>
            <h2 className="font-display font-normal text-4xl md:text-6xl text-foreground leading-[1.05] mb-6">
              A Privilege Offered
              <br />
              <em className="italic text-accent">to Very Few.</em>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed text-luxury max-w-xl mx-auto mb-4">
              The Velour Maison Inner Circle is not a rewards programme. It is a
              private standing granted to clients who understand what it means
              to own something truly irreplaceable — early access to each
              season, personal atelier consultations, and pieces that never
              reach the public floor.
            </p>
            <p className="text-sm text-muted-foreground/70 leading-relaxed text-luxury max-w-md mx-auto mb-10">
              Membership is capped at 120 individuals globally. As of this
              season,{" "}
              <span className="text-accent font-medium">11 seats remain.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LuxuryButton
                variant="gold"
                size="lg"
                data-ocid="home.vip.claim_button"
                asChild
              >
                <Link to="/vip">
                  <Crown className="w-3.5 h-3.5" /> Claim Your Membership
                </Link>
              </LuxuryButton>
              <LuxuryButton
                variant="ghost"
                data-ocid="home.vip.learn_button"
                asChild
              >
                <Link to="/vip">
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link>
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </section>
      <section
        data-ocid="home.scarcity.section"
        className="bg-background py-24 border-t border-border"
      >
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="tracking-luxury text-[10px] text-accent mb-6">
              A Rare Privilege
            </p>
            <p className="font-display text-3xl md:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
              Each creation exists in limited numbers.
              <br />
              <em className="italic text-accent">You are among the few.</em>
            </p>
            <p className="mt-8 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed text-luxury">
              This season, only 300 pairs of Velour Maison trousers will leave
              our atelier. Once they are gone, this chapter of our story closes.
              Your presence here is not accidental — it is earned.
            </p>
            <div className="mt-10">
              <LuxuryButton
                variant="primary"
                size="lg"
                data-ocid="home.scarcity.shop_button"
                asChild
              >
                <Link to="/collections">Claim Your Pair</Link>
              </LuxuryButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});
