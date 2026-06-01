import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/signin');
      return;
    }
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/order');
      console.log('Orders loaded:', data);
      setOrders(data);
      setError('');

    } catch (err) {
      console.error('Orders load error:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'processing':
//         return 'bg-blue-100 text-blue-800';
//       case 'shipped':
//         return 'bg-purple-100 text-purple-800';
//       case 'delivered':
//         return 'bg-green-100 text-green-800';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="text-xl text-gray-600">Loading your orders...</div>
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
            <div className="text-6xl mb-4"></div>
            <div className="text-xl text-red-500 mb-4">{error}</div>
            <button 
              onClick={loadOrders}
              className="bg-black hover:bg-white text-black px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const userOrders = orders.filter(order => order.userId === parseInt(localStorage.getItem('userId')));

  if (userOrders.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center py-12 bg-white rounded-lg shadow max-w-md mx-auto">
            <div className="text-6xl mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>


            <button 
              onClick={() => navigate('/products')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
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
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Order </span>
                      <span className="font-mono font-semibold text-gray-800 ml-2">
                        {order.id}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Date:</span>
                      <span className="text-gray-700 ml-2">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status }
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Total:</span>
                      <span className="text-xl font-bold text-indigo-600 ml-2">
                        ${(order.price || 0).toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      {expandedOrder === order.id ? 'Hide Details ' : 'View Details '}
                    </button>
                  </div>
                </div>
                
                {expandedOrder === order.id && (
                  <div className="p-6 border-t">
                    <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
                    
                    {order.items && order.items.length > 0 ? (
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                            <div>
                              <p className="font-medium text-gray-800">{item.productName}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">
                                ${(item.subtotal || (item.unitPrice * item.quantity)).toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">
                                ${(item.unitPrice ).toFixed(2)} each
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <p>No items found for this order.</p>
                        <p className="text-sm mt-1">Order total: ${order.price}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-end">

                        <div className="w-64 space-y-2">
                          <div className="flex justify-between text-gray-600">
                            <span>Subtotal:</span>
                            <span>${(order.price || 0).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-gray-600">
                            <span>Shipping:</span>
                            <span>Free</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                            <span>Total:</span>
                            <span>${(order.price || 0).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-gray-700 mb-2">Shipping Information</h4>
                      <p className="text-gray-600">
                        {order.shippingAddress }
                      </p>
                      <p className="text-gray-600 mt-1">
                        Payment Method: {order.paymentMethod }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}