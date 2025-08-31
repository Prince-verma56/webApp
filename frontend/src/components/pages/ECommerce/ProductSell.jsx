import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  Library,
  FileText,
  Type,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Box,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import AllProducts from "./ECommerceContents/AllProducts";
import { createProduct } from "@/lib/product-api";

// --- Mock shadcn/ui components for a single file ---

// A simple mock for the Button component
const Button = ({ children, className, variant, onClick, disabled }) => {
  const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors";
  let variantClasses = "text-gray-900 hover:bg-gray-100";
  if (variant === "secondary") {
    variantClasses = "bg-gray-200 text-gray-900 hover:bg-gray-300";
  }
  if (variant === "ghost") {
    variantClasses = "text-gray-700 hover:bg-gray-100";
  }
  if (disabled) {
    variantClasses = "bg-gray-100 text-gray-400 cursor-not-allowed";
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

// A simple mock for the Card components
const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-white text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// A simple mock for the DropdownMenu components
const DropdownMenu = ({ children }) => <>{children}</>;
const DropdownMenuTrigger = ({ children }) => <>{children}</>;
const DropdownMenuContent = ({ children }) => <div className="absolute z-50 bg-white shadow-lg rounded-md p-1 mt-2">{children}</div>;
const DropdownMenuItem = ({ children }) => <div className="p-2 cursor-pointer hover:bg-gray-100 rounded-md">{children}</div>;

// --- Components for different pages ---

// Product Lifecycle component
const ProductLifecycle = () => {
  const chartData = [
    { name: 'Jan', value1: 400, value2: 240 },
    { name: 'Feb', value1: 300, value2: 139 },
    { name: 'Mar', value1: 200, value2: 980 },
    { name: 'Apr', value1: 278, value2: 390 },
    { name: 'May', value1: 189, value2: 480 },
    { name: 'Jun', value1: 239, value2: 380 },
    { name: 'Jul', value1: 349, value2: 430 },
    { name: 'Aug', value1: 400, value2: 240 },
    { name: 'Sep', value1: 300, value2: 139 },
    { name: 'Oct', value1: 200, value2: 980 },
    { name: 'Nov', value1: 278, value2: 390 },
    { name: 'Dec', value1: 189, value2: 480 },
  ];
  
  const lifecycleStages = [
    { name: 'Awareness', description: 'The user discovers the platform.', color: 'bg-blue-500' },
    { name: 'Engagement', description: 'They interact with content.', color: 'bg-green-500' },
    { name: 'Adoption', description: 'The user begins to use it regularly.', color: 'bg-purple-500' },
    { name: 'Retention', description: 'They continue to use the platform.', color: 'bg-yellow-500' },
    { name: 'Advocacy', description: 'They share their positive experience.', color: 'bg-pink-500' },
  ];

  return (
    <div className="p-8 space-y-8 font-sans">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Understanding the User Journey</CardTitle>
          <CardDescription>
            Visualize how users progress through our platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Mental Wellness Progress</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value1" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue1)" />
                <Area type="monotone" dataKey="value2" stroke="#82ca9d" fillOpacity={1} fill="url(#colorValue2)" />
                <defs>
                  <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>The User Lifecycle Journey</CardTitle>
          <CardDescription>
            A step-by-step visualization of the user's path.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex justify-between items-start my-8">
            {lifecycleStages.map((stage, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center flex-1 text-center px-2 z-10">
                  <div className={`w-8 h-8 rounded-full ${stage.color} mb-2`}></div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{stage.name}</h4>
                  <p className="text-xs text-gray-600">{stage.description}</p>
                </div>
                {index < lifecycleStages.length - 1 && (
                  <div className="absolute top-4 left-1/2 right-1/2 w-full h-px bg-gray-300 transform -translate-x-1/2 -z-10"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add Product component with a form
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setProduct({ ...product, images: files });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Create FormData object for file uploads
      const formData = new FormData();
      
      // Append text fields
      formData.append('name', product.name);
      formData.append('price', parseFloat(product.price));
      formData.append('description', product.description);
      formData.append('category', product.category);
      
      // Append each image file
      Array.from(product.images).forEach((file, index) => {
        formData.append('images', file);
      });

      // Send the request
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products`, {
        method: 'POST',
        body: formData,
        credentials: 'include' // Include cookies for authentication
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add product');
      }
      
      setMessage('Product added successfully!');
      
      // Reset form
      setProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        images: [],
      });

      // Clear file input
      const fileInput = document.getElementById('images');
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.message || 'Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <Card className="p-8 max-w-lg w-full">
        <CardHeader>
          <CardTitle>Add a New Product</CardTitle>
          <CardDescription>
            Fill out the form below to add a product to your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
                {message}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              ></textarea>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleChange}
                multiple
                accept="image/*"
                required
                className="mt-1 block w-full text-sm text-gray-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload one or more images of your product
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full justify-center" 
              disabled={loading}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Main Dashboard Component ---

// Sidebar menu config
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "lifecycle", label: "Lifecycle", icon: FolderKanban },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: FileText },
  { id: "team", label: "Team", icon: Users },
];

const docsItems = [
  { id: "products", label: "Add Products", icon: Box },
  { id: "all products", label: "All ", icon: FileText },
  { id: "assistant", label: "Word Assistant", icon: Type },
];

export default function ProductSell() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$1,250.00</p>
                <p className="text-sm text-gray-500">
                  Trending up this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-sm text-gray-500">
                  Down 20% this period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">45,678</p>
                <p className="text-sm text-gray-500">
                  Strong user retention
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">4.5%</p>
                <p className="text-sm text-gray-500">
                  Steady performance increase
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case "lifecycle":
        return <ProductLifecycle />;
      case "analytics":
        return <p className="text-lg text-center p-8">📊 Analytics content coming soon...</p>;
      case "projects":
        return <p className="text-lg text-center p-8">📂 Projects page coming soon...</p>;
      case "team":
        return <p className="text-lg text-center p-8">👥 Team management page...</p>;
      case "products":
        return <AddProduct />;
      case "all products":
        return <AllProducts />;
      default:
        return <p className="text-lg text-center p-8">⚡ Select a menu option.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div
        className={`bg-white border-r transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        } flex flex-col shadow-md`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h2 className="font-bold text-xl">Seller Inc.</h2>}
          <Button
            variant="ghost"
            className="rounded-full w-8 h-8 p-1"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        {/* Main menu */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activePage === item.id ? "secondary" : "ghost"}
              className="w-full justify-start rounded-lg"
              onClick={() => setActivePage(item.id)}
            >
              <item.icon className={`h-5 w-5 ${!collapsed ? "mr-2" : ""}`} />
              {!collapsed && item.label}
            </Button>
          ))}

          {/* Documents */}
          {!collapsed && (
            <p className="px-3 mt-4 text-xs uppercase text-gray-400 font-medium">
              User Profile
            </p>
          )}
          {docsItems.map((item) => (
            <Button
              key={item.id}
              variant={activePage === item.id ? "secondary" : "ghost"}
              className="w-full justify-start rounded-lg"
              onClick={() => setActivePage(item.id)}
            >
              <item.icon className={`h-5 w-5 ${!collapsed ? "mr-2" : ""}`} />
              {!collapsed && item.label}
            </Button>
          ))}
        </nav>

        {/* Footer with dropdown */}
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="w-full justify-start rounded-lg">
                <MoreHorizontal className={`h-5 w-5 ${!collapsed ? "mr-2" : ""}`} />
                {!collapsed && "More"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center border-b bg-white px-6 py-4 shadow-sm">
          <h1 className="text-xl font-semibold capitalize">{activePage}</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
