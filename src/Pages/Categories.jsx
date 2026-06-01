import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  const [error, setError] = useState('');


  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

 
  const loadData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        apiClient.get('/category'),
        apiClient.get('/product')
      ]);
      setCategories(categoriesRes);
      setProducts(productsRes);

      setError('');
    } catch (err) {

      setError('Failed to load .');
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
    loadData();
  }, [token, navigate]);

  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.categoryId === categoryId || product.categoryID === categoryId);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.categoryID === categoryId || c.id === categoryId);
    return category?.name || 'Unknown'; //just handling here 
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="text-xl text-gray-600">Loading categories...</div>
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
              onClick={loadData}
              className="bg-black text-white px-6 py-2 rounded-lg"
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop by Category</h1>
          <p className="text-gray-500 mb-8">Browse products organized by category</p>

          
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === null
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.categoryID || category.id}

                onClick={() => setSelectedCategory(category.categoryID || category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${

                  selectedCategory === (category.categoryID || category.id)
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>

            ))}
          </div>

        
          {selectedCategory === null ? (


            <div className="space-y-12">
              {categories.map((category) => {
                const categoryId = category.categoryID || category.id;
                const categoryProducts = getProductsByCategory(categoryId);
                
                if (categoryProducts.length === 0) return null;
                
                return (
                  <div key={categoryId}>
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>


                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">

                        {categoryProducts.length} products
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {categoryProducts.map((product) => (
                        <div
                          key={product.id}

                          onClick={() => navigate(`/product/${product.id}`)}

                          className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                        >
                          <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {product.description?.substring(0, 80) || 'No description available'}
                            {product.description?.length > 80 ? '...' : ''}
                          </p>
                          <div className="flex justify-between items-center mt-3">

                            <span className="text-xl font-bold text-gray-900">
                              ${(product.price || 0).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-700">


                              {product.quantity > 0 ? `In Stock (${product.quantity})` : 'Out of Stock'}
                            </span>
                          </div>
                        </div>

                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // 
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{getCategoryName(selectedCategory)}</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {getProductsByCategory(selectedCategory).length} products
                </span>
              </div>
              {getProductsByCategory(selectedCategory).length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-500">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {getProductsByCategory(selectedCategory).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">

                        {product.description?.substring(0, 80) }
                        {product.description?.length > 80 ? '...' : ''}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xl font-bold text-gray-900">

                          ${(product.price || 0).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-700">
                          {product.quantity > 0 ? `In Stock (${product.quantity})` : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow">

                <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
                <div className="text-gray-500 text-sm">Total Categories</div>

              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow">

                <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                <div className="text-gray-500 text-sm">Total Products</div>
                
                 </div>
              <div className="bg-white rounded-lg p-4 text-center shadow">
                <div className="text-2xl font-bold text-gray-900">

                  {products.filter(p => (p.quantity || 0) > 0).length}
                </div>
                <div className="text-gray-500 text-sm">In Stock Products</div>

              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow">
                <div className="text-2xl font-bold text-gray-900">

                  {products.reduce((sum, p) => sum + (p.quantity || 0), 0)}
                </div>
                <div className="text-gray-500 text-sm">Total Stock Items</div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}