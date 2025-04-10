import { Route, Routes, useLocation } from 'react-router-dom';
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
import Search from './components/Search';
import ErrorBoundary from './components/ErrorBoundary';
import CheckoutForm from './components/checkout/CheckoutForm';
import PaymentStatus from './components/checkout/PaymentStatus';
import OrderConfirmation from './components/checkout/OrderConfirmation';

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex flex-col selection:bg-orange-500 h-screen max-w-screen justify-between">
        {pathname !== '/checkout' && (
          <div className="hidden md:flex flex-col">
            <Navbar />
          </div>
        )}
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product" element={<Product />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/search" element={<Search />} />
            <Route path="/order-confirmed" element={<OrderConfirmation />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/return" element={<PaymentStatus />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
          </Routes>

          {pathname !== '/login' &&
            pathname !== '/register' &&
            pathname !== '/menu' && <Footer />}
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
