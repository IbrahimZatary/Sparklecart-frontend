import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../Api/client';
import charImage from '../assets/char.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({ email: response.email }));
        navigate('/products');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        
        <div className="w-full md:w-[30%] p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-gray-800/90">
          
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back!</h1>
            <p className="text-gray-400 mt-2 leading-relaxed text-sm">
              We are so happy to have you here. It's great to see you again.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1 text-sm">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-700/50 text-white placeholder-gray-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-1 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required 
                className="w-full px-3 py-2 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-gray-700/50 text-white placeholder-gray-400 text-sm"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-4 text-gray-400 text-xs font-medium">or sign in with</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <div className="flex justify-center gap-4">
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-[#DB4437]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
            </button>
            <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
              </svg>
            </button>
          </div>

          <div className="mt-6 text-center text-gray-400 text-sm">
            No account yet?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer">
              Sign up
            </Link>
          </div>
        </div>

        <div className="w-full md:w-[70%] relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8 md:p-12">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
            <img 
              src={charImage} 
              alt="Character" 
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
            />
            <div className="mt-6">
              <h2 className="text-3xl font-bold mb-2 drop-shadow-md">SparkleCart</h2>
              <p className="text-gray-300 text-md max-w-sm">
                Your one-stop destination for dazzling deals and sparkling surprises.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

}