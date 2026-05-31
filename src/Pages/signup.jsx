import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../Api/client';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Note: '/auth/sign-up' not '/auth/register'
      await apiClient.post('/auth/sign-up', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
        <div className="w-full p-6 md:p-8 flex flex-col justify-center bg-gray-800/90 rounded-2xl">
          
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-gray-400 mt-1 text-xs">
              Join SparkleCart today and start your sparkling journey!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div>
              <label className="block text-gray-300 font-medium mb-1 text-xs">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                required
                className="w-full px-3 py-1.5 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-700/50 text-white placeholder-gray-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1 text-xs">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-1.5 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-700/50 text-white placeholder-gray-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1 text-xs">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                required 
                className="w-full px-3 py-1.5 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-700/50 text-white placeholder-gray-400 text-sm"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-3 py-1.5 rounded-lg text-xs">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1.5 rounded-md transition duration-200 cursor-pointer text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 text-center text-gray-400 text-xs">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}