import { LuxuryButton } from "@/components/LuxuryButton";
import { Route as checkoutRoute } from "@/routes/checkout";
import { Link, createRoute, useSearch } from "@tanstack/react-router";
import { Award, Calendar, MapPin, Package } from "lucide-react";

export const Route = createRoute({
  getParentRoute: () => checkoutRoute,
  path: "/confirmation",
  validateSearch: (search) =>
    search as {
      orderNumber?: string;
      total?: string;
      shippingName?: string;
      shippingLine1?: string;
      shippingCity?: string;
      shippingCountry?: string;
      itemCount?: string;
    },
  component: ConfirmationPage,
});

function getDeliveryEstimate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function ConfirmationPage() {
  const search = useSearch({ from: "/checkout/confirmation" });
  const orderNumber = search.orderNumber ?? "000000";
  const total = Number(search.total ?? 0);
  const shippingName = search.shippingName ?? "Valued Client";
  const shippingLine1 = search.shippingLine1 ?? "";
  const shippingCity = search.shippingCity ?? "";
  const shippingCountry = search.shippingCountry ?? "";
  const itemCount = Number(search.itemCount ?? 1);
  const deliveryDate = getDeliveryEstimate();

  return (
    <div className="bg-background">
      {/* Hero section */}
      <section
        data-ocid="confirmation.hero"
        className="bg-primary text-primary-foreground py-24 px-8 text-center relative overflow-hidden"
      >
        {/* Gold decorative lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-accent/30" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-accent/30" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="w-16 h-16 border border-accent/40 flex items-center justify-center mx-auto mb-8">
            <Award className="w-7 h-7 text-accent" />
          </div>
          <p className="tracking-luxury text-[10px] text-accent mb-6">
            Order Confirmed
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-primary-foreground leading-tight mb-6">
            Your limited selection
            <br />
            has been reserved.
          </h1>
          <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-md mx-auto">
            Thank you for joining the circle of Velour Maison collectors. Your
            piece is now being prepared with the devotion it deserves.
          </p>
        </div>
      </section>

      {/* Order details */}
      <section className="max-w-screen-lg mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Order number */}
          <div
            data-ocid="confirmation.order_number"
            className="flex flex-col items-center text-center p-8 bg-card border border-border"
          >
            <Package className="w-6 h-6 text-accent mb-4" />
            <p className="tracking-luxury text-[9px] text-muted-foreground mb-2">
              Order Number
            </p>
            <p className="font-display text-3xl text-foreground">
              #{orderNumber}
            </p>
          </div>

          {/* Delivery estimate */}
          <div
            data-ocid="confirmation.delivery_estimate"
            className="flex flex-col items-center text-center p-8 bg-card border border-border"
          >
            <Calendar className="w-6 h-6 text-accent mb-4" />
            <p className="tracking-luxury text-[9px] text-muted-foreground mb-2">
              Estimated Delivery
            </p>
            <p className="text-sm font-medium text-foreground text-center">
              {deliveryDate}
            </p>
          </div>

          {/* Total paid */}
          <div
            data-ocid="confirmation.total_paid"
            className="flex flex-col items-center text-center p-8 bg-card border border-border"
          >
            <Award className="w-6 h-6 text-accent mb-4" />
            <p className="tracking-luxury text-[9px] text-muted-foreground mb-2">
              Total Paid
            </p>
            <p className="font-display text-3xl text-accent">
              ${total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Ordered items summary */}
        <div className="mb-16">
          <p className="tracking-luxury text-[10px] text-muted-foreground mb-8">
            Your Reserved Pieces
          </p>
          <div
            data-ocid="confirmation.items_list"
            className="flex flex-col gap-4"
          >
            <div
              data-ocid="confirmation.items_summary"
              className="flex items-center gap-4 py-5 border-b border-border"
            >
              <div className="w-14 h-16 bg-muted shrink-0 flex items-center justify-center">
                <Package className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-display text-base text-foreground">
                  {itemCount} {itemCount !== 1 ? "pieces" : "piece"} reserved
                </p>
                <p className="text-xs text-muted-foreground">
                  Velour Maison · Artisan Prepared
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div
            data-ocid="confirmation.shipping_address"
            className="p-8 bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-4 h-4 text-accent" />
              <p className="tracking-luxury text-[10px] text-muted-foreground">
                Delivery Address
              </p>
            </div>
            <p className="text-sm text-foreground mb-1">{shippingName}</p>
            {shippingLine1 && (
              <p className="text-sm text-muted-foreground">{shippingLine1}</p>
            )}
            {shippingCity && (
              <p className="text-sm text-muted-foreground">
                {shippingCity}
                {shippingCountry ? `, ${shippingCountry}` : ""}
              </p>
            )}
          </div>

          {/* Exclusive collector note */}
          <div className="p-8 bg-muted/40 border border-border flex flex-col justify-center">
            <p className="tracking-luxury text-[10px] text-accent mb-4">
              Collector's Privilege
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your garment will be individually wrapped in archival tissue,
              sealed with the Velour Maison emblem wax seal, and accompanied by
              your artisan's signed authentication card.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          data-ocid="confirmation.cta_section"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <LuxuryButton variant="gold" size="lg" asChild>
            <Link to="/collections" data-ocid="confirmation.explore_more.link">
              Explore More Collections
            </Link>
          </LuxuryButton>
          <LuxuryButton variant="secondary" size="lg" asChild>
            <Link
              to="/account/dashboard"
              data-ocid="confirmation.my_account.link"
            >
              View My Account
            </Link>
          </LuxuryButton>
        </div>
      </section>
    </div>
  );
}
