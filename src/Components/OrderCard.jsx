import { useState } from 'react';

export default function OrderCard({ order, getStatusColor }) {
  const [expanded, setExpanded] = useState(false);

  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b bg-gray-50">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-sm text-gray-500">Order #</span>
            <span className="font-mono font-semibold text-gray-800 ml-2">{order.id}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Date:</span>
            <span className="text-gray-700 ml-2">
              {new Date(order.orderDate).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Total:</span>
            <span className="text-xl font-bold text-indigo-600 ml-2">
              ${order.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            {expanded ? 'Hide Details ▲' : 'View Details ▼'}
          </button>
        </div>
      </div>

      {expanded && (
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
                    <p className="text-sm text-gray-500">${item.unitPrice.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p className="text-sm mt-1">Order total: ${order.price}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${order.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                  <span>Total:</span>
                  <span>${order.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-gray-700 mb-2">Shipping Information</h4>
            <p className="text-gray-600">{order.shippingAddress || 'Default Address'}</p>
            <p className="text-gray-600 mt-1">Payment Method: {order.paymentMethod || 'Credit Card'}</p>
          </div>
        </div>
      )}
    </div>
  );
}