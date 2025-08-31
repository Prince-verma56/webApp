import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const DashboardContent = () => {
  const dashboardData = {
    totalRevenue: "₹2,50,000",
    totalVisitors: "15,450",
    activeUsers: "258",
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.totalRevenue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.totalVisitors}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.activeUsers}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-80 bg-gray-100 flex items-center justify-center rounded-md">
            [Placeholder for Sales Graph]
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    images: [],
  });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setFormData({ ...formData, images: Array.from(e.target.files) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: "", type: "" });

    const data = new FormData();
    for (const key in formData) {
      if (key === "images") {
        formData.images.forEach((image) => data.append("images", image));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      await axios.post("http://localhost:7000/api/products", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus({ message: "Product created successfully!", type: "success" });
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        images: [],
      });
    } catch (err) {
      setStatus({
        message: err.response?.data?.message || "Failed to create product.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Product</h1>

      {status.message && (
        <div
          className={`p-4 rounded-md mb-4 ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Images (Max 3)</Label>
              <Input type="file" multiple onChange={handleFileChange} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Adding Product..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const SellerDashboard2 = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveLink = (path) =>
    location.pathname === path
      ? "bg-gray-200 text-gray-900"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  return (
    <div className="flex min-h-screen">
      
      <aside
        className={`bg-white shadow-lg border-r flex-shrink-0 ${
          isSidebarExpanded ? "w-64" : "w-20"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {isSidebarExpanded && (
            <h2 className="text-xl font-bold">Seller Dashboard</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          >
            ☰
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start ${getActiveLink("/seller-dashboard2")}`}
            onClick={() => navigate("/seller-dashboard2")}
          >
            📊 {isSidebarExpanded && <span className="ml-2">Dashboard</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start ${getActiveLink("/create-product")}`}
            onClick={() => navigate("/create-product")}
          >
            ➕ {isSidebarExpanded && <span className="ml-2">Create Product</span>}
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b">
          <h1 className="text-lg font-semibold">Welcome back, Seller!</h1>
        </header>

        <main className="flex-1 bg-gray-50 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="*" element={<DashboardContent />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard2;
