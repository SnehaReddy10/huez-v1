import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import PaymentStatus from './components/checkout/PaymentStatus';
import OrderConfirmation from './components/checkout/OrderConfirmation';
import CheckoutPage from './components/checkout/CheckoutPage';
import PastOrders from './components/order/PastOrders';

function App() {
  const { pathname } = useLocation();
  const [showApp, setShowApp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowApp(true);
        document.body.style.overflow = 'auto';
      }, 500);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={!showApp ? 'overflow-hidden h-screen' : ''}>
      <div
        className={`max-sm:px-6 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          zIndex: 100,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          muted
          className="w-42 h-42 transition-transform duration-500"
          style={{ transform: isTransitioning ? 'scale(1.2)' : 'scale(1)' }}
        >
          <source src="/videos/HUEZ.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Main content */}
      <div
        className={`flex flex-col selection:bg-orange-500 min-h-screen transition-all duration-500 ${
          showApp ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {pathname !== '/checkout' &&
          pathname !== '/login' &&
          pathname !== '/register' && (
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
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/return" element={<PaymentStatus />} />
            <Route path="/past-orders" element={<PastOrders />} />
          </Routes>

          {pathname !== '/login' &&
            pathname !== '/register' &&
            pathname !== '/menu' && <Footer />}
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
