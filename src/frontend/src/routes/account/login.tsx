import { LuxuryButton } from "@/components/LuxuryButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";
import { Eye, EyeOff, Fingerprint } from "lucide-react";
import { useState } from "react";
import { Route as rootRoute } from "../__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account/login",
  component: LoginPage,
});

function LoginPage() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const defaultTab = params.get("tab") === "signup" ? "signup" : "login";
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "oklch(0.19 0.042 258)" }}
      data-ocid="login.page"
    >
      {/* Brand mark */}
      <div className="text-center mb-10 animate-fade-up">
        <p
          className="tracking-luxury text-xs mb-3"
          style={{ color: "oklch(0.62 0.1 78)" }}
        >
          Velour Maison
        </p>
        <h1
          className="font-display text-3xl md:text-4xl mb-3"
          style={{ color: "oklch(0.965 0.008 80)" }}
        >
          Welcome to the Inner Circle.
        </h1>
        <p className="text-sm" style={{ color: "oklch(0.65 0.01 80)" }}>
          Reserved for those who recognise the extraordinary.
        </p>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-md rounded-sm shadow-elevated animate-fade-up"
        style={{
          background: "oklch(0.965 0.008 80)",
          animationDelay: "0.15s",
        }}
      >
        {/* Tabs */}
        <div
          className="flex border-b"
          style={{ borderColor: "oklch(0.88 0.01 78)" }}
        >
          {(["login", "signup"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              data-ocid={`login.${tab}_tab`}
              className={cn(
                "flex-1 py-4 text-xs tracking-luxury transition-smooth",
                activeTab === tab ? "border-b-2" : "hover:opacity-70",
              )}
              style={{
                color:
                  activeTab === tab
                    ? "oklch(0.62 0.1 78)"
                    : "oklch(0.5 0.02 250)",
                borderBottomColor:
                  activeTab === tab ? "oklch(0.62 0.1 78)" : "transparent",
              }}
            >
              {tab === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === "login" ? <LoginForm /> : <SignUpForm />}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div
              className="flex-1 h-px"
              style={{ background: "oklch(0.88 0.01 78)" }}
            />
            <span
              className="text-xs tracking-luxury"
              style={{ color: "oklch(0.5 0.02 250)" }}
            >
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "oklch(0.88 0.01 78)" }}
            />
          </div>

          {/* Internet Identity */}
          <InternetIdentityButton />
        </div>
      </div>

      {/* Footer note */}
      <p
        className="mt-8 text-xs text-center"
        style={{ color: "oklch(0.45 0.015 258)" }}
      >
        Membership is a privilege. All data is private and encrypted.
      </p>
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock auth — navigate to dashboard
    navigate({ to: "/account/dashboard" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label
          className="text-xs tracking-luxury"
          style={{ color: "oklch(0.5 0.02 250)" }}
        >
          Email Address
        </Label>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-transparent border-border rounded-sm text-sm focus-visible:ring-1"
          style={{
            borderColor: "oklch(0.88 0.01 78)",
            color: "oklch(0.14 0.035 258)",
          }}
          data-ocid="login.email_input"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <Label
            className="text-xs tracking-luxury"
            style={{ color: "oklch(0.5 0.02 250)" }}
          >
            Password
          </Label>
          <button
            type="button"
            className="text-xs transition-smooth hover:opacity-70"
            style={{ color: "oklch(0.62 0.1 78)" }}
            data-ocid="login.forgot_password_link"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-transparent border-border rounded-sm text-sm focus-visible:ring-1 pr-10"
            style={{
              borderColor: "oklch(0.88 0.01 78)",
              color: "oklch(0.14 0.035 258)",
            }}
            data-ocid="login.password_input"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-smooth hover:opacity-70"
            style={{ color: "oklch(0.5 0.02 250)" }}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="remember"
          checked={remember}
          onCheckedChange={(v) => setRemember(v === true)}
          data-ocid="login.remember_checkbox"
          className="rounded-none border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
        />
        <label
          htmlFor="remember"
          className="text-xs cursor-pointer"
          style={{ color: "oklch(0.5 0.02 250)" }}
        >
          Remember me
        </label>
      </div>

      <LuxuryButton
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-2"
        data-ocid="login.submit_button"
      >
        Enter the Maison
      </LuxuryButton>
    </form>
  );
}

function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [error, setError] = useState("");

  function update(key: keyof typeof form, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.terms) {
      setError("Please accept the terms to continue.");
      return;
    }
    navigate({ to: "/account/dashboard" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            className="text-xs tracking-luxury"
            style={{ color: "oklch(0.5 0.02 250)" }}
          >
            First Name
          </Label>
          <Input
            required
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="Alexandre"
            className="bg-transparent border-border rounded-sm text-sm"
            style={{ borderColor: "oklch(0.88 0.01 78)" }}
            data-ocid="signup.first_name_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label
            className="text-xs tracking-luxury"
            style={{ color: "oklch(0.5 0.02 250)" }}
          >
            Last Name
          </Label>
          <Input
            required
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Beaumont"
            className="bg-transparent border-border rounded-sm text-sm"
            style={{ borderColor: "oklch(0.88 0.01 78)" }}
            data-ocid="signup.last_name_input"
          />
        </div>
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
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="your@email.com"
          className="bg-transparent border-border rounded-sm text-sm"
          style={{ borderColor: "oklch(0.88 0.01 78)" }}
          data-ocid="signup.email_input"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          className="text-xs tracking-luxury"
          style={{ color: "oklch(0.5 0.02 250)" }}
        >
          Password
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            required
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="••••••••"
            className="bg-transparent border-border rounded-sm text-sm pr-10"
            style={{ borderColor: "oklch(0.88 0.01 78)" }}
            data-ocid="signup.password_input"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-smooth hover:opacity-70"
            style={{ color: "oklch(0.5 0.02 250)" }}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label
          className="text-xs tracking-luxury"
          style={{ color: "oklch(0.5 0.02 250)" }}
        >
          Confirm Password
        </Label>
        <Input
          type="password"
          required
          value={form.confirm}
          onChange={(e) => update("confirm", e.target.value)}
          placeholder="••••••••"
          className="bg-transparent border-border rounded-sm text-sm"
          style={{ borderColor: "oklch(0.88 0.01 78)" }}
          data-ocid="signup.confirm_password_input"
        />
      </div>

      <div className="flex items-start gap-2 pt-1">
        <Checkbox
          id="terms"
          checked={form.terms}
          onCheckedChange={(v) => update("terms", v === true)}
          data-ocid="signup.terms_checkbox"
          className="mt-0.5 rounded-none border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
        />
        <label
          htmlFor="terms"
          className="text-xs cursor-pointer leading-relaxed"
          style={{ color: "oklch(0.5 0.02 250)" }}
        >
          I accept the{" "}
          <span
            className="underline underline-offset-2 transition-smooth hover:opacity-70"
            style={{ color: "oklch(0.62 0.1 78)" }}
          >
            Terms & Conditions
          </span>{" "}
          and understand that membership is exclusive.
        </label>
      </div>

      {error && (
        <p
          className="text-xs"
          style={{ color: "oklch(0.55 0.22 25)" }}
          data-ocid="signup.error_state"
        >
          {error}
        </p>
      )}

      <LuxuryButton
        type="submit"
        variant="primary"
        size="lg"
        className="w-full mt-2"
        data-ocid="signup.submit_button"
      >
        Request Membership
      </LuxuryButton>
    </form>
  );
}

function InternetIdentityButton() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  function handleII() {
    login();
    // Navigate after login is triggered
    setTimeout(() => navigate({ to: "/account/dashboard" }), 500);
  }

  return (
    <LuxuryButton
      type="button"
      variant="secondary"
      size="lg"
      className="w-full gap-3"
      onClick={handleII}
      disabled={isLoading}
      data-ocid="login.internet_identity_button"
    >
      <Fingerprint size={16} />
      {isLoading ? "Authenticating…" : "Continue with Internet Identity"}
    </LuxuryButton>
  );
}
