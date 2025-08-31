// src/components/SellerDashboard.jsx

import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Menu,
  Home,
  ShoppingCart,
  DollarSign,
  BarChart2,
  Plus,
  Bell,
  User,
  Edit,
  Trash2,
  Image as ImageIcon,
  UploadCloud,
  Layers,
  Sparkles,
  Info,
  Package,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Import API functions
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/product-api";

const THEME = {
  bg: "#1a202c",
  card: "#f8f9fa",
  text: "#1f2937",
  highlight: "#2a7f7f",
  border: "#cbd5e0",
  secondaryBg: "#e2e8f0",
};


const ProductCard = ({ product, onEdit, onDelete }) => (
  <motion.div
    key={product._id}
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="p-4 flex flex-col items-start rounded-xl" style={{ borderColor: THEME.border, background: THEME.card }}>
      <img
        src={product.images[0]?.url || "https://placehold.co/400x300/e2e8f0/64748b?text=Image"}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div className="w-full">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">₹{product.price.toFixed(2)}</p>
        <Badge className="mt-2" style={{ backgroundColor: THEME.secondaryBg, color: THEME.text }}>
          {product.category}
        </Badge>
        <Separator className="my-3" style={{ background: THEME.border }} />
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Stock: {product.stock}</span>
          <Badge style={{ backgroundColor: THEME.secondaryBg, color: THEME.text }}>
            Sold: {product.sold}
          </Badge>
        </div>
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="icon" onClick={() => onEdit(product._id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={() => onDelete(product._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default function SellerDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState("overview");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialForm = {
    name: "",
    price: "",
    description: "",
    category: "",
    images: [],
  };
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // === Fetch Products from Backend ===
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        // The Mongoose model schema has 'name', not 'title'
        // The Mongoose model schema has an array of 'images', not a single 'image' URL string
        setProducts(data.map(p => ({
          ...p,
          title: p.name,
          image: p.images?.[0]?.url, // For backward compatibility with the existing UI
        })));
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [view]); // Refetch when view changes to 'all-products' or 'overview'

  const totals = useMemo(() => {
    const revenue = products.reduce((s, p) => s + (p.sold || 0) * p.price, 0);
    const orders = products.reduce((s, p) => s + (p.sold || 0), 0);
    const avgPrice = products.length
      ? products.reduce((s, p) => s + p.price, 0) / products.length
      : 0;
    const visitors = Math.round(orders * (Math.random() * 2 + 15));
    return { revenue, orders, avgPrice, visitors };
  }, [products]);

  const chartData = useMemo(() => {
    // Generate mock data for the chart as the backend doesn't provide sales history
    const today = new Date();
    return Array.from({ length: 10 }).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (9 - i));
      const label = `${date.getMonth() + 1}/${date.getDate()}`;
      const baseSales = products.reduce((s, p) => s + (p.sold || 0), 0);
      const dailySales = Math.round(
        (baseSales / 10) + (Math.random() * 20 - 10)
      );
      return {
        name: label,
        sales: Math.max(0, dailySales),
      };
    });
  }, [products]);

  const topSellers = useMemo(() => {
    return [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 3);
  }, [products]);

  // === Handlers for Backend Interaction ===
  const validateForm = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 3)
      e.name = "Name required (min 3 chars)";
    if (!form.price || Number(form.price) <= 0)
      e.price = "Valid price required";
    if (!form.description || form.description.trim().length < 10)
      e.description = "Short description (min 10 chars)";
    if (!form.category) e.category = "Category required";
    if (!editing && form.images.length === 0)
      e.images = "At least one image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((p) => ({ ...p, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (editing && form._id) {
        await updateProduct(form._id, {
          name: form.name,
          price: Number(form.price),
          description: form.description,
          category: form.category,
          images: form.images,
        });
      } else {
        await createProduct({
          name: form.name,
          price: Number(form.price),
          description: form.description,
          category: form.category,
          images: form.images,
        });
      }
      resetForm();
      setView("all-products");
    } catch (err) {
      setError("Failed to save product. Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setEditing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (id) => {
    const p = products.find((x) => x._id === id);
    if (!p) return;
    setForm({
      _id: p._id,
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      images: [], // Images will be handled by a new upload
    });
    setEditing(true);
    setView("add-product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete));
    } catch (err) {
      setError("Failed to delete product. Please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const navLinkStyle = (key) =>
    `flex items-center gap-3 w-full px-3 py-3 rounded-lg transition-colors duration-200
    hover:bg-[${THEME.secondaryBg}]
    ${view === key ? `bg-[${THEME.secondaryBg}] shadow` : ""}`;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: THEME.bg, color: THEME.text }} className="flex">
      <style>{`:root{--bg:${THEME.bg};--card:${THEME.card};--text:${THEME.text};--highlight:${THEME.highlight};--border:${THEME.border};--secondary-bg: ${THEME.secondaryBg};}`}</style>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently remove the product from your catalog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDeleteDialogOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={confirmDelete} variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 260 }}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3 }}
        style={{ background: THEME.card, borderRight: `1px solid ${THEME.border}`, color: THEME.text }}
        className="flex flex-col flex-shrink-0"
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, borderRadius: 10, background: THEME.highlight, display: "grid", placeItems: "center", color: THEME.card }}>
              <Sparkles />
            </div>
            {!collapsed && <span className="text-xl font-bold">Seller Portal</span>}
          </div>
          <Button onClick={() => setCollapsed(!collapsed)} variant="ghost" size="icon">
            <Menu />
          </Button>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {[
            { key: "overview", label: "Overview", icon: Home },
            { key: "all-products", label: "Products", icon: ShoppingCart },
            { key: "add-product", label: "Add Product", icon: Plus },
          ].map((item) => (
            <Button
              key={item.key}
              onClick={() => { setView(item.key); resetForm(); }}
              variant="ghost"
              className={navLinkStyle(item.key)}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-6">
          <h2 style={{ color: THEME.card }} className="text-3xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Bell /></Button>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: THEME.card, color: THEME.text }}>
              <User className="h-5 w-5" /><span className="font-medium hidden sm:inline">Seller</span>
            </div>
          </div>
        </header>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {isLoading && <div className="text-center py-10" style={{ color: THEME.card }}>Loading...</div>}

        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {view === "overview" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <Card style={{ background: THEME.card, borderColor: THEME.border }}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹{totals.revenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total orders: {totals.orders}</p>
                      </CardContent>
                    </Card>
                    <Card style={{ background: THEME.card, borderColor: THEME.border }}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Visitors</CardTitle>
                        <BarChart2 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{totals.visitors.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Avg. conversion: {((totals.orders / Math.max(1, totals.visitors)) * 100).toFixed(1)}%
                        </p>
                      </CardContent>
                    </Card>
                    <Card style={{ background: THEME.card, borderColor: THEME.border }}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Best Seller</CardTitle>
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold">{topSellers[0]?.name || "—"}</div>
                        <p className="text-xs text-muted-foreground mt-1">Sold: {topSellers[0]?.sold ?? 0}</p>
                      </CardContent>
                    </Card>
                    <Card style={{ background: THEME.card, borderColor: THEME.border }}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{products.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">Total stock: {products.reduce((s, p) => s + (p.stock || 0), 0)}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card style={{ background: THEME.card, borderColor: THEME.border }}>
                    <CardHeader>
                      <CardTitle>Sales Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} />
                            <XAxis dataKey="name" stroke={THEME.text} />
                            <YAxis stroke={THEME.text} />
                            <RTooltip />
                            <Line type="monotone" dataKey="sales" stroke={THEME.highlight} strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {view === "add-product" && (
                <Card style={{ background: THEME.card, borderColor: THEME.border }}>
                  <CardHeader>
                    <CardTitle>{editing ? "Edit Product" : "Add New Product"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Product Name*</label>
                            <Input
                              value={form.name}
                              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                              placeholder="e.g. Handmade Leather Wallet"
                            />
                            {errors.name && (<p className="text-xs text-red-500 mt-1">{errors.name}</p>)}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Price (₹)*</label>
                              <Input
                                value={form.price}
                                onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                                type="number"
                                placeholder="e.g. 1999.00"
                              />
                              {errors.price && (<p className="text-xs text-red-500 mt-1">{errors.price}</p>)}
                            </div>
                            <div>
                              <label className="text-sm font-medium">Description*</label>
                              <textarea
                                value={form.description}
                                onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Short description (min 10 chars)"
                              />
                              {errors.description && (<p className="text-xs text-red-500 mt-1">{errors.description}</p>)}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Category*</label>
                            <Input
                              value={form.category}
                              onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
                              placeholder="e.g. Electronics, Furniture"
                            />
                            {errors.category && (<p className="text-xs text-red-500 mt-1">{errors.category}</p>)}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Product Images*</label>
                            <div
                              onClick={() => fileInputRef.current.click()}
                              className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer"
                              style={{ borderColor: THEME.border }}
                            >
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                              />
                              <div className="flex flex-col items-center text-center text-sm">
                                <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                                Drag & drop or click to upload
                              </div>
                            </div>
                            {errors.images && (<p className="text-xs text-red-500 mt-1">{errors.images}</p>)}
                          </div>
                          {form.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-2">
                              {form.images.map((file, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-auto object-cover rounded"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setForm(p => ({ ...p, images: p.images.filter((_, i) => i !== index) }))}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button type="submit" style={{ backgroundColor: THEME.highlight, color: THEME.card }} disabled={isLoading}>
                          {editing ? "Save Changes" : "Add Product"}
                        </Button>
                        <Button type="button" variant="outline" onClick={resetForm} disabled={isLoading}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {view === "all-products" && (
                <Card style={{ background: THEME.card, borderColor: THEME.border }}>
                  <CardHeader>
                    <CardTitle>Your Products ({products.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {products.length === 0 && (
                      <div className="text-center text-gray-500 py-10">
                        <Info className="h-8 w-8 mx-auto mb-2" />
                        No products found. Add your first product to get started.
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((p) => (
                        <ProductCard key={p._id} product={p} onEdit={handleEdit} onDelete={handleDelete} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}