"use client";
import React, { useState, useEffect } from "react";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconX,
  IconCheck,
  IconCategory,
  IconCurrencyZloty,
} from "@tabler/icons-react";
import { productService } from '@/services/firebaseService';
import { Product } from '@/types';

const CATEGORIES = ["Main Dish", "Side Dish", "Beverage", "Souvenir", "Snack", "Staple"];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id" | "createdAt" | "updatedAt">>({
    name: "",
    price: 0,
    category: "",
    stock: 0,
    description: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load products from Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await productService.getAllProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let result = products;
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category || newProduct.price <= 0) {
      alert("Please fill in all required fields");
      return;
    }
    
    try {
      const productId = await productService.createProduct(newProduct);
      
      // Add the new product to local state
      const productToAdd: Product = {
        ...newProduct,
        id: productId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setProducts([...products, productToAdd]);
      setNewProduct({ name: "", price: 0, category: "", stock: 0, description: "" });
      setIsAdding(false);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleUpdateProduct = async () => {
    if (!currentProduct) return;
    
    try {
      await productService.updateProduct(currentProduct.id, currentProduct);
      
      // Update the product in local state
      setProducts(products.map(product => 
        product.id === currentProduct.id ? currentProduct : product
      ));
      
      setIsEditing(false);
      setCurrentProduct(null);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await productService.deleteProduct(id);
      
      // Remove the product from local state
      setProducts(products.filter(product => product.id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setCurrentProduct(null);
    setNewProduct({ name: "", price: 0, category: "", stock: 0, description: "" });
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-2xl mb-4">⚠️</div>
          <p className="text-gray-800 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <IconPlus className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <div className="text-gray-600 flex items-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {filteredProducts.length} products found
              </span>
            </div>
          </div>
        </div>

        {/* Add/Edit Product Form */}
        {(isAdding || isEditing) && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {isAdding ? "Add New Product" : "Edit Product"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={isAdding ? newProduct.name : currentProduct?.name || ""}
                  onChange={(e) => isAdding 
                    ? setNewProduct({...newProduct, name: e.target.value})
                    : setCurrentProduct({...currentProduct!, name: e.target.value})
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Pap en Vleis"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={isAdding ? newProduct.category : currentProduct?.category || ""}
                  onChange={(e) => isAdding 
                    ? setNewProduct({...newProduct, category: e.target.value})
                    : setCurrentProduct({...currentProduct!, category: e.target.value})
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (M) *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconCurrencyZloty className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={isAdding ? newProduct.price : currentProduct?.price || 0}
                    onChange={(e) => isAdding 
                      ? setNewProduct({...newProduct, price: parseFloat(e.target.value)})
                      : setCurrentProduct({...currentProduct!, price: parseFloat(e.target.value)})
                    }
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={isAdding ? newProduct.stock : currentProduct?.stock || 0}
                  onChange={(e) => isAdding 
                    ? setNewProduct({...newProduct, stock: parseInt(e.target.value)})
                    : setCurrentProduct({...currentProduct!, stock: parseInt(e.target.value)})
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={isAdding ? newProduct.description : currentProduct?.description || ""}
                onChange={(e) => isAdding 
                  ? setNewProduct({...newProduct, description: e.target.value})
                  : setCurrentProduct({...currentProduct!, description: e.target.value})
                }
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Product description..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={isAdding ? handleAddProduct : handleUpdateProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isAdding ? "Add Product" : "Update Product"}
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 10 ? "bg-green-100 text-green-800" : 
                    product.stock > 0 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>
                
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <IconCategory className="h-4 w-4 mr-1" />
                  {product.category}
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">M{product.price.toFixed(2)}</span>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      <IconEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <IconTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No products found. Try a different search or add a new product.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;