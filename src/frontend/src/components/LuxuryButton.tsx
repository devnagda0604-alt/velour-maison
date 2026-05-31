import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

const luxuryButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-body tracking-luxury text-xs transition-luxury focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/85 px-8 py-3 border border-primary",
        secondary:
          "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background px-8 py-3",
        ghost:
          "bg-transparent text-foreground hover:text-accent px-0 py-1 border-b border-transparent hover:border-accent",
        gold: "bg-accent text-accent-foreground hover:bg-accent/85 px-8 py-3 border border-accent",
        outline:
          "bg-transparent text-primary-foreground border border-primary-foreground/60 hover:border-primary-foreground px-8 py-3",
        icon: "bg-transparent text-foreground hover:text-accent p-2",
      },
      size: {
        sm: "text-[10px] px-5 py-2",
        md: "text-xs",
        lg: "text-sm px-10 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface LuxuryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof luxuryButtonVariants> {
  asChild?: boolean;
}

export function LuxuryButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: LuxuryButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(luxuryButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
