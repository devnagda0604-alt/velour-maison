import { createActor } from "@/backend";
import { LuxuryButton } from "@/components/LuxuryButton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import type { Order, WishlistItem } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { Crown, Heart, Package, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { Route as rootRoute } from "../__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account/dashboard",
  component: DashboardPage,
});

type DashboardTab = "profile" | "orders" | "wishlist";

// ─── VIP hook ─────────────────────────────────────────────────────────────────

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

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_ORDERS: Order[] = [
  {
    id: "VM-2026-0041",
    items: [],
    subtotal: 2_490,
    shipping: 0,
    total: 2_490,
    status: "delivered",
    createdAt: "2026-03-18",
    shippingAddress: {
      name: "Alexandre Beaumont",
      line1: "12 Rue du Faubourg",
      city: "Paris",
      state: "Île-de-France",
      postalCode: "75008",
      country: "France",
    },
  },
  {
    id: "VM-2026-0087",
    items: [],
    subtotal: 3_180,
    shipping: 0,
    total: 3_180,
    status: "shipped",
    createdAt: "2026-04-30",
    shippingAddress: {
      name: "Alexandre Beaumont",
      line1: "12 Rue du Faubourg",
      city: "Paris",
      state: "Île-de-France",
      postalCode: "75008",
      country: "France",
    },
  },
  {
    id: "VM-2026-0112",
    items: [],
    subtotal: 4_750,
    shipping: 0,
    total: 4_750,
    status: "confirmed",
    createdAt: "2026-05-12",
    shippingAddress: {
      name: "Alexandre Beaumont",
      line1: "12 Rue du Faubourg",
      city: "Paris",
      state: "Île-de-France",
      postalCode: "75008",
      country: "France",
    },
  },
];

const MOCK_WISHLIST: WishlistItem[] = [
  {
    id: "w1",
    productId: "atelier-nocturne",
    productName: "Nocturne Atelier Trouser",
    price: 2_490,
    image: "/assets/generated/hero-pants-atelier.jpg",
    addedAt: "2026-05-01",
  },
  {
    id: "w2",
    productId: "heritage-oxford",
    productName: "Oxford Heritage Pant",
    price: 1_890,
    image: "/assets/generated/hero-pants-heritage.jpg",
    addedAt: "2026-05-08",
  },
  {
    id: "w3",
    productId: "comfort-cloud",
    productName: "Cloud Comfort Trouser",
    price: 1_640,
    image: "/assets/generated/hero-pants-comfort.jpg",
    addedAt: "2026-05-13",
  },
];

const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; bg: string; color: string }
> = {
  pending: {
    label: "Pending",
    bg: "oklch(0.94 0.012 82)",
    color: "oklch(0.5 0.02 250)",
  },
  confirmed: {
    label: "Confirmed",
    bg: "oklch(0.91 0.06 140)",
    color: "oklch(0.35 0.1 140)",
  },
  shipped: {
    label: "In Transit",
    bg: "oklch(0.91 0.05 255)",
    color: "oklch(0.35 0.08 258)",
  },
  delivered: {
    label: "Delivered",
    bg: "oklch(0.94 0.06 78)",
    color: "oklch(0.45 0.12 78)",
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────

function DashboardPage() {
  const { isAuthenticated, logout, principal } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>("profile");
  const { data: isVIP, isLoading: vipLoading } = useVIPStatus();

  if (!isAuthenticated && !principal) {
    // Soft guard — redirect to login
    navigate({ to: "/account/login" });
    return null;
  }

  const displayName = "Alexandre";
  const tabs: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User size={14} /> },
    { id: "orders", label: "Orders", icon: <Package size={14} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={14} /> },
  ];

  return (
    <>
      {/* Hero band */}
      <div
        className="py-16 px-6 md:px-10 border-b"
        style={{
          background: "oklch(0.19 0.042 258)",
          borderColor: "oklch(0.26 0.04 258)",
        }}
        data-ocid="dashboard.section"
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="tracking-luxury text-xs mb-2"
            style={{ color: "oklch(0.62 0.1 78)" }}
          >
            Member Dashboard
          </p>
          <h1
            className="font-display text-3xl md:text-4xl"
            style={{ color: "oklch(0.965 0.008 80)" }}
          >
            Welcome back, {displayName}.
          </h1>
          <p className="mt-2 text-sm" style={{ color: "oklch(0.65 0.01 80)" }}>
            You are among the{" "}
            <span style={{ color: "oklch(0.62 0.1 78)" }}>privileged few</span>.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
        {/* Tab bar */}
        <div
          className="flex gap-1 mb-10 border-b"
          style={{ borderColor: "oklch(0.88 0.01 78)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              data-ocid={`dashboard.${tab.id}_tab`}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-xs tracking-luxury transition-smooth border-b-2 -mb-px",
                activeTab === tab.id
                  ? ""
                  : "border-transparent hover:opacity-70",
              )}
              style={{
                color:
                  activeTab === tab.id
                    ? "oklch(0.62 0.1 78)"
                    : "oklch(0.5 0.02 250)",
                borderBottomColor:
                  activeTab === tab.id ? "oklch(0.62 0.1 78)" : "transparent",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          {/* Logout */}
          <div className="ml-auto flex items-center">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              className="text-xs tracking-luxury transition-smooth hover:opacity-70 pb-3"
              style={{ color: "oklch(0.5 0.02 250)" }}
              data-ocid="dashboard.logout_button"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* VIP Status Banner */}
        <VIPStatusSection isVIP={isVIP ?? false} isLoading={vipLoading} />

        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "wishlist" && <WishlistTab />}
      </div>
    </>
  );
}

// ─── VIP Status Section ─────────────────────────────────────────────────────

function VIPStatusSection({
  isVIP,
  isLoading,
}: {
  isVIP: boolean;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div
        className="mb-8 p-6 border animate-pulse"
        style={{ borderColor: "oklch(0.88 0.01 78)" }}
        data-ocid="dashboard.vip.loading_state"
      />
    );
  }

  if (isVIP) {
    return (
      <div
        className="mb-8 p-6 border flex items-center justify-between gap-6 animate-fade-in"
        style={{
          borderColor: "oklch(0.62 0.1 78 / 0.5)",
          background:
            "linear-gradient(135deg, oklch(0.19 0.042 258), oklch(0.16 0.036 258))",
        }}
        data-ocid="dashboard.vip.section"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 flex items-center justify-center border"
            style={{
              borderColor: "oklch(0.62 0.1 78 / 0.6)",
              background: "oklch(0.62 0.1 78 / 0.1)",
            }}
          >
            <Crown size={16} style={{ color: "oklch(0.62 0.1 78)" }} />
          </div>
          <div>
            <p
              className="tracking-luxury text-[10px] mb-0.5"
              style={{ color: "oklch(0.62 0.1 78)" }}
            >
              Inner Circle Member
            </p>
            <p
              className="font-display text-lg"
              style={{ color: "oklch(0.965 0.008 80)" }}
            >
              VIP Status Confirmed
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.55 0.015 258)" }}
            >
              You have first access to every Atelier drop and member-only
              events.
            </p>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
          <span
            className="tracking-luxury text-[9px] px-3 py-1.5 border"
            style={{
              borderColor: "oklch(0.62 0.1 78)",
              color: "oklch(0.62 0.1 78)",
            }}
          >
            ✦ Gold Tier
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mb-8 p-6 border flex items-center justify-between gap-6 animate-fade-in"
      style={{
        borderColor: "oklch(0.88 0.01 78)",
        background: "oklch(0.97 0.003 80)",
      }}
      data-ocid="dashboard.vip.section"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 flex items-center justify-center border"
          style={{
            borderColor: "oklch(0.88 0.01 78)",
            background: "oklch(0.94 0.012 82)",
          }}
        >
          <Crown size={16} style={{ color: "oklch(0.5 0.02 250)" }} />
        </div>
        <div>
          <p
            className="text-sm font-medium mb-0.5"
            style={{ color: "oklch(0.14 0.042 258)" }}
          >
            Claim Your Inner Circle Status
          </p>
          <p className="text-xs" style={{ color: "oklch(0.5 0.02 250)" }}>
            Only 847 members worldwide. You have been selected. Do not let this
            moment pass.
          </p>
        </div>
      </div>
      <LuxuryButton
        variant="gold"
        size="sm"
        asChild
        data-ocid="dashboard.vip.claim_button"
      >
        <a href="/vip">Claim Status</a>
      </LuxuryButton>
    </div>
  );
}

// ─── Profile Tab ─────────────────────────────────────────────────────────────

function ProfileTab() {
  const [name, setName] = useState("Alexandre Beaumont");
  const [email, setEmail] = useState("alexandre@velourmaison.com");
  const [newsletter, setNewsletter] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form
      onSubmit={handleSave}
      className="max-w-md space-y-6 animate-fade-in"
      data-ocid="profile.section"
    >
      <div className="space-y-1.5">
        <Label
          className="text-xs tracking-luxury"
          style={{ color: "oklch(0.5 0.02 250)" }}
        >
          Full Name
        </Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-sm text-sm"
          data-ocid="profile.name_input"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          className="text-xs tracking-luxury"
          style={{ color: "oklch(0.5 0.02 250)" }}
        >
          Email Address
        </Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm text-sm"
          data-ocid="profile.email_input"
        />
      </div>

      <div
        className="flex items-center justify-between p-4 rounded-sm border"
        style={{
          borderColor: "oklch(0.88 0.01 78)",
          background: "oklch(0.97 0.003 80)",
        }}
      >
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: "oklch(0.14 0.035 258)" }}
          >
            Exclusive Updates
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.5 0.02 250)" }}
          >
            First access to new collections and private events.
          </p>
        </div>
        <Switch
          checked={newsletter}
          onCheckedChange={setNewsletter}
          data-ocid="profile.newsletter_switch"
        />
      </div>

      <div className="flex items-center gap-4">
        <LuxuryButton
          type="submit"
          variant="primary"
          data-ocid="profile.save_button"
        >
          Save Changes
        </LuxuryButton>
        {saved && (
          <span
            className="text-xs animate-fade-in"
            style={{ color: "oklch(0.45 0.12 78)" }}
            data-ocid="profile.success_state"
          >
            ✓ Changes saved
          </span>
        )}
      </div>
    </form>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────

function OrdersTab() {
  const orders = MOCK_ORDERS;

  if (orders.length === 0) {
    return (
      <div
        className="text-center py-20 animate-fade-in"
        data-ocid="orders.empty_state"
      >
        <ShoppingBag
          size={40}
          className="mx-auto mb-4 opacity-30"
          style={{ color: "oklch(0.62 0.1 78)" }}
        />
        <p
          className="font-display text-2xl mb-2"
          style={{ color: "oklch(0.19 0.042 258)" }}
        >
          Your collection awaits.
        </p>
        <p className="text-sm mb-6" style={{ color: "oklch(0.5 0.02 250)" }}>
          You have not yet placed an order. Explore our curated collections.
        </p>
        <LuxuryButton variant="gold" asChild>
          <a href="/collections">Explore Collections</a>
        </LuxuryButton>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" data-ocid="orders.section">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b text-xs tracking-luxury text-left"
              style={{
                borderColor: "oklch(0.88 0.01 78)",
                color: "oklch(0.5 0.02 250)",
              }}
            >
              <th className="pb-3 pr-6 font-normal">Order</th>
              <th className="pb-3 pr-6 font-normal">Date</th>
              <th className="pb-3 pr-6 font-normal text-right">Total</th>
              <th className="pb-3 pr-6 font-normal">Status</th>
              <th className="pb-3 font-normal" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const cfg = STATUS_CONFIG[order.status];
              return (
                <tr
                  key={order.id}
                  className="border-b transition-smooth hover:bg-muted/40"
                  style={{ borderColor: "oklch(0.92 0.006 80)" }}
                  data-ocid={`orders.item.${i + 1}`}
                >
                  <td
                    className="py-4 pr-6 font-mono text-xs"
                    style={{ color: "oklch(0.19 0.042 258)" }}
                  >
                    {order.id}
                  </td>
                  <td
                    className="py-4 pr-6"
                    style={{ color: "oklch(0.5 0.02 250)" }}
                  >
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td
                    className="py-4 pr-6 text-right font-medium"
                    style={{ color: "oklch(0.19 0.042 258)" }}
                  >
                    €{order.total.toLocaleString()}
                  </td>
                  <td className="py-4 pr-6">
                    <span
                      className="text-xs tracking-luxury px-2.5 py-1 rounded-sm"
                      style={{
                        background: cfg.bg,
                        color: cfg.color,
                      }}
                    >
                      {cfg.label}
                    </span>
                  </td>
                  <td className="py-4">
                    <button
                      type="button"
                      className="text-xs transition-smooth hover:opacity-70"
                      style={{ color: "oklch(0.62 0.1 78)" }}
                      data-ocid={`orders.view_details.${i + 1}`}
                    >
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.62 0.1 78)" }}
                        data-ocid={`orders.view_details.${i + 1}`}
                      >
                        Details →
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Wishlist Tab ─────────────────────────────────────────────────────────────

function WishlistTab() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(MOCK_WISHLIST);
  const { addItem } = useCart();

  function remove(id: string) {
    setWishlist((prev) => prev.filter((w) => w.id !== id));
  }

  if (wishlist.length === 0) {
    return (
      <div
        className="text-center py-20 animate-fade-in"
        data-ocid="wishlist.empty_state"
      >
        <Heart
          size={40}
          className="mx-auto mb-4 opacity-30"
          style={{ color: "oklch(0.62 0.1 78)" }}
        />
        <p
          className="font-display text-2xl mb-2"
          style={{ color: "oklch(0.19 0.042 258)" }}
        >
          Your wishlist is pristine.
        </p>
        <p className="text-sm mb-6" style={{ color: "oklch(0.5 0.02 250)" }}>
          Save pieces that speak to you. They will wait here, patiently.
        </p>
        <LuxuryButton variant="gold" asChild>
          <a href="/collections">Discover Pieces</a>
        </LuxuryButton>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in"
      data-ocid="wishlist.section"
    >
      {wishlist.map((item, i) => (
        <div
          key={item.id}
          className="group border rounded-sm overflow-hidden transition-luxury hover:shadow-luxury"
          style={{ borderColor: "oklch(0.88 0.01 78)" }}
          data-ocid={`wishlist.item.${i + 1}`}
        >
          {/* Image */}
          <div className="aspect-[3/4] bg-muted overflow-hidden relative">
            <img
              src={item.image}
              alt={item.productName}
              className="w-full h-full object-cover image-luxury transition-luxury group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
            {/* Remove */}
            <button
              type="button"
              onClick={() => remove(item.id)}
              className="absolute top-3 right-3 p-1.5 rounded-full transition-smooth opacity-0 group-hover:opacity-100"
              style={{ background: "oklch(0.965 0.008 80)" }}
              aria-label="Remove from wishlist"
              data-ocid={`wishlist.delete_button.${i + 1}`}
            >
              <X size={12} style={{ color: "oklch(0.5 0.02 250)" }} />
            </button>
          </div>

          {/* Info */}
          <div className="p-4">
            <p
              className="text-sm font-medium truncate"
              style={{ color: "oklch(0.19 0.042 258)" }}
            >
              {item.productName}
            </p>
            <p
              className="text-sm mt-0.5 mb-3"
              style={{ color: "oklch(0.62 0.1 78)" }}
            >
              €{item.price.toLocaleString()}
            </p>
            <LuxuryButton
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() =>
                addItem(
                  {
                    id: item.productId,
                    name: item.productName,
                    subtitle: "",
                    price: item.price,
                    description: item.productName,
                    collectionId: "atelier",
                    collectionName: "Atelier",
                    images: [item.image],
                    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
                    availableCount: 1,
                    stitchCount: 6000,
                    material: "Heirloom Cotton",
                    isLimitedEdition: true,
                    isBestseller: false,
                    isNew: false,
                    tags: [],
                  },
                  "M",
                  1,
                )
              }
              data-ocid={`wishlist.add_to_cart.${i + 1}`}
            >
              Add to Cart
            </LuxuryButton>
          </div>
        </div>
      ))}
    </div>
  );
}
