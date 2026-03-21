import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user, isConfigured } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-20">
      <div className="w-full max-w-[400px] bg-card p-8 shadow-md border border-border">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-primary" size={24} />
          </div>
          <h1 className="font-serif text-2xl text-foreground">Admin Login</h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">Panthi First Choice</p>
        </div>

        {!isConfigured && (
          <div className="bg-accent/10 border border-accent/20 p-3 mb-6 text-sm font-sans text-accent">
            Firebase not configured. Add your Firebase config to environment variables to enable admin features.
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 p-3 mb-6 text-sm font-sans text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !isConfigured}
            className="w-full bg-foreground text-primary-foreground font-sans text-sm uppercase tracking-widest py-3.5 hover:bg-primary transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
