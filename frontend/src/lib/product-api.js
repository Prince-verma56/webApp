const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API requests with file uploads
const apiRequest = async (endpoint, method, data = null, isMultipart = false) => {
  const url = `${API_URL}${endpoint}`;
  const headers = {};
  let body;

  if (isMultipart) {
    body = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        // Append each file to FormData
        Array.from(value).forEach((file) => {
          body.append('images', file);
        });
      } else {
        body.append(key, value);
      }
    });
  } else {
    headers['Content-Type'] = 'application/json';
    body = data ? JSON.stringify(data) : null;
  }

  const options = {
    method,
    headers,
    body,
    credentials: 'include', // Include cookies for authentication if needed
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(responseData.message || `API error: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Product API functions
export const fetchProducts = async () => {
  return apiRequest('/products', 'GET');
};

export const createProduct = async (productData) => {
  return apiRequest('/products', 'POST', productData, true);
};

export const updateProduct = async (id, updatedFields) => {
  return apiRequest(`/products/${id}`, 'PUT', updatedFields, true);
};

export const deleteProduct = async (id) => {
  return apiRequest(`/products/${id}`, 'DELETE');
};
