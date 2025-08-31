import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createProduct } from "@/lib/product-api";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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

    try {
      // Convert price to number
      const productData = {
        ...product,
        price: parseFloat(product.price),
      };

      const response = await createProduct(productData);
      
      toast({
        title: 'Success!',
        description: 'Product added successfully',
        variant: 'default',
      });

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
      
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add product',
        variant: 'destructive',
      });
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
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <Input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Input
                type="text"
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Product Images
              </label>
              <Input
                type="file"
                id="images"
                name="images"
                onChange={handleChange}
                multiple
                accept="image/*"
                required
                className="mt-1"
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload one or more images of your product
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
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

export default AddProduct;
