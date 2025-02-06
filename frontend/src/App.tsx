import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Navbar from './components/Navbar';
import Restaurants from './components/Restaurants';
import Register from './components/auth/Register';
import Product from './components/Product';
import Menu from './components/menu/Menu';
import Cart from './components/Cart';
import Footer from './components/common/Footer';
import Offers from './components/home/Offers';

function App() {
  return (
    <div className="flex flex-col selection:bg-orange-500 h-screen max-w-screen">
      <div className="hidden md:flex flex-col">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
