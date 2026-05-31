import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Outlet />
        </Layout>
        <Toaster position="bottom-right" richColors />
      </CartProvider>
    </AuthProvider>
  ),
});
