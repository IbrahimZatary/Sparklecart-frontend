import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/signup';
import ProductTest from "./Api/product"
import Products from './Pages/Products';
import Cart from './Pages/Cart'; 
import Inventory from './Pages/Inventory';

import Categories from './Pages/Categories'; 


import Orders from './Pages/Orders';


function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/test" element={<ProductTest/>} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/products" 
          element={token ? <Products /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/cart" 
          element={token ? <Cart /> : <Navigate to="/signin" />} 
        />
        <Route 
        path="/inventory" 
         element={token ? <Inventory /> : <Navigate to="/signin" />} 
        />
        <Route 
          path="/orders" 
          element={token ? <Orders /> : <Navigate to="/signin" />} 
        /> 
        <Route 
        path="/categories" 
        element={token ? <Categories /> : <Navigate to="/signin" />} 
      />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;