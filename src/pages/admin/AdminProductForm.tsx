import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addProduct, updateProduct, getProductById, uploadProductImages, deleteProductImage } from "@/lib/productService";
import type { Product } from "@/types/product";
import { toast } from "sonner";
import { ArrowLeft, Upload, X, Image as ImageIcon } from "lucide-react";

const CATEGORIES = ["Tote Bags", "Clutches", "Sling Bags", "Shoulder Bags"];
const BADGES = ["", "Best Seller", "New", "Premium", "Sale"];

interface FormData {
  name: string;
  category: string;
  badge: string;
  price: number;
  originalPrice: number;
  description: string;
  material: string;
  dimensions: string;
  closure: string;
  strap: string;
  colors: string;
  order: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isActive: boolean;
}

const defaultForm: FormData = {
  name: "", category: "Tote Bags", badge: "", price: 0, originalPrice: 0,
  description: "", material: "", dimensions: "", closure: "", strap: "",
  colors: "", order: 10, isFeatured: false, isBestSeller: false, isNew: false, isActive: true,
};

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>(defaultForm);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      getProductById(id).then((p) => {
        if (p) {
          setForm({
            name: p.name, category: p.category, badge: p.badge, price: p.price,
            originalPrice: p.originalPrice, description: p.description, material: p.material,
            dimensions: p.dimensions, closure: p.closure, strap: p.strap,
            colors: p.colors.join(", "), order: p.order,
            isFeatured: p.isFeatured, isBestSeller: p.isBestSeller, isNew: p.isNew, isActive: p.isActive,
          });
          setExistingImages(p.images || []);
        }
      }).finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckbox = (name: string) => {
    setForm(prev => ({ ...prev, [name]: !(prev as any)[name] }));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const total = existingImages.length + newFiles.length + files.length;
    if (total > 5) { toast.error("Maximum 5 images allowed"); return; }
    
    const valid = Array.from(files).filter(f => {
      if (f.size > 5 * 1024 * 1024) { toast.error(`${f.name} exceeds 5MB`); return false; }
      if (!f.type.startsWith("image/")) { toast.error(`${f.name} is not an image`); return false; }
      return true;
    });

    setNewFiles(prev => [...prev, ...valid]);
    valid.forEach(f => {
      const reader = new FileReader();
      reader.onload = (e) => setNewPreviews(prev => [...prev, e.target?.result as string]);
      reader.readAsDataURL(f);
    });
  };

  const removeExisting = async (url: string) => {
    setExistingImages(prev => prev.filter(u => u !== url));
    try { await deleteProductImage(url); } catch {}
  };

  const removeNew = (idx: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== idx));
    setNewPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) {
      toast.error("Please fill required fields"); return;
    }

    setSaving(true);
    try {
      let imageUrls = [...existingImages];

      if (newFiles.length > 0) {
        setUploading(true);
        const uploaded = await uploadProductImages(newFiles, (p) => setUploadProgress(p));
        imageUrls = [...imageUrls, ...uploaded];
        setUploading(false);
      }

      const data = {
        name: form.name,
        category: form.category,
        badge: form.badge,
        price: form.price,
        originalPrice: form.originalPrice,
        description: form.description,
        material: form.material,
        dimensions: form.dimensions,
        closure: form.closure,
        strap: form.strap,
        colors: form.colors.split(",").map(c => c.trim()).filter(Boolean),
        images: imageUrls,
        mainImage: imageUrls[0] || "",
        isFeatured: form.isFeatured,
        isBestSeller: form.isBestSeller,
        isNew: form.isNew,
        isActive: form.isActive,
        order: form.order,
      };

      if (isEdit && id) {
        await updateProduct(id, data);
        toast("Product updated!");
      } else {
        await addProduct(data);
        toast("Product added!");
      }
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20 font-sans text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-[800px] mx-auto px-6 py-8">
        <button onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <h1 className="font-serif text-2xl text-foreground mb-8">
          {isEdit ? "Edit Product" : "Add New Purse"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Product Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required
              className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary transition-colors" />
          </div>

          {/* Category + Badge */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Category *</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Badge</label>
              <select name="badge" value={form.badge} onChange={handleChange}
                className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary">
                {BADGES.map(b => <option key={b} value={b}>{b || "None"}</option>)}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Price ₹ *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required min={0}
                className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Original Price ₹</label>
              <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} min={0}
                className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
              className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary resize-y" />
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "material", label: "Material" },
              { name: "dimensions", label: "Dimensions" },
              { name: "closure", label: "Closure" },
              { name: "strap", label: "Strap" },
            ].map(f => (
              <div key={f.name}>
                <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">{f.label}</label>
                <input name={f.name} value={(form as any)[f.name]} onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary" />
              </div>
            ))}
          </div>

          {/* Colors + Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Colors (comma-separated)</label>
              <input name="colors" value={form.colors} onChange={handleChange} placeholder="Black, Tan, Navy"
                className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-1.5">Display Order</label>
              <input name="order" type="number" value={form.order} onChange={handleChange} min={1}
                className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6 py-2">
            {[
              { key: "isFeatured", label: "Featured" },
              { key: "isBestSeller", label: "Best Seller" },
              { key: "isNew", label: "New Arrival" },
              { key: "isActive", label: "Active" },
            ].map(c => (
              <label key={c.key} className="flex items-center gap-2 cursor-pointer font-sans text-sm text-foreground">
                <input type="checkbox" checked={(form as any)[c.key]} onChange={() => handleCheckbox(c.key)}
                  className="w-4 h-4 accent-primary" />
                {c.label}
              </label>
            ))}
          </div>

          {/* Images */}
          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground block mb-3">
              Product Images (max 5, max 5MB each)
            </label>

            {/* Drop zone */}
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFiles(e.dataTransfer.files); }}
              className="border-2 border-dashed border-border hover:border-primary p-8 text-center cursor-pointer transition-colors mb-4"
            >
              <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="font-sans text-sm text-muted-foreground">Drop images here or click to upload</p>
              <p className="font-sans text-xs text-muted-foreground/60 mt-1">JPG, PNG, WebP • Max 5MB each</p>
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
            </div>

            {uploading && (
              <div className="mb-4">
                <div className="h-1.5 bg-secondary overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
                <p className="font-sans text-xs text-muted-foreground mt-1">{uploadProgress}% uploaded</p>
              </div>
            )}

            {/* Previews */}
            <div className="grid grid-cols-5 gap-3">
              {existingImages.map((url, i) => (
                <div key={`ex-${i}`} className="relative group aspect-[4/5] bg-secondary overflow-hidden">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeExisting(url)}
                    className="absolute top-1 right-1 w-6 h-6 bg-foreground/80 text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={12} />
                  </button>
                  {i === 0 && <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground font-sans text-[0.55rem] uppercase tracking-wide px-1.5 py-0.5">Main</span>}
                </div>
              ))}
              {newPreviews.map((src, i) => (
                <div key={`new-${i}`} className="relative group aspect-[4/5] bg-secondary overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeNew(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-foreground/80 text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={12} />
                  </button>
                  {existingImages.length === 0 && i === 0 && (
                    <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground font-sans text-[0.55rem] uppercase tracking-wide px-1.5 py-0.5">Main</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving}
              className="flex-1 bg-foreground text-primary-foreground font-sans text-sm uppercase tracking-widest py-4 hover:bg-primary transition-colors disabled:opacity-50">
              {saving ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
            </button>
            <button type="button" onClick={() => navigate("/admin/dashboard")}
              className="px-8 border border-border font-sans text-sm uppercase tracking-widest py-4 hover:border-primary transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
