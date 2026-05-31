import { createActor } from "@/backend";
import { LuxuryButton } from "@/components/LuxuryButton";
import { useAuth } from "@/contexts/AuthContext";
import { PRODUCTS } from "@/data/products";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createRoute, useNavigate } from "@tanstack/react-router";
import { Clock, Crown, Gem, ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vip",
  component: VIPPage,
});

const ATELIER_PRODUCTS = PRODUCTS.filter((p) => p.collectionId === "atelier");

const BENEFITS = [
  {
    icon: Sparkles,
    title: "First Access to Every Drop",
    description:
      "Before the public is even notified, Inner Circle members receive private previews and purchase windows — 72 hours ahead of any release.",
  },
  {
    icon: Gem,
    title: "Member-Only Atelier Pieces",
    description:
      "Certain Atelier creations never reach the public store. They exist solely for Inner Circle members — numbered, certified, and unrepeatable.",
  },
  {
    icon: Star,
    title: "Artisan Invitation Events",
    description:
      "Twice a year, members are invited to our ateliers in Florence and Paris — to witness the 6,000-stitch process firsthand, in private.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Concierge",
    description:
      "A personal stylist and priority service line — available exclusively to members. Your orders move first. Your questions are answered within the hour.",
  },
];

function useVIPStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["vip-status"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.getVIPStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

function useEnrollVIP() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.enrollVIP();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vip-status"] });
    },
  });
}

function VIPPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: isVIP, isLoading: statusLoading } = useVIPStatus();
  const enrollMutation = useEnrollVIP();

  function handleEnroll() {
    if (!isAuthenticated) {
      navigate({ to: "/account/login" });
      return;
    }
    enrollMutation.mutate();
  }

  return (
    <div data-ocid="vip.page">
      {/* ─── Hero ───────────────────────────────────────────────── */}
      <section
        className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "oklch(0.14 0.042 258)" }}
        data-ocid="vip.hero.section"
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(/assets/generated/vip-inner-circle.dim_1600x900.jpg)",
          }}
        />
        {/* Gold decorative top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "oklch(0.62 0.1 78)" }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.62 0.1 78 / 0.08), transparent)",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p
              className="tracking-luxury text-xs mb-6"
              style={{ color: "oklch(0.62 0.1 78)" }}
            >
              ✦ By Invitation Only ✦
            </p>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl leading-[1.1] mb-6"
            style={{ color: "oklch(0.965 0.008 80)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            The Inner Circle
          </motion.h1>

          <motion.div
            className="w-24 h-px mx-auto mb-6"
            style={{ background: "oklch(0.62 0.1 78)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          />

          <motion.p
            className="text-base md:text-lg leading-relaxed mb-4 max-w-xl mx-auto"
            style={{ color: "oklch(0.75 0.012 258)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            You have not arrived here by accident. These pages do not appear in
            search results. You were brought here because you belong here —
            among the{" "}
            <span style={{ color: "oklch(0.62 0.1 78)" }}>847 members</span> who
            understand that true luxury is never mass-produced.
          </motion.p>

          <motion.p
            className="text-sm mb-10"
            style={{ color: "oklch(0.55 0.015 258)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Velour Maison crafts fewer than 300 pairs per collection — each
            stitched by hand, each irreplaceable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <VIPCTAButton
              isAuthenticated={isAuthenticated}
              isVIP={isVIP ?? false}
              isLoading={statusLoading || enrollMutation.isPending}
              isSuccess={enrollMutation.isSuccess}
              onEnroll={handleEnroll}
            />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div
            className="w-px h-12"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.62 0.1 78), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* ─── Scarcity Banner ───────────────────────────────────── */}
      <section
        className="py-5 text-center"
        style={{ background: "oklch(0.62 0.1 78)" }}
        data-ocid="vip.scarcity.section"
      >
        <p
          className="tracking-luxury text-xs font-semibold"
          style={{ color: "oklch(0.14 0.042 258)" }}
        >
          <Clock size={11} className="inline mr-2 mb-0.5" />
          Only 847 members worldwide — 6 invitations remaining this season
        </p>
      </section>

      {/* ─── Benefits ──────────────────────────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ background: "oklch(0.965 0.008 80)" }}
        data-ocid="vip.benefits.section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="tracking-luxury text-xs mb-4"
              style={{ color: "oklch(0.62 0.1 78)" }}
            >
              Membership Privileges
            </p>
            <h2
              className="font-display text-4xl md:text-5xl"
              style={{ color: "oklch(0.14 0.042 258)" }}
            >
              What you are owed
            </h2>
            <div
              className="w-16 h-px mx-auto mt-5"
              style={{ background: "oklch(0.62 0.1 78)" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-ocid={`vip.benefit.${i + 1}`}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center border"
                  style={{
                    borderColor: "oklch(0.62 0.1 78 / 0.4)",
                    background: "oklch(0.62 0.1 78 / 0.06)",
                  }}
                >
                  <benefit.icon
                    size={18}
                    style={{ color: "oklch(0.62 0.1 78)" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-display text-xl mb-2"
                    style={{ color: "oklch(0.14 0.042 258)" }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-luxury"
                    style={{ color: "oklch(0.45 0.02 250)" }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Atelier Early-Access Products ─────────────────────── */}
      <section
        className="py-24 px-6"
        style={{ background: "oklch(0.18 0.038 258)" }}
        data-ocid="vip.atelier.section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="tracking-luxury text-xs mb-4"
              style={{ color: "oklch(0.62 0.1 78)" }}
            >
              Members First Access
            </p>
            <h2
              className="font-display text-4xl md:text-5xl"
              style={{ color: "oklch(0.965 0.008 80)" }}
            >
              The Atelier Collection
            </h2>
            <p
              className="mt-4 text-sm max-w-lg mx-auto"
              style={{ color: "oklch(0.65 0.015 258)" }}
            >
              These pieces are available to Inner Circle members 72 hours before
              public release. Once your membership is confirmed, your window
              opens immediately.
            </p>
            <div
              className="w-16 h-px mx-auto mt-5"
              style={{ background: "oklch(0.62 0.1 78)" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATELIER_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                className="group border transition-luxury hover:shadow-elevated"
                style={{
                  borderColor: "oklch(0.26 0.04 258)",
                  background: "oklch(0.16 0.036 258)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`vip.product.${i + 1}`}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover image-luxury transition-luxury group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                  {/* VIP lock overlay for non-members */}
                  {!isVIP && (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                      style={{ background: "oklch(0.08 0.02 258 / 0.6)" }}
                    >
                      <Crown
                        size={24}
                        style={{ color: "oklch(0.62 0.1 78)" }}
                      />
                      <p
                        className="tracking-luxury text-[9px] text-center px-4"
                        style={{ color: "oklch(0.62 0.1 78)" }}
                      >
                        Members Only
                      </p>
                    </div>
                  )}
                  {product.isLimitedEdition && (
                    <div
                      className="absolute top-3 left-3 px-2 py-1 text-[9px] tracking-luxury"
                      style={{
                        background: "oklch(0.62 0.1 78)",
                        color: "oklch(0.14 0.042 258)",
                      }}
                    >
                      Limited
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p
                    className="font-display text-base leading-tight mb-1"
                    style={{ color: "oklch(0.965 0.008 80)" }}
                  >
                    {product.name}
                  </p>
                  <p
                    className="text-xs mb-3"
                    style={{ color: "oklch(0.55 0.015 258)" }}
                  >
                    {product.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.62 0.1 78)" }}
                    >
                      €{product.price.toLocaleString()}
                    </span>
                    <span
                      className="text-[9px] tracking-luxury"
                      style={{ color: "oklch(0.45 0.015 258)" }}
                    >
                      {product.availableCount} remaining
                    </span>
                  </div>
                  {isVIP && (
                    <Link to="/collections/atelier">
                      <button
                        type="button"
                        className="mt-3 w-full text-[10px] tracking-luxury py-2 border transition-luxury hover:opacity-80"
                        style={{
                          borderColor: "oklch(0.62 0.1 78 / 0.5)",
                          color: "oklch(0.62 0.1 78)",
                        }}
                        data-ocid={`vip.product_view.${i + 1}`}
                      >
                        View Piece
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ────────────────────────────────────────── */}
      <section
        className="py-28 px-6 text-center relative overflow-hidden"
        style={{ background: "oklch(0.12 0.038 258)" }}
        data-ocid="vip.bottom_cta.section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.62 0.1 78 / 0.05), transparent)",
          }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <Crown
            size={28}
            className="mx-auto mb-6"
            style={{ color: "oklch(0.62 0.1 78)" }}
          />
          <h2
            className="font-display text-4xl md:text-5xl mb-5"
            style={{ color: "oklch(0.965 0.008 80)" }}
          >
            You have been chosen.
          </h2>
          <p
            className="text-sm mb-10 leading-relaxed"
            style={{ color: "oklch(0.55 0.015 258)" }}
          >
            There are only 6 membership positions remaining this season. This
            invitation is personal, and it will not be extended twice.
          </p>
          <VIPCTAButton
            isAuthenticated={isAuthenticated}
            isVIP={isVIP ?? false}
            isLoading={statusLoading || enrollMutation.isPending}
            isSuccess={enrollMutation.isSuccess}
            onEnroll={handleEnroll}
          />
        </div>
      </section>
    </div>
  );
}

// ─── CTA Button state machine ──────────────────────────────────────────────

interface VIPCTAButtonProps {
  isAuthenticated: boolean;
  isVIP: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  onEnroll: () => void;
}

function VIPCTAButton({
  isAuthenticated,
  isVIP,
  isLoading,
  isSuccess,
  onEnroll,
}: VIPCTAButtonProps) {
  const [memberNumber] = useState(() => Math.floor(Math.random() * 400) + 400);

  if (isSuccess || isVIP) {
    return (
      <div
        className="inline-flex flex-col items-center gap-3"
        data-ocid="vip.member_state"
      >
        <div
          className="flex items-center gap-3 px-8 py-4 border"
          style={{
            borderColor: "oklch(0.62 0.1 78)",
            background: "oklch(0.62 0.1 78 / 0.1)",
          }}
        >
          <Crown size={16} style={{ color: "oklch(0.62 0.1 78)" }} />
          <span
            className="tracking-luxury text-xs"
            style={{ color: "oklch(0.62 0.1 78)" }}
          >
            Welcome, Member
          </span>
        </div>
        <p className="text-xs" style={{ color: "oklch(0.55 0.015 258)" }}>
          Your membership is confirmed. Inner Circle #{memberNumber}
        </p>
      </div>
    );
  }

  return (
    <LuxuryButton
      variant="gold"
      size="lg"
      onClick={onEnroll}
      disabled={isLoading}
      data-ocid="vip.enroll_button"
    >
      {isLoading
        ? "Confirming…"
        : isAuthenticated
          ? "Claim Your Membership"
          : "Request Your Invitation"}
    </LuxuryButton>
  );
}
