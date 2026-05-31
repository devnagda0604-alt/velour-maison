import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { Crown, Menu, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "The Atelier", href: "/collections/atelier" },
  { label: "Heritage", href: "/collections/heritage" },
  { label: "Comfort", href: "/collections/comfort" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "About", href: "/about" },
  { label: "VIP", href: "/vip", vip: true },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  // Close drawer on navigation
  useEffect(() => {
    return router.subscribe("onBeforeLoad", () => setDrawerOpen(false));
  }, [router]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const headerRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Fixed header */}
      <header
        ref={headerRef}
        data-ocid="nav.header"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-luxury",
          scrolled
            ? "bg-card/95 backdrop-blur-md shadow-subtle border-b border-border"
            : "bg-card/90 backdrop-blur-sm border-b border-border/50",
        )}
      >
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 flex items-center justify-between h-[72px]">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s/g, "_")}.link`}
                className="tracking-luxury text-[10px] text-foreground/70 hover:text-foreground transition-luxury"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo — center */}
          <Link
            to="/"
            data-ocid="nav.logo.link"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none group"
          >
            <span className="font-display text-2xl tracking-[0.3em] text-foreground group-hover:text-accent transition-luxury">
              VM
            </span>
            <span className="tracking-[0.4em] text-[8px] text-muted-foreground mt-0.5">
              VELOUR MAISON
            </span>
          </Link>

          {/* Right nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s/g, "_")}.link`}
                className={
                  link.vip
                    ? "tracking-luxury text-[10px] text-accent hover:text-accent/80 transition-luxury flex items-center gap-1"
                    : "tracking-luxury text-[10px] text-foreground/70 hover:text-foreground transition-luxury"
                }
              >
                {link.vip && <Crown className="w-3 h-3" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <Link
              to={isAuthenticated ? "/account/dashboard" : "/account/login"}
              data-ocid="nav.account.link"
              className="hidden md:flex items-center gap-1.5 tracking-luxury text-[10px] text-foreground/70 hover:text-foreground transition-luxury"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </Link>
            <Link
              to="/cart"
              data-ocid="nav.cart.link"
              className="relative flex items-center gap-1.5 tracking-luxury text-[10px] text-foreground/70 hover:text-foreground transition-luxury"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-accent text-accent-foreground text-[9px] rounded-full">
                  {cart.totalItems > 9 ? "9+" : cart.totalItems}
                </span>
              )}
            </Link>
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setDrawerOpen((o) => !o)}
              data-ocid="nav.menu.toggle"
              className="lg:hidden text-foreground/70 hover:text-foreground transition-luxury p-1"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
            >
              {drawerOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div
          data-ocid="nav.mobile_drawer"
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setDrawerOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />
          <nav className="absolute top-0 left-0 bottom-0 w-72 bg-card pt-24 px-10 flex flex-col gap-8 shadow-elevated">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/\s/g, "_")}.link`}
                className={
                  link.vip
                    ? "font-display text-2xl text-accent hover:text-accent/80 transition-luxury flex items-center gap-2"
                    : "font-display text-2xl text-foreground hover:text-accent transition-luxury"
                }
              >
                {link.vip && <Crown className="w-5 h-5" />}
                {link.label}
              </Link>
            ))}
            <div className="mt-auto pb-12 space-y-6">
              <Link
                to={isAuthenticated ? "/account/dashboard" : "/account/login"}
                data-ocid="nav.mobile.account.link"
                className="flex items-center gap-3 tracking-luxury text-[10px] text-muted-foreground hover:text-foreground transition-luxury"
              >
                <User className="w-4 h-4" /> Account
              </Link>
              <Link
                to="/cart"
                data-ocid="nav.mobile.cart.link"
                className="flex items-center gap-3 tracking-luxury text-[10px] text-muted-foreground hover:text-foreground transition-luxury"
              >
                <ShoppingBag className="w-4 h-4" /> Cart
                {cart.totalItems > 0 && ` (${cart.totalItems})`}
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 pt-[72px]">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-screen-2xl mx-auto px-8 md:px-16 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <p className="font-display text-3xl tracking-[0.3em]">VM</p>
                <p className="tracking-[0.4em] text-[8px] text-primary-foreground/50 mt-1">
                  VELOUR MAISON
                </p>
              </div>
              <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
                The world's most exquisite trousers. Rare limited cotton. 6,000
                hand-stitches per logo. Crafted for those who understand that
                true luxury cannot be rushed.
              </p>
            </div>
            {/* Collections */}
            <div>
              <p className="tracking-luxury text-[10px] text-primary-foreground/50 mb-6">
                Collections
              </p>
              <ul className="space-y-4">
                {[
                  { label: "The Atelier", href: "/collections/atelier" },
                  { label: "Heritage", href: "/collections/heritage" },
                  { label: "Comfort", href: "/collections/comfort" },
                  { label: "All Collections", href: "/collections" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-luxury"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Editorial */}
            <div>
              <p className="tracking-luxury text-[10px] text-primary-foreground/50 mb-6">
                Editorial
              </p>
              <ul className="space-y-4">
                {[
                  { label: "Lookbook", href: "/lookbook" },
                  { label: "Size Guide", href: "/size-guide" },
                  { label: "The Inner Circle", href: "/vip" },
                  { label: "About Us", href: "/about" },
                  { label: "Account", href: "/account/login" },
                  { label: "Cart", href: "/cart" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-luxury"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/40">
              &copy; {new Date().getFullYear()} Velour Maison. All rights
              reserved.
            </p>
            <p className="text-xs text-primary-foreground/30">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="hover:text-primary-foreground/60 transition-luxury"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
