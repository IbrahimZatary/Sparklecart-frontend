import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null); 
  
   // for pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageSize] = useState(10);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const loadCategories = async () => {
    setLoading(true);
    try {
      const categoriesRes = await apiClient.get('/category');
      setCategories(categoriesRes);
      setError('');
      if (categoriesRes.length > 0) {
        const firstCategoryId = categoriesRes[0].id;
        setSelectedCategory(firstCategoryId);
        loadCategoryProducts(firstCategoryId);
      }
    } catch (err) {
      setError('Failed to load categories.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/signin');
      return;
    }
    loadCategories();
  }, [token, navigate]);

  const loadCategoryProducts = async (categoryId) => {
    setProductsLoading(true);
    setProducts([]);
    setCurrentPage(1);
    
    try {
      const firstPage = await apiClient.get(`/product?pageNumber=1&pageSize=10`);
      const totalProductsCount = firstPage.totalCount;
      const allProducts = [];
      
      const totalPagesToFetch = Math.ceil(totalProductsCount / 100);
      for (let page = 1; page <= totalPagesToFetch; page++) {
        const response = await apiClient.get(`/product?pageNumber=${page}&pageSize=100`);
        allProducts.push(...response.items);
      }
      
      const targetCategoryId = parseInt(categoryId);
      const filteredProducts = allProducts.filter(product => {
        return product.categoryId === targetCategoryId;
      });
      
      const startIndex = (currentPage - 1) * pageSize;
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
      
      setProducts(paginatedProducts);
      setTotalProducts(filteredProducts.length);
      setTotalPages(Math.ceil(filteredProducts.length / pageSize));
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      return; 
    } else {
      setSelectedCategory(categoryId);
      setCurrentPage(1);
      loadCategoryProducts(categoryId);
    }
  };

  const addToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      alert('Please login first');
      navigate('/signin');
      return;
    }

    setAddingToCart(productId);
    try {
      await apiClient.post(`/cart/add?userID=${userId}`, { 
        productId: productId, 
        quantity: 1 
      });
      alert('Added to cart!');
    } catch (err) {
      alert(err.response?.data?.message);
      console.error(err);
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading categories..." />;
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl text-red-500 mb-4">{error}</div>
            <button 
              onClick={loadCategories}
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
          <div className="flex flex-wrap gap-8 mb-8 pb-4 border-b border-gray-200">
            {categories.map((category) => (
              <button
                key={ category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`text-base font-medium transition-colors cursor-pointer hover:text-gray-900 ${
                  selectedCategory === (category.id)
                    ? 'text-gray-900 border-b-2 border-gray-900 pb-4 -mb-4'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {productsLoading ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">No products found in this category.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div 
                        className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer flex items-center justify-center"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <span className="text-4xl">🛍️</span>
                      </div>
                      <div className="p-4">
                        <h3 
                          className="text-lg font-bold text-gray-800 mb-1 cursor-pointer hover:text-gray-600"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-2">
                          Stock: {product.quantity || 0}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-2xl font-bold text-gray-900">
                            ${(product.price || 0).toFixed(2)}
                          </span>
                          <button 
                            onClick={() => addToCart(product.id)}
                            disabled={addingToCart === product.id}
                            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
                          >
                            {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}