import { LuxuryButton } from "@/components/LuxuryButton";
import { SectionTitle } from "@/components/SectionTitle";
import { createRoute } from "@tanstack/react-router";
import {
  Award,
  Clock,
  Gem,
  Heart,
  Leaf,
  Mail,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Route as rootRoute } from "./__root";

// --- Artisan data ---
const ARTISANS = [
  {
    initials: "HB",
    name: "Henri Beaumont",
    years: 34,
    specialty: "Logo Embroidery & Thread Tension",
    quote:
      "Every stitch is a breath. I place each one as if it were the last garment I will ever touch.",
  },
  {
    initials: "FC",
    name: "Fatima Chelouhi",
    years: 27,
    specialty: "Waistband Construction & Seam Architecture",
    quote:
      "A trouser is not sewn, it is sculpted. The fabric must feel like a second skin, not a garment.",
  },
  {
    initials: "OT",
    name: "Oluwaseun Taiwo",
    years: 22,
    specialty: "Cotton Preparation & Fabric Pre-Tension",
    quote:
      "Before the needle even touches cloth, I spend an hour preparing the canvas. The care is in the invisible.",
  },
];

// --- Brand values ---
const VALUES = [
  {
    icon: Gem,
    title: "Exclusivity",
    description:
      "Our garments are deliberately limited. A Velour Maison piece is not for everyone — it is for the rare few who understand that true luxury is earned, not purchased.",
  },
  {
    icon: Award,
    title: "Craftsmanship",
    description:
      "Each trouser passes through twelve artisan hands before it leaves our atelier. No machine replaces the human eye, the human touch, the human instinct for perfection.",
  },
  {
    icon: Heart,
    title: "Comfort",
    description:
      "We believe the highest form of luxury is not to be seen, but to be felt. The exquisite comfort of a Velour Maison pair is a private, daily pleasure.",
  },
  {
    icon: Leaf,
    title: "Rarity",
    description:
      "Our heirloom cotton is harvested once a year in limited quantities from a single region. We purchase the entire yield. There is no substitute, and we accept no alternatives.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We make no compromises on material, method, or meaning. Every choice — from thread weight to packaging — reflects our absolute commitment to the original standard.",
  },
];

// --- Contact form ---
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        data-ocid="about.contact.success_state"
        className="py-16 text-center"
      >
        <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
        <p className="font-display text-2xl text-primary-foreground mb-2">
          Your message has been received.
        </p>
        <p className="text-sm text-primary-foreground/60">
          A member of our atelier team will be in touch within 48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      data-ocid="about.contact.form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="tracking-luxury text-[10px] text-primary-foreground/60"
          >
            Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            data-ocid="about.contact.name.input"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full bg-transparent border-b border-primary-foreground/30 focus:border-accent outline-none py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 transition-luxury"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="tracking-luxury text-[10px] text-primary-foreground/60"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            data-ocid="about.contact.email.input"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="w-full bg-transparent border-b border-primary-foreground/30 focus:border-accent outline-none py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 transition-luxury"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="tracking-luxury text-[10px] text-primary-foreground/60"
        >
          Your Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          data-ocid="about.contact.message.textarea"
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="w-full bg-transparent border-b border-primary-foreground/30 focus:border-accent outline-none py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/30 transition-luxury resize-none"
          placeholder="How may we assist you?"
        />
      </div>
      <div className="pt-4">
        <LuxuryButton
          type="submit"
          variant="outline"
          size="lg"
          data-ocid="about.contact.submit_button"
        >
          Send Inquiry
        </LuxuryButton>
      </div>
    </form>
  );
}

// --- Page Component ---
export function AboutPage() {
  return (
    <>
      {/* ── Section 1: Brand Origin Hero ── */}
      <section
        data-ocid="about.hero.section"
        className="relative bg-primary min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Subtle background texture lines */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, oklch(0.97 0.005 80) 0px, oklch(0.97 0.005 80) 1px, transparent 1px, transparent 60px)",
          }}
        />
        {/* Gold decorative top rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <p className="tracking-luxury text-[10px] text-accent">
            Est. 2004 · Paris & Milan
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-normal leading-[1.1]">
            Where comfort meets
            <br />
            <em className="italic text-accent">the unattainable.</em>
          </h1>
          <p className="text-sm md:text-base text-primary-foreground/60 leading-relaxed max-w-2xl mx-auto">
            For over twenty years, Velour Maison has pursued a singular
            obsession: the perfect trouser. Not defined by trend, not dictated
            by season — but by an unyielding standard of material, construction,
            and comfort that places our garments in a category entirely their
            own.
          </p>
          <div className="w-12 h-[2px] bg-accent mx-auto" />
          <p className="text-xs text-primary-foreground/40 tracking-luxury">
            A rare experience. Worn by fewer than 3,000 people worldwide.
          </p>
        </motion.div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent pointer-events-none"
        />
      </section>

      {/* ── Section 2: Founder Vision ── */}
      <section
        data-ocid="about.founder.section"
        className="bg-background py-28 px-6"
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Portrait placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[3/4] bg-primary flex flex-col items-center justify-center rounded-none relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.22 0.05 258) 0%, oklch(0.14 0.04 258) 60%, oklch(0.19 0.06 80) 100%)",
                }}
              />
              <span className="font-display text-[80px] text-primary-foreground/20 relative z-10 select-none">
                AM
              </span>
              <p className="tracking-luxury text-[9px] text-primary-foreground/30 relative z-10 mt-2">
                Alexandre Mercier
              </p>
            </div>
            {/* Gold corner accent */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-accent" />
          </motion.div>

          {/* Founder letter */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-8 pt-4"
          >
            <p className="tracking-luxury text-[10px] text-accent">
              A Letter from the Founder
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground font-normal leading-tight">
              Why trousers?
              <br />
              <em className="italic">Because they are everything.</em>
            </h2>
            <div className="space-y-5 text-luxury text-sm text-muted-foreground">
              <p>
                People ask me why I chose trousers. Not shoes — which carry you
                through the world. Not bags — which hold your story. But
                trousers. The answer is simple: of all the garments a person
                wears, trousers are the ones that demand the most of us, and
                give the least recognition in return.
              </p>
              <p>
                They move with you. They breathe with your body. They carry the
                architecture of your posture, the rhythm of your walk, the quiet
                confidence of how you occupy a room. And yet, for decades, the
                industry treated them as an afterthought — a garment to complete
                an outfit, not to define it.
              </p>
              <p>
                I founded Velour Maison in 2004 with one conviction: that the
                trouser, crafted without compromise, is the highest possible
                expression of confident luxury. Not the kind that announces
                itself — but the kind that is felt. By you. First. Every
                morning, when you dress.
              </p>
              <p>
                We use a cotton so rare that we purchase the entire annual yield
                of a single valley. We employ artisans who have spent decades
                mastering a single technique. And we stitch 6,000 individual
                stitches onto each logo — not because anyone will count them,
                but because we know they are there.
              </p>
              <p>
                Comfort, to us, is not softness. It is the feeling of a garment
                that has been thought through completely — where nothing is left
                to chance and everything is left to intention.
              </p>
            </div>
            <div className="pt-4">
              <p className="font-display text-xl text-foreground italic">
                Alexandre Mercier
              </p>
              <p className="tracking-luxury text-[10px] text-muted-foreground mt-1">
                Founder &amp; Creative Director, Velour Maison
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: 6000 Stitch Standard ── */}
      <section
        data-ocid="about.stitches.section"
        className="bg-primary py-28 px-6 relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.62 0.1 78) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <p className="tracking-luxury text-[10px] text-accent mb-6">
                The Invisible Signature
              </p>
              <div className="font-display text-[100px] md:text-[140px] leading-none text-primary-foreground/15 select-none">
                6,000
              </div>
              <p className="font-display text-3xl md:text-4xl text-primary-foreground font-normal mt-2 leading-snug">
                Stitches. Hand-placed.
                <br />
                <em className="italic text-accent">One at a time.</em>
              </p>
            </div>
            <div className="space-y-5 text-sm text-primary-foreground/65 text-luxury">
              <p>
                Each logo on every Velour Maison garment is embroidered by a
                master artisan using a single thread of 24-carat gold-plated
                cotton. The process takes between four and six hours per
                garment.
              </p>
              <p>
                Six thousand individual stitches. Each placed with intention.
                Each a conscious decision. The result is a mark so precise, so
                dense with craft, that it is perceptible only to the touch — a
                private texture known only to its wearer.
              </p>
              <p>
                This is not decoration. This is a declaration. That you are
                wearing something made by a human being who cared deeply about
                your experience, even though they will never meet you.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-[2px] bg-accent" />
              <p className="tracking-luxury text-[10px] text-accent">
                Certified by the Atelier Council of Lyon
              </p>
            </div>
          </motion.div>

          {/* Stitching image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src="/assets/generated/about-stitching-detail.dim_1200x800.jpg"
                alt="6,000 hand-stitches close-up detail"
                className="w-full h-full object-cover image-luxury"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent" />
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: The Cotton ── */}
      <section
        data-ocid="about.cotton.section"
        className="bg-background py-28 px-6 relative overflow-hidden"
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Cotton fields image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/2] overflow-hidden relative">
              <img
                src="/assets/generated/about-cotton-fields.dim_1200x700.jpg"
                alt="Rare heirloom cotton fields"
                className="w-full h-full object-cover image-luxury"
                loading="lazy"
              />
            </div>
            {/* Map pin marker decoration */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-card border border-border flex flex-col items-center justify-center shadow-luxury">
              <p className="font-display text-3xl text-accent font-normal">
                1×
              </p>
              <p className="tracking-luxury text-[8px] text-muted-foreground text-center mt-0.5">
                Annual
                <br />
                Harvest
              </p>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-8"
          >
            <SectionTitle
              eyebrow="The Material"
              title="Cotton found in one valley. On Earth."
              align="left"
            />
            <div className="space-y-5 text-sm text-muted-foreground text-luxury">
              <p>
                The Karakoram Foothills of Northern Pakistan host a microclimate
                found nowhere else on the planet — a narrow band of altitude,
                humidity, and temperature that produces a cotton of
                extraordinary fineness. Our heirloom variety, cultivated for
                over 200 years by a single farming family, yields fibres with a
                thread count of 420 per centimetre.
              </p>
              <p>
                It is harvested by hand once a year in limited quantities, in
                October. The entire annual yield — 3.8 metric tonnes — is
                purchased exclusively by Velour Maison. No other brand has
                access. No substitute is acceptable.
              </p>
              <p>
                Each pair of Velour Maison trousers uses precisely 2.4 metres of
                this cotton. We produce no more garments than our cotton allows.
                When it is gone, the season is closed.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { stat: "420", unit: "threads/cm", label: "Fibre Density" },
                { stat: "2.4m", unit: "per pair", label: "Cotton Used" },
                { stat: "200+", unit: "years", label: "Heritage Strain" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="font-display text-2xl text-accent">
                    {item.stat}
                  </p>
                  <p className="tracking-luxury text-[8px] text-muted-foreground">
                    {item.unit}
                  </p>
                  <p className="text-[11px] text-foreground/60">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 5: Artisan Spotlights ── */}
      <section
        data-ocid="about.artisans.section"
        className="bg-secondary/40 py-28 px-6"
      >
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <SectionTitle
              eyebrow="The Hands Behind the Work"
              title="Our artisans are the soul of Velour Maison."
              subtitle="Each has dedicated decades to a single discipline. Their names are not on the label. But their intention is in every stitch."
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTISANS.map((artisan, i) => (
              <motion.div
                key={artisan.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                data-ocid={`about.artisan.item.${i + 1}`}
                className="bg-card border border-border p-8 space-y-6 group hover:border-accent transition-luxury"
              >
                {/* Portrait placeholder */}
                <div className="w-20 h-20 bg-primary flex items-center justify-center relative">
                  <span className="font-display text-2xl text-primary-foreground/60 group-hover:text-accent transition-luxury">
                    {artisan.initials}
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent" />
                </div>
                <div>
                  <p className="font-display text-xl text-foreground">
                    {artisan.name}
                  </p>
                  <p className="tracking-luxury text-[9px] text-accent mt-1">
                    {artisan.years} Years of Craft
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {artisan.specialty}
                  </p>
                </div>
                <blockquote className="text-sm text-muted-foreground italic leading-relaxed border-l-2 border-accent/40 pl-4">
                  &ldquo;{artisan.quote}&rdquo;
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Brand Values ── */}
      <section
        data-ocid="about.values.section"
        className="bg-background py-28 px-6"
      >
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <SectionTitle
              eyebrow="What We Stand For"
              title="Five principles. No exceptions."
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-ocid={`about.value.item.${i + 1}`}
                className="group space-y-5 p-6 border border-border hover:border-accent transition-luxury"
              >
                <value.icon className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-display text-lg text-foreground mb-2">
                    {value.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Contact CTA ── */}
      <section
        data-ocid="about.contact.section"
        className="bg-primary py-28 px-6"
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-10"
          >
            <div>
              <p className="tracking-luxury text-[10px] text-accent mb-6">
                Private Inquiries
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-primary-foreground font-normal leading-tight">
                We respond personally
                <br />
                <em className="italic text-accent">to every message.</em>
              </h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="tracking-luxury text-[9px] text-primary-foreground/50 mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:atelier@velourmaisonparis.com"
                    data-ocid="about.contact.email.link"
                    className="text-sm text-primary-foreground hover:text-accent transition-luxury"
                  >
                    atelier@velourmaisonparis.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="tracking-luxury text-[9px] text-primary-foreground/50 mb-1">
                    Atelier Hours
                  </p>
                  <p className="text-sm text-primary-foreground/70">
                    Monday – Friday, 10:00 – 18:00 CET
                  </p>
                  <p className="text-xs text-primary-foreground/40 mt-1">
                    We observe a 48-hour response window.
                    <br />
                    No inquiry goes unanswered.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div className="w-full h-[1px] bg-primary-foreground/10" />
              <p className="text-xs text-primary-foreground/30 mt-6 leading-relaxed">
                For wholesale, press, or partnership inquiries, please include
                your organisation and purpose in your message. We read every
                note.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
