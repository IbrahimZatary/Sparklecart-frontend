import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart, isAdding }) {
  const navigate = useNavigate();

  return (


    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"><div 


        className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer flex items-center justify-center"
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <div className="p-4">

        <h3 
          className="text-lg font-bold text-gray-800 mb-1 cursor-pointer hover:text-gray-600"
          onClick={() => navigate(`/product/${product.id}`)}>

          {product.name}

        </h3>
        <p className="text-gray-500 text-sm mb-2">Stock: {product.quantity}</p>
        <div className="flex justify-between items-center mt-3">

          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>


          <button 
            onClick={() => onAddToCart(product.id)}
            disabled={isAdding === product.id}
            
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
          >
            {isAdding === product.id ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}