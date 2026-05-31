import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../Api/client';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  // Load cart data
  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/cart');
      setCart(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load cart. Please try again.');
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Update item quantity
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    
    setUpdatingItemId(itemId);
    try {
      await apiClient.put(`/cart/items/${itemId}`, { quantity: newQuantity });
      await loadCart(); // Refresh cart after update
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update quantity');
      console.error('Error updating quantity:', err);
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Remove item from cart
  const removeItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;
    
    setUpdatingItemId(itemId);
    try {
      await apiClient.delete(`/cart/items/${itemId}`);
      await loadCart(); // Refresh cart after removal
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove item');
      console.error('Error removing item:', err);
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Process checkout
  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      await apiClient.post('/cart/checkout');
      alert('🎉 Order placed successfully! Thank you for shopping with us.');
      navigate('/orders'); // Redirect to orders page
    } catch (err) {
      alert(err.response?.data?.message || 'Checkout failed. Please try again.');
      console.error('Error during checkout:', err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Loading state
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

  // Error state
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

  // Empty cart state
  if (!cart || !cart.items || cart.items.length === 0) {
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

  // Calculate totals
  const subtotal = cart.totalPrice || 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-600">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <div key={item.cartItemId} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800">
                            {item.productName}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1">
                            In stock • Free delivery
                          </p>
                        </div>
                        
                        {/* Price */}
                        <div className="md:w-32 text-left md:text-center">
                          <span className="text-gray-600">${item.unitPrice.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:w-32">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              disabled={updatingItemId === item.cartItemId}
                              className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-medium">
                              {updatingItemId === item.cartItemId ? '...' : item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              disabled={updatingItemId === item.cartItemId}
                              className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Subtotal & Actions */}
                        <div className="md:w-32 text-right">
                          <div className="font-semibold text-gray-800">
                            ${(item.unitPrice * item.quantity).toFixed(2)}
                          </div>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            disabled={updatingItemId === item.cartItemId}
                            className="text-sm text-red-500 hover:text-red-700 mt-1 disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Continue Shopping Link */}
              <button
                onClick={() => navigate('/products')}
                className="mt-6 text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
              >
                ← Continue Shopping
              </button>
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
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
                
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  
                  {/* Payment methods placeholder */}
                  <div className="flex justify-center gap-4 py-2">
                    <span className="text-xs text-gray-500">Secure checkout</span>
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-400">Visa</span>
                      <span className="text-xs text-gray-400">Mastercard</span>
                      <span className="text-xs text-gray-400">PayPal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}