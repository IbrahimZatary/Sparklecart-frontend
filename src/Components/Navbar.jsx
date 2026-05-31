import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 
          onClick={() => navigate('/')} 
          className="text-xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
        >
          SparkleCart
        </h1>
        
        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <button 
            onClick={() => navigate('/products')} 
            className="cursor-pointer hover:text-indigo-600 transition-colors"
          >
            Products
          </button>
          <button 
            onClick={() => navigate('/inventory')} 
            className="cursor-pointer hover:text-indigo-600 transition-colors"
            >
            Inventory
            </button>
          <button 
            onClick={() => navigate('/cart')} 
            className="cursor-pointer hover:text-indigo-600 transition-colors"
          >
            Cart
          </button>
          <button 
            onClick={() => navigate('/orders')} 
            className="cursor-pointer hover:text-indigo-600 transition-colors"
            >
            Orders
            </button>
          {token ? (
            <button 
              onClick={handleLogout} 
              className="cursor-pointer text-red-600 hover:text-red-800 transition-colors"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => navigate('/signin')}
                className="cursor-pointer text-black     hover:text-black transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="cursor-pointer bg-black text-white px-5 py-2 rounded-lg hover:bg-white hover:text-black border border-black transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}