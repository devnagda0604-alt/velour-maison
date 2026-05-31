import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
  className?: string;
}

export function Breadcrumb({
  items,
  light = false,
  className,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5", className)}
    >
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && (
            <ChevronRight
              className={cn(
                "w-3 h-3",
                light
                  ? "text-primary-foreground/40"
                  : "text-muted-foreground/40",
              )}
            />
          )}
          {item.href && i < items.length - 1 ? (
            <Link
              to={item.href}
              className={cn(
                "tracking-luxury text-[10px] transition-luxury hover:text-accent",
                light ? "text-primary-foreground/60" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={cn(
                "tracking-luxury text-[10px]",
                light ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
