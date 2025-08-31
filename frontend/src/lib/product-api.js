const API_URL = import.meta.env.VITE_API_URL || 'https://web-app-kohl-theta.vercel.app/api/products';

const apiRequest = async (url, method, data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    // Check if the response has content before parsing JSON
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error(`API Request Failed: ${error.message}`);
    throw error;
  }
};

// Fetch all products
export const fetchProducts = async () => {
  return apiRequest(API_URL, 'GET');
};

// Create a new product
export const createProduct = async (productData) => {
  return apiRequest(API_URL, 'POST', productData);
};

// Update an existing product
export const updateProduct = async (id, updatedFields) => {
  return apiRequest(`${API_URL}/${id}`, 'PUT', updatedFields);
};

// Delete a product
export const deleteProduct = async (id) => {
  return apiRequest(`${API_URL}/${id}`, 'DELETE');
};
