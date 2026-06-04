import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import OrderCard from '../components/OrderCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../Components/ErrorDisplay';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/order');
      console.log('Orders loaded:', data);

      setOrders(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      
      console.error('load error:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/signin');
      return;
    }
    loadOrders();
  }, [navigate,token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
        <LoadingSpinner/>
      
    );
  };

  if (error) 
    return <ErrorDisplay error={error} onRetry={loadOrders} />;
  

  const currentUserId = parseInt(localStorage.getItem('userId'));
  const userOrders = orders.filter(order => order && order.userId === currentUserId);


  if (userOrders.length === 0) {
    return (// go for product to shop
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center py-12 bg-white rounded-lg shadow max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Start Shopping
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
          
          <div className="space-y-6">
            {userOrders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
