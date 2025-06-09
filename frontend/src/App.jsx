import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/auth/LoginPage";
import Register from "../src/pages/auth/RegisterPage";
import Home from "./pages/customer/HomePage";
import OtpRegisterPage from "./pages/auth/OtpRegisterPage";
import ArtisanDashboard from "./pages/artisan/ArtisanDashboard";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import ProductList from "./pages/customer/ProductList";
import ProductDetail from "./pages/customer/ProductDetail";
import Cart from '../src/pages/customer/Cart'
import Checkout from "./pages/customer/Checkout";
import RazorpayPayment from "./pages/customer/RazorpayPayment";


import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-register" element={<OtpRegisterPage />} />
        <Route path="/artisan/dashboard" element={<ArtisanDashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pay" element={<RazorpayPayment />} />
      </Routes>
      <ToastContainer position="top-right" />

    {/* <Footer /> */}



    </CartProvider>
  );
}

export default App;
