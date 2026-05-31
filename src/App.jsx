import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/signup';
import Products from './Pages/Products';
import ProductTest from "./Api/product"
import Cart from './Pages/Cart';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;