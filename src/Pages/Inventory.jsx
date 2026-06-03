import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
    categoryId: ''
  });
  const [submitting, setSubmitting] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [totalProducts, setTotalProducts] = useState(0)
  ;
  const [pageSize] = useState(10);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [token, navigate]);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          apiClient.get(`/product?pageNumber=${currentPage}&pageSize=${pageSize}`),
          apiClient.get('/category')
        ]);
        if (isMounted) {
          setProducts(productsRes.items || []);

          setTotalPages(productsRes.totalPages);

          setTotalProducts(productsRes.totalCount );

          setCategories(categoriesRes);
          setError('');

          console.log('Products loaded:', productsRes.items);
          console.log('Categories loaded:', categoriesRes);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load data');
        }
        console.error(err);
      } finally {
        if (isMounted) {

          setLoading(false);
        }

      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentPage, pageSize]);

  const openCreateModal = () => {
    setEditingProduct(null);

    setFormData({
      name: '',
      price: '',
      description: '',
      quantity: '',
      categoryId: ''


    });
    setShowModal(true);
  };
// pop up on edit 
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,


      price: product.price,
      description: product.description,

      quantity: product.quantity,
      categoryId: product.categoryId
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),

        description: formData.description,

        quantity: parseInt(formData.quantity),

        categoryId: parseInt(formData.categoryId)
      };

      console.log('Sending product data:', productData);

      if (editingProduct) {
        await apiClient.put(`/product/${editingProduct.id}`, productData);
        alert('Product updated !');
      } 
      else {


        await apiClient.post('/product', productData);
        alert('Product created !');
      }

      setShowModal(false);
      
      const updatedProducts = await apiClient.get(`/product?pageNumber=${currentPage}&pageSize=${pageSize}`);
      setProducts(updatedProducts.items);

      setTotalPages(updatedProducts.totalPages);

      setTotalProducts(updatedProducts.totalCount );
    } catch (err) {
      console.error('Error response:', err.response?.data);
      
      if (err.response?.data?.errors) {

        const errorMessages = [];
        const errors = err.response.data.errors;

        for (const [field, messages] of Object.entries(errors)) {

          errorMessages.push(`${field}: ${messages.join(', ')}`);

        }
        alert(`Validation failed:\n${errorMessages.join('\n')}`);
      } else 
        {

        alert(err.response?.data?.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {

    if (!window.confirm(`Are you sure you want to
       delete "${product.name}"?
       This action cannot be undone.`)) {
      return;
    }

    try {

      await apiClient.delete(`/product/${product.id}`);
      alert('Product deleted successfully!');

      
      const updatedProducts = await apiClient.get(`/product?pageNumber=${currentPage}&pageSize=${pageSize}`);
      setProducts(updatedProducts.items );

      setTotalPages(updatedProducts.totalPages);

      setTotalProducts(updatedProducts.totalCount );
    } catch (err) {
      alert(err.response?.data?.message);
      console.error(err);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories
    .find(c => c.categoryID === categoryId || c.id === categoryId);
    return category?.name;
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">

            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin">

            </div>
            <div className="text-xl text-gray-600">Loading inventory</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">

            <div className="text-xl text-red-500 mb-4">{error}</div>

            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
            </div>
            <button
              onClick={openCreateModal}
              className="text-black bg-white hover:bg-gray-900 hover:text-white border border-gray-300 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span className="text-xl">+</span> Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
              <div className="text-gray-500">Total Products</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-gray-900">{categories.length}</div>
              <div className="text-gray-500">Categories</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-gray-900">
                {products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
              </div>
              <div className="text-gray-500">Total Stock (Current Page)</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                {/* // if no prodcuts found  */}
                <tbody className="divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        there isNo products found click into "Add New Product" to create one.
                       </td>
                     </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-mono text-gray-900 font-medium">{product.id}</td>
                        <td className="px-6 py-4"> 

                          <div className="font-medium text-gray-900">{product.name}</div>
                          {product.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          ${(product.price || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-900">
                            {product.quantity || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.categoryName || getCategoryName(product.categoryId)}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button

                            onClick={() => openEditModal(product)}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    : 'bg-white text-gray-700 hover:bg-gray-900 hover:text-white border-gray-300'
                }`}
              >
                ← Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                    : 'bg-white text-gray-700 hover:bg-gray-900 hover:text-white border-gray-300'
                }`}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Create New Product'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category </label>
                <select
                  name="categoryId"

                  value={formData.categoryId}

                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (

                    <option key={category.categoryID || category.id} value={category.categoryID || category.id}>

                      {category.name}

                    </option>
                  ))} 

                  

                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"

                  value={formData.description}

                  onChange={handleInputChange}

                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Product description (optional)"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"

                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}

                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}