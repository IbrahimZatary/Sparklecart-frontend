import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const data = await apiClient.get('/product');
        if (isMounted) {
          setProducts(data);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load products. Please try again.');
        }
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

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
      alert(err.response?.data?.message || 'Failed to add to cart');
      console.error(err);
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="text-xl text-gray-600">Loading products...</div>
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
            <div className="text-6xl mb-4">😞</div>
            <div className="text-xl text-red-500 mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500">No products available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Product Image Placeholder */}
                  <div 
                    className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer flex items-center justify-center"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <span className="text-4xl">🛍️</span>
                  </div>
                  
                  <div className="p-4">
                    <h3 
                      className="text-lg font-bold text-gray-800 mb-1 cursor-pointer hover:text-indigo-600"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm mb-2">
                      Stock: {product.quantity || 0}
                    </p>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-2xl font-bold text-indigo-600">
                        ${(product.price || 0).toFixed(2)}
                      </span>
                      
                      <button 
                        onClick={() => addToCart(product.id)}
                        disabled={addingToCart === product.id}
                        className="bg-black hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}