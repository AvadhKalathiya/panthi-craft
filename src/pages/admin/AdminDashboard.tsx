import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { subscribeProducts, toggleProductActive, deleteProduct, deleteProductImage } from "@/lib/productService";
import { seedFirestore, getProductCount } from "@/lib/seedData";
import { hasConfig } from "@/lib/firebase";
import type { Product } from "@/types/product";
import { toast } from "sonner";
import { Plus, LogOut, Eye, EyeOff, Pencil, Trash2, Package, Star, Sparkles, Database } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [showSeed, setShowSeed] = useState(false);

  useEffect(() => {
    if (!hasConfig) {
      setLoading(false);
      return;
    }

    const unsub = subscribeProducts((prods) => {
      setProducts(prods);
      setShowSeed(prods.length === 0);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  const handleToggle = async (id: string, current: boolean) => {
    try {
      await toggleProductActive(id, current);
      toast(current ? "Product hidden" : "Product visible");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      for (const url of product.images) {
        await deleteProductImage(url);
      }
      await deleteProduct(product.id);
      toast("Product deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const count = await seedFirestore();
      toast(`${count} sample products added!`);
      setShowSeed(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to seed");
    } finally {
      setSeeding(false);
    }
  };

  const stats = {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    featured: products.filter(p => p.isFeatured).length,
    bestSellers: products.filter(p => p.isBestSeller).length,
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="max-w-[1340px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-foreground">Panthi Admin Panel</h1>
            <p className="font-sans text-xs text-muted-foreground mt-0.5">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-[1340px] mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Products", value: stats.total, icon: Package },
            { label: "Active", value: stats.active, icon: Eye },
            { label: "Featured", value: stats.featured, icon: Star },
            { label: "Best Sellers", value: stats.bestSellers, icon: Sparkles },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={16} className="text-primary" />
                <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">{s.label}</span>
              </div>
              <span className="font-serif text-3xl text-foreground">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => navigate("/admin/product/new")}
            className="flex items-center gap-2 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest px-6 py-3 hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} /> Add New Purse
          </button>
          {showSeed && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 border border-primary text-primary font-sans text-sm uppercase tracking-widest px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
            >
              <Database size={16} /> {seeding ? "Seeding..." : "Seed Sample Data"}
            </button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 font-sans text-muted-foreground">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-muted-foreground italic mb-4">No products yet</p>
            <p className="font-sans text-sm text-muted-foreground">Add your first product or seed sample data to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50">
                  {["Image", "Name", "Category", "Price", "Status", "Featured", "Actions"].map(h => (
                    <th key={h} className="font-sans text-[0.65rem] uppercase tracking-widest text-muted-foreground text-left px-4 py-3 border-b border-border">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-14 h-[68px] bg-secondary overflow-hidden">
                        <img src={p.mainImage || p.images?.[0]} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-sans text-sm text-foreground">{p.name}</span>
                      {p.badge && <span className="ml-2 bg-primary/10 text-primary font-sans text-[0.6rem] uppercase tracking-wide px-1.5 py-0.5">{p.badge}</span>}
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 font-sans text-sm font-semibold text-primary">₹{p.price?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`font-sans text-xs uppercase tracking-wide ${p.isActive ? 'text-green-600' : 'text-destructive'}`}>
                        {p.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-xs text-muted-foreground">
                      {p.isFeatured && "★ "}{p.isBestSeller && "🏆"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => navigate(`/admin/product/edit/${p.id}`)} className="p-2 hover:bg-secondary transition-colors" title="Edit">
                          <Pencil size={14} className="text-muted-foreground" />
                        </button>
                        <button onClick={() => handleToggle(p.id, p.isActive)} className="p-2 hover:bg-secondary transition-colors" title={p.isActive ? "Hide" : "Show"}>
                          {p.isActive ? <EyeOff size={14} className="text-muted-foreground" /> : <Eye size={14} className="text-muted-foreground" />}
                        </button>
                        <button onClick={() => handleDelete(p)} className="p-2 hover:bg-destructive/10 transition-colors" title="Delete">
                          <Trash2 size={14} className="text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
