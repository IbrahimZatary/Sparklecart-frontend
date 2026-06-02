import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';

import Navbar from '../Components/Navbar';

import Footer from '../Components/Footer';

export default function CategoryProducts() {

  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  const [categoryName, setCategoryName] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [addingToCart, setAddingToCart] = useState(null);
  
  // for pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [totalProducts, setTotalProducts] = useState(0);
  const [pageSize] = useState(10);
  
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const loadCategoryProducts = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/product?pageNumber=${currentPage}&pageSize=${pageSize}`);
      
      const categoryProducts = (response.items ).filter(
        product => product.categoryId === parseInt(categoryId) || product.categoryID === parseInt(categoryId)
      );
      
      setProducts(categoryProducts);

      setTotalProducts(categoryProducts.length);

      setTotalPages(Math.ceil(categoryProducts.length / pageSize));
      
      if (categoryProducts.length > 0 && categoryProducts[0].categoryName) {
        setCategoryName(categoryProducts[0].categoryName);
      } else {
        const categories = await apiClient.get('/category');

        const category = categories.find(c => c.categoryID === parseInt(categoryId) || c.id === parseInt(categoryId));
        setCategoryName(category?.name);
      }
      
      setError('');
    } catch (err) {

      setError('Failed to load products');

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
    loadCategoryProducts();

  }, [token, currentPage, categoryId]);

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

      alert(err.response?.data?.message );
      console.error(err);
    } finally {
      setAddingToCart(null);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {

      setCurrentPage(currentPage + 1);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">

            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            <div className="text-xl text-gray-600">Loading products</div>
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
              onClick={loadCategoryProducts}

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

          <button
            onClick={() => navigate('/categories')}

            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
          >
            ← Back to Categories
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{categoryName}</h1>
          <p className="text-gray-500 mb-8">
            Showing {products.length} products
          </p>

          {products.length === 0 ? (
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

                        Stock: {product.quantity }
                      </p>
                      
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-2xl font-bold text-gray-900">

                          ${(product.price || 0).toFixed(2)}

                        </span>
                        
                        <button 
                          onClick={() => addToCart(product.id)}

                          disabled={addingToCart === product.id}

                          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}

                        </button>

                      </div>

                    </div>

                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
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

                  <div className="flex gap-1">

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;


                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}

                          className={`w-10 h-10 rounded-lg transition-colors ${

                            currentPage === pageNum
                              ? 'bg-gray-900 text-white'

                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

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

              <div className="text-center text-gray-500 text-sm mt-4">
              
                Page {currentPage} of {totalPages}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}