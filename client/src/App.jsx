import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AllProducts from "./pages/AllProducts";
import SpecialProducts from "./pages/SpecialProducts";
import SingleProduce from "./pages/SingleProduce";
import Cart from "./pages/Cart";
import UserInfo from "./pages/UserInfo";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import AddBrand from "./pages/dashboard/AddBrand";
import DashboardBrand from "./pages/dashboard/DashboardBrand";
import Signup from "./pages/Signup";
import Customers from "./pages/dashboard/Customers";
import OrderData from "./pages/order/OrderData";
import Coupons from './pages/dashboard/Coupons';
import Success from "./pages/Success";
import Profile from "./pages/Profile";
import Orders from "./pages/dashboard/Orders";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AddProduct from "./pages/dashboard/AddProduct";
import { ToastContainer } from "react-toastify";
import NotFound from './pages/NotFount';
import Brands from "./pages/Brands";
import Offer from "./pages/dashboard/Offer";
import PaymentStatus from "./pages/PaymentStatus";

// Create a layout wrapper component
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || location.pathname.startsWith("/login") || location.pathname.startsWith("/signup")
  
  return (
    <>
      {!isDashboardRoute && <div className="h-fit"><Header /></div>}
      {children}
      {!isDashboardRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:id" element={<SingleProduce />} />
            <Route path="/special-products" element={<SpecialProducts />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/success" element={<Success />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order/:id" element={<OrderData/>} />
            <Route path="/brands" element={<Brands/>} />
            <Route path="/payment-status/:id" element={<PaymentStatus />} />
            
            {/* Dashboard Routes - No Header/Footer */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="products" element={<DashboardProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="brands" element={<DashboardBrand />} />
              <Route path="brands/add" element={<AddBrand />} />
              <Route path="orders" element={<Orders />} />
              <Route path="offers" element={<Offer />} />
              <Route path="customer" element={<Customers />} />
              <Route path="coupon" element={<Coupons />} />
            </Route>
            
            {/* 404 Page - Catch all unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
        <div className="w-full relative overflow-hidden">
          <ToastContainer position="top-left" autoClose={5000} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;