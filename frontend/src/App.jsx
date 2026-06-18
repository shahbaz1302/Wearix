import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import toast, { Toaster } from 'react-hot-toast';
import Verify from "./pages/Verify"
import VerifyEmail from "./pages/VerifyEmail"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import Profile from "./pages/Profile"
import { useAuthStore } from "./context/authStore"
import { useEffect } from "react"
import EditProfile from "./pages/EditProfile"
import ChangePassword from "./pages/ChangePassword"
import SetPassword from "./pages/SetPassword"
import Wishlist from "./pages/WishList"

const App = () => {
  const location = useLocation()
  const paths = ["verify-email", "forgot-password", "reset-password"]
  const hideLayout = paths.some(path => location.pathname.includes(path))
  const accountPages = ["/profile", "/orders", "/wishlist"];

  const showAccountSidebar = accountPages.some(path =>
    location.pathname.includes(path)
  );
  const { checkAuth } = useAuthStore();

  return <>
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Toaster />
      {!hideLayout && <Navbar />}
      {showAccountSidebar &&
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          <SideBar />
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/set-password" element={<SetPassword />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  </>
}

export default App
