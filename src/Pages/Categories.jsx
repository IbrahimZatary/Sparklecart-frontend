import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '../Api/client';

import Navbar from '../Components/Navbar';

import Footer from '../Components/Footer';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {

      navigate('/signin');

      return;
    }
    loadCategories();

  }, [token, navigate]);


  const loadCategories = async () => {
    setLoading(true);

    try {
      const categoriesRes = await apiClient.get('/category');
      setCategories(categoriesRes);

      setError('');

    } catch (err) {
      setError('Failed to load categories.');
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {

    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">

          <div className="flex flex-col items-center gap-4">

            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            <div className="text-xl text-gray-600">Loading categories...</div>
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

            <div className="text-xl text-red-500 mb-4">{error}</div>
            <button 

              onClick={loadCategories}

              className="bg-gray-900 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">

        <div className="container mx-auto px-4">

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Select By Category</h1>

          <p className="text-gray-500 mb-8">Click on any category to view products</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 

                key={category.categoryID || category.id}

                onClick={() => navigate(`/category/${category.categoryID || category.id}`)}

                className="bg-white rounded-xl shadow-md p-8 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 text-center"
              >
                <div className="text-5xl mb-4">

                  {!['Electronics', 'Clothing', 'Books', 'Home', 'Sports'].includes(category.name) && ''}
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h2>




                <p className="text-gray-500 text-sm">Browse products →</p>
              </div>
            ))}
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}