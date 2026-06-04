import { useState } from 'react';

export default function OrderCard({ order, getStatusColor }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 bg-white">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs text-gray-500">Order #</span>
            <span className="font-mono text-sm text-gray-900 ml-1">{order.id}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500">Date</span>
            <span className="text-sm text-gray-700 ml-1">
              {new Date(order.orderDate).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900">
              ${order.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {expanded ? '− Hide' : '+ View'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <h3 className="font-medium text-gray-800 text-sm mb-3">Items</h3>

          {order.items && order.items.length > 0 ? (
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <div>
                    <p className="text-sm text-gray-800">{item.productName}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">
                      ${(item.subtotal || (item.unitPrice * item.quantity)).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">${item.unitPrice.toFixed(2)} ea</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Order total: ${order.price}</p>
          )}

          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-base font-bold text-gray-900">${order.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">Shipping</p>
            <p className="text-sm text-gray-700">{order.shippingAddress || 'Default Address'}</p>
            <p className="text-xs text-gray-500 mt-1">Payment: {order.paymentMethod || 'Credit Card'}</p>
          </div>
        </div>
      )}
    </div>
  );
}