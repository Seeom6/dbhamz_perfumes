import { Route, BrowserRouter, Routes } from "react-router-dom";

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
import AddProduct from "./pages/dashboard/AddProduct";
import Dashboard from "./pages/dashboard/Dashboard";

import { ToastContainer } from "react-toastify";
import DashboardProducts from "./pages/dashboard/DashboardProducts";
import AddBrand from "./pages/dashboard/AddBrand";
import DashboardBrand from "./pages/dashboard/DashboardBrand";
import Signup from "./pages/Signup";
import Customers from "./pages/dashboard/Customers";
import OrderData from "./pages/order/OrderData";
import Coupons from './pages/dashboard/Coupons';
import Success from "./pages/Success";

function App() {


  return (
    <div className="">
      <BrowserRouter>
        <Header />
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
          <Route path="/order" element={<OrderData/>} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<AddProduct />} />
            <Route path="/dashboard/products" element={<DashboardProducts />} />
            <Route path="/dashboard/add-brand" element={<AddBrand />} />
            <Route path="/dashboard/add-product" element={<AddProduct />} />
            <Route path="/dashboard/brands" element={<DashboardBrand />} />
            <Route path="/dashboard/customer" element={<Customers />} />
            <Route path="/dashboard/coupon" element={<Coupons />} />
          </Route>
        </Routes>
        <Footer />
        <div className="w-full relative overflow-hidden">
          <ToastContainer position="top-left" autoClose={5000} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
