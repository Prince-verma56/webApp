import React, { useState } from "react";
import {
  Trash2,
  Edit2,
} from "lucide-react";

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

// Mock data for products
const mockProducts = [
  { id: 1, name: "Product A", category: "Category 1", price: 29.99, image: "https://placehold.co/100x100" },
  { id: 2, name: "Product B", category: "Category 2", price: 49.50, image: "https://placehold.co/100x100" },
  { id: 3, name: "Product C", category: "Category 1", price: 12.00, image: "https://placehold.co/100x100" },
  { id: 4, name: "Product D", category: "Category 3", price: 99.99, image: "https://placehold.co/100x100" },
];


const AllProducts = () => {
  const [products, setProducts] = useState(mockProducts);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
    console.log(`Product with id ${id} deleted.`);
  };

  const handleEdit = (id) => {
    console.log(`Editing product with id ${id}.`);
    // In a real app, this would navigate to an edit page or open a modal
  };

  return (
    <div className="p-8 space-y-8 font-sans">
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            A comprehensive list of all products in your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEdit(product.id)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" className="text-red-600 hover:text-red-900 ml-2" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllProducts;
