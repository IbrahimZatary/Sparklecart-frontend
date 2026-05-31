import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/signin');
      return;
    }
    loadCart();
  }, [userId]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get(`/cart/${userId}`);
      console.log('Cart data received:', data);
      setCart(data);
      setError('');
    } catch (err) {
      console.error('Cart load error:', err);
      setError('Failed to load cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return; // Don't allow quantity below 1 (no remove)
    
    setUpdatingId(itemId);
    try {
      await apiClient.put('/cart/quantity', { 
        cartItemId: itemId,
        quantityRequired: newQuantity 
      });
      await loadCart();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update quantity');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      await apiClient.post('/cart/checkout', {
        userId: parseInt(userId),
        paymentMethod: 'Credit Card',
        shippingAddress: 'Default Address'
      });
      alert('Order placed successfully! Thank you for shopping with us.');
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="text-xl text-gray-600">Loading your cart...</div>
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
              onClick={loadCart}
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

  if (!cart?.items || cart.items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">🛒</div>
          <div className="text-2xl text-gray-600 mb-4">Your cart is empty</div>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = cart.totalPrice || cart.items.reduce((sum, item) => sum + (item.subtotal || (item.quantity * (item.unitPrice || item.productPrice || 0))), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-600">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => {
                    const itemId = item.id;
                    const unitPrice = item.unitPrice || item.productPrice || 0;
                    const subtotalItem = item.subtotal || (unitPrice * item.quantity);
                    
                    return (
                      <div key={itemId} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-800">
                              {item.productName}
                            </h3>
                            <p className="text-gray-500 text-sm">In stock</p>
                          </div>
                          
                          <div className="md:w-32 text-left md:text-center">
                            <span className="text-gray-600">${unitPrice.toFixed(2)}</span>
                          </div>
                          
                          <div className="md:w-32">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(itemId, item.quantity, -1)}
                                disabled={updatingId === itemId}
                                className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                              >
                                -
                              </button>
                              <span className="w-12 text-center font-medium">
                                {updatingId === itemId ? '...' : item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(itemId, item.quantity, 1)}
                                disabled={updatingId === itemId}
                                className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div className="md:w-32 text-right">
                            <div className="font-semibold text-gray-800">
                              ${subtotalItem.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <button
                onClick={() => navigate('/products')}
                className="mt-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
              >
                 Continue Shopping
              </button>
            </div>

            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-3 border-b pb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-xl font-bold mt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
                
                {/* Payment methods note */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure checkout • Free returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}