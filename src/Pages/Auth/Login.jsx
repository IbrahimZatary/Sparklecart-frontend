import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../../Api/client';
import charImage from "../../assets/char.png";

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
      
      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user', JSON.stringify({ email: response.email }));
        localStorage.setItem('userId', response.userId);
        
        console.log('Login successful!');
        navigate('/');  
      } else {
        setError('Login failed: No token received');
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

          <div className="mt-6 text-center text-gray-400 text-sm">
            No account yet?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer">
              Sign up
            </Link>
          </div>
        </div>

        <div className="w-full md:w-[70%] relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8 md:p-12">
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