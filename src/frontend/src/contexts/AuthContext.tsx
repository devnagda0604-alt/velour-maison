import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { createContext, useContext } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  principal: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { loginStatus, login, clear, identity } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success";
  const isLoading = loginStatus === "logging-in";
  const principal = identity?.getPrincipal().toText() ?? null;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout: clear, principal }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
