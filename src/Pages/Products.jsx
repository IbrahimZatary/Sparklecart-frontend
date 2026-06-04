import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Layout/Navbar';

import Footer from '../Components/Layout/Footer';

import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../Components/ErrorDisplay';
import ProductCard from '../Components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);
  
  // for pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/product?pageNumber=${currentPage}&pageSize=${pageSize}`);
        
        if (isMounted) {
          setProducts(response.items);

          setTotalPages(response.totalPages);

          setTotalProducts(response.totalCount);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load products');
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
  }, [currentPage, pageSize]);

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
        quantity: 1 // As default
      });
      alert('Added to cart');
    } catch (err) {

      alert(err.response?.data?.message);
      console.error(err);
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
    <LoadingSpinner/>
    )
  };

  if (error) {
    return (
      <>
        <Navbar />
        <ErrorDisplay message='Failed to load products'/>
        <Footer />
      </>
    )
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
          
          <p className="text-gray-500 mb-8">Showing {products.length} of {totalProducts} products</p>
          {/* // in case no products  */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products available</p>
            </div>
          ) : (
            <>
              

<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard 
      key={product.id}
      product={product}
      onAddToCart={addToCart}
      isAdding={addingToCart}
    />
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
      <Footer />
    </>
  );
};