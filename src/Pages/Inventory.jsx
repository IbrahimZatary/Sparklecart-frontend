import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../Components/ErrorDisplay';
import ProductFormModal from '../Components/ProductFormModal';

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
  // pagination states

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
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
          setProducts(productsRes.items );
          setTotalPages(productsRes.totalPages);

          setTotalProducts(productsRes.totalCount);
          setCategories(categoriesRes);
          setError('');
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

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      categoryId: product.categoryId});
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

      if (editingProduct) {
        await apiClient.put(`/product/${editingProduct.id}`, productData);
        alert('Product updated!');
      } else {
        await apiClient.post('/product', productData);
        alert('Product created!');
      }

      setShowModal(false);
      
      const updatedProducts = await apiClient.get(`/product?pageNumber=${currentPage}&pageSize=${pageSize}`);
      setProducts(updatedProducts.items);
      setTotalPages(updatedProducts.totalPages);

      setTotalProducts(updatedProducts.totalCount);

    } catch (err) {
      console.error('Error response:', err.response?.data);
      
      if (err.response?.data?.errors) {
        const errorMessages = [];
        const errors = err.response.data.errors;
        for (const [field, messages] of Object.entries(errors)) {
          errorMessages.push(`${field}: ${messages.join(', ')}`);
        }
        alert(`Validation failed:\n${errorMessages.join('\n')}`);
      } else {
        alert(err.response?.data?.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (product) => {

    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      await apiClient.delete(`/product/${product.id}`);

      alert('Product deleted ');
      
      const updatedProducts = await apiClient.get(`/product?pageNumber=${currentPage}&pageSize=${pageSize}`);
      setProducts(updatedProducts.items);

      setTotalPages(updatedProducts.totalPages);

      setTotalProducts(updatedProducts.totalCount);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.categoryID === categoryId || c.id === categoryId);
    return category?.name;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner message='Loading the inventory'/>       <Footer />
      </>
    )
  };

  if (error) 
    return   <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
;

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

                {products.reduce((sum, p) => sum + (p.quantity), 0)}
              </div>
              <div className="text-gray-500">Total Stock</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white">
                  <tr>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                
                
                
                <tbody className="divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        No products found. Click "Add New Product" .
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
                          ${(product.price ).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-900">
                            {product.quantity }
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

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      
                  <ProductFormModal 
                      isOpen={showModal}

                      onClose={() => setShowModal(false)}
                      onSubmit={handleSubmit}

                      editingProduct={editingProduct}
                      formData={formData}


                      onInputChange={handleInputChange}
                      categories={categories}
                      submitting={submitting}
                    />


      <Footer />
    </>
  );
};