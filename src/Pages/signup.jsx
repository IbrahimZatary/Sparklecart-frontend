import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../Api/client';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      await apiClient.post('/auth/register', {
        name: `${formData.firstName} ${formData.lastName}`,
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 font-medium mb-1 text-xs">First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  className="w-full px-3 py-1.5 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-700/50 text-white placeholder-gray-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-1 text-xs">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  className="w-full px-3 py-1.5 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-700/50 text-white placeholder-gray-400 text-sm"
                />
              </div>
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

            <ul className="space-y-0.5 text-xs text-gray-400 mt-1 ml-2">
              <li className="flex items-center gap-1">• At least 8 characters long</li>
              <li className="flex items-center gap-1">• Contains at least one uppercase letter (A-Z)</li>
              <li className="flex items-center gap-1">• Contains at least one number (0-9)</li>
              <li className="flex items-center gap-1">• Contains at least one special character (!@#$%^&*)</li>
            </ul>

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

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-3 text-gray-400 text-xs">or sign in with</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <div className="flex justify-center gap-3">
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-[#DB4437]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
            </button>
          </div>

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