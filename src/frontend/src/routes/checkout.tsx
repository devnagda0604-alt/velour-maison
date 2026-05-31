import { LuxuryButton } from "@/components/LuxuryButton";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Route as rootRoute } from "@/routes/__root";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight, Lock } from "lucide-react";
import { useState } from "react";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

interface ShippingForm {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

interface BillingForm {
  sameAsShipping: boolean;
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const SHIPPING_METHODS = [
  {
    id: "standard",
    label: "Standard Delivery",
    sublabel: "5–8 business days",
    price: 15,
  },
  {
    id: "express",
    label: "Express Delivery",
    sublabel: "2–3 business days",
    price: 45,
  },
  {
    id: "concierge",
    label: "White-Glove Concierge",
    sublabel:
      "Delivered by our specialist. Hand-presented in ceremonial packaging.",
    price: 150,
  },
];

const STEP_LABELS = ["Shipping", "Payment", "Review"];

const EMPTY_SHIPPING: ShippingForm = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  country: "",
  postalCode: "",
  phone: "",
};

const EMPTY_BILLING: BillingForm = {
  sameAsShipping: true,
  cardholderName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function FieldGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{children}</div>
  );
}

function Field({
  label,
  id,
  wide,
  ...props
}: {
  label: string;
  id: string;
  wide?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("flex flex-col gap-2", wide && "sm:col-span-2")}>
      <label
        htmlFor={id}
        className="tracking-luxury text-[10px] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        className="bg-transparent border border-border h-12 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-luxury"
        {...props}
      />
    </div>
  );
}

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<ShippingForm>(EMPTY_SHIPPING);
  const [billing, setBilling] = useState<BillingForm>(EMPTY_BILLING);
  const [shippingMethod, setShippingMethod] = useState(SHIPPING_METHODS[0].id);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedMethod = SHIPPING_METHODS.find((m) => m.id === shippingMethod)!;
  const total = cart.subtotal + selectedMethod.price;

  function handleConfirmOrder() {
    setIsProcessing(true);
    const orderNumber = String(Math.floor(100000 + Math.random() * 900000));
    const items = [...cart.items];
    setTimeout(() => {
      clearCart();
      navigate({
        to: "/checkout/confirmation",
        search: {
          orderNumber,
          total: String(total),
          shippingName: `${shipping.firstName} ${shipping.lastName}`,
          shippingLine1: shipping.address1,
          shippingCity: shipping.city,
          shippingCountry: shipping.country,
          itemCount: String(items.length),
        },
      });
    }, 1600);
  }

  const s =
    (field: keyof ShippingForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setShipping((prev) => ({ ...prev, [field]: e.target.value }));
  const b =
    (field: keyof BillingForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setBilling((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="bg-background">
      {/* Page header */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 pt-14 pb-10 border-b border-border">
        <p className="tracking-luxury text-[10px] text-accent mb-3">
          Secure Checkout
        </p>
        <h1 className="font-display text-4xl text-foreground">
          Complete Your Order
        </h1>
      </div>

      {/* Step progress */}
      <div data-ocid="checkout.progress" className="border-b border-border">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16">
          <div className="flex">
            {STEP_LABELS.map((label, idx) => {
              const num = idx + 1;
              const isActive = step === num;
              const isDone = step > num;
              return (
                <div
                  key={label}
                  className="flex-1 flex flex-col items-center py-6 gap-2"
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs border transition-luxury",
                      isDone
                        ? "bg-accent border-accent text-accent-foreground"
                        : isActive
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-transparent border-border text-muted-foreground",
                    )}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : num}
                  </div>
                  <span
                    className={cn(
                      "tracking-luxury text-[10px] hidden sm:block",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 items-start">
          <div>
            {/* Step 1 — Shipping */}
            {step === 1 && (
              <div data-ocid="checkout.step_1" className="animate-fade-up">
                <h2 className="font-display text-2xl text-foreground mb-10">
                  Shipping Address
                </h2>
                <div className="flex flex-col gap-6">
                  <FieldGroup>
                    <Field
                      label="First Name"
                      id="firstName"
                      value={shipping.firstName}
                      onChange={s("firstName")}
                      placeholder="Alexandre"
                      data-ocid="checkout.first_name.input"
                    />
                    <Field
                      label="Last Name"
                      id="lastName"
                      value={shipping.lastName}
                      onChange={s("lastName")}
                      placeholder="Beaumont"
                      data-ocid="checkout.last_name.input"
                    />
                  </FieldGroup>
                  <Field
                    label="Address"
                    id="address1"
                    wide
                    value={shipping.address1}
                    onChange={s("address1")}
                    placeholder="12 Rue du Faubourg Saint-Honoré"
                    data-ocid="checkout.address.input"
                  />
                  <Field
                    label="Apartment / Suite (optional)"
                    id="address2"
                    wide
                    value={shipping.address2}
                    onChange={s("address2")}
                    placeholder="Suite 4"
                    data-ocid="checkout.address2.input"
                  />
                  <FieldGroup>
                    <Field
                      label="City"
                      id="city"
                      value={shipping.city}
                      onChange={s("city")}
                      placeholder="Paris"
                      data-ocid="checkout.city.input"
                    />
                    <Field
                      label="Country"
                      id="country"
                      value={shipping.country}
                      onChange={s("country")}
                      placeholder="France"
                      data-ocid="checkout.country.input"
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <Field
                      label="Postal Code"
                      id="postalCode"
                      value={shipping.postalCode}
                      onChange={s("postalCode")}
                      placeholder="75008"
                      data-ocid="checkout.postal_code.input"
                    />
                    <Field
                      label="Phone"
                      id="phone"
                      type="tel"
                      value={shipping.phone}
                      onChange={s("phone")}
                      placeholder="+33 6 12 34 56 78"
                      data-ocid="checkout.phone.input"
                    />
                  </FieldGroup>
                </div>
                <div className="mt-10">
                  <LuxuryButton
                    variant="gold"
                    size="lg"
                    onClick={() => setStep(2)}
                    data-ocid="checkout.step1_next.button"
                    className="gap-2"
                  >
                    Continue to Payment <ChevronRight className="w-4 h-4" />
                  </LuxuryButton>
                </div>
              </div>
            )}

            {/* Step 2 — Billing */}
            {step === 2 && (
              <div data-ocid="checkout.step_2" className="animate-fade-up">
                <h2 className="font-display text-2xl text-foreground mb-10">
                  Payment & Shipping
                </h2>

                {/* Same as shipping toggle */}
                <div className="flex items-center gap-3 mb-8">
                  <input
                    type="checkbox"
                    id="sameShipping"
                    checked={billing.sameAsShipping}
                    onChange={(e) =>
                      setBilling((b) => ({
                        ...b,
                        sameAsShipping: e.target.checked,
                      }))
                    }
                    data-ocid="checkout.same_as_shipping.checkbox"
                    className="w-4 h-4 accent-accent"
                  />
                  <label
                    htmlFor="sameShipping"
                    className="tracking-luxury text-[10px] text-muted-foreground cursor-pointer"
                  >
                    Billing address same as shipping
                  </label>
                </div>

                <div className="flex flex-col gap-6 mb-10">
                  <Field
                    label="Cardholder Name"
                    id="cardholderName"
                    wide
                    value={billing.cardholderName}
                    onChange={b("cardholderName")}
                    placeholder="As it appears on your card"
                    data-ocid="checkout.cardholder_name.input"
                  />
                  <Field
                    label="Card Number"
                    id="cardNumber"
                    wide
                    value={billing.cardNumber}
                    onChange={b("cardNumber")}
                    placeholder="•••• •••• •••• ••••"
                    maxLength={19}
                    data-ocid="checkout.card_number.input"
                  />
                  <FieldGroup>
                    <Field
                      label="Expiry Date"
                      id="expiry"
                      value={billing.expiry}
                      onChange={b("expiry")}
                      placeholder="MM / YY"
                      maxLength={7}
                      data-ocid="checkout.expiry.input"
                    />
                    <Field
                      label="CVC"
                      id="cvc"
                      value={billing.cvc}
                      onChange={b("cvc")}
                      placeholder="•••"
                      maxLength={4}
                      data-ocid="checkout.cvc.input"
                    />
                  </FieldGroup>
                </div>

                {/* Shipping method */}
                <h3 className="tracking-luxury text-[10px] text-muted-foreground mb-5">
                  Delivery Method
                </h3>
                <div className="flex flex-col gap-3 mb-10">
                  {SHIPPING_METHODS.map((method) => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setShippingMethod(method.id)}
                      data-ocid={`checkout.shipping_method.${method.id}`}
                      className={cn(
                        "flex items-center justify-between px-5 py-4 border text-left transition-luxury",
                        shippingMethod === method.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-foreground/40",
                      )}
                    >
                      <div>
                        <p className="tracking-luxury text-[10px] text-foreground">
                          {method.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {method.sublabel}
                        </p>
                      </div>
                      <span className="font-display text-lg text-foreground ml-4 shrink-0">
                        ${method.price}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <LuxuryButton
                    variant="ghost"
                    onClick={() => setStep(1)}
                    data-ocid="checkout.step2_back.button"
                  >
                    ← Back
                  </LuxuryButton>
                  <LuxuryButton
                    variant="gold"
                    size="lg"
                    onClick={() => setStep(3)}
                    data-ocid="checkout.step2_next.button"
                  >
                    Review Order <ChevronRight className="w-4 h-4" />
                  </LuxuryButton>
                </div>
              </div>
            )}

            {/* Step 3 — Review */}
            {step === 3 && (
              <div data-ocid="checkout.step_3" className="animate-fade-up">
                <h2 className="font-display text-2xl text-foreground mb-10">
                  Review Your Order
                </h2>

                {/* Items */}
                <div className="flex flex-col gap-6 mb-10">
                  {cart.items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      data-ocid={`checkout.review_item.${idx + 1}`}
                      className="flex gap-5"
                    >
                      <div className="w-20 h-24 overflow-hidden bg-muted shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover image-luxury"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="tracking-luxury text-[9px] text-accent mb-1">
                          {item.product.collectionName}
                        </p>
                        <p className="font-display text-lg text-foreground truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Size {item.size} · Qty {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-foreground shrink-0">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Address + billing summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <div className="p-5 bg-card border border-border">
                    <p className="tracking-luxury text-[9px] text-muted-foreground mb-4">
                      Ships To
                    </p>
                    <p className="text-sm text-foreground">
                      {shipping.firstName} {shipping.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {shipping.address1}
                    </p>
                    {shipping.address2 && (
                      <p className="text-sm text-muted-foreground">
                        {shipping.address2}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {shipping.city}, {shipping.country} {shipping.postalCode}
                    </p>
                  </div>
                  <div className="p-5 bg-card border border-border">
                    <p className="tracking-luxury text-[9px] text-muted-foreground mb-4">
                      Payment
                    </p>
                    <p className="text-sm text-foreground">
                      {billing.cardholderName || "—"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {billing.cardNumber
                        ? `•••• •••• •••• ${billing.cardNumber.slice(-4)}`
                        : "Card ending ••••"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {selectedMethod.label}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <LuxuryButton
                    variant="ghost"
                    onClick={() => setStep(2)}
                    data-ocid="checkout.step3_back.button"
                  >
                    ← Back
                  </LuxuryButton>
                  <LuxuryButton
                    variant="gold"
                    size="lg"
                    onClick={handleConfirmOrder}
                    disabled={isProcessing}
                    data-ocid="checkout.confirm_order.button"
                  >
                    {isProcessing ? "Processing…" : "Confirm Order"}
                  </LuxuryButton>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div
            data-ocid="checkout.summary_panel"
            className="bg-card border border-border p-8 lg:sticky lg:top-28"
          >
            <p className="tracking-luxury text-[10px] text-muted-foreground mb-6">
              Your Selection
            </p>
            <div className="flex flex-col gap-4 mb-8">
              {cart.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-14 overflow-hidden bg-muted shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover image-luxury"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm text-foreground truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Size {item.size} · {item.quantity}×
                    </p>
                  </div>
                  <p className="text-sm font-medium text-foreground shrink-0">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-6 flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  ${cart.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-foreground">${selectedMethod.price}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="tracking-luxury text-[10px] text-foreground">
                  Total
                </span>
                <span className="font-display text-2xl text-foreground">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span className="tracking-luxury text-[9px]">SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
