import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import OrderHistory from "./Pages/OrderHistory";
import OrderDetails from "./Pages/OrderDetails";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Layout from "./Components/Layout";
import AdminLayout from "./Components/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";
import School from "./Pages/Admin/School";
import AdminProduct from "./Pages/Admin/AdminProduct";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/Admin";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import PaymentPage from "./Pages/Payment/PaymentPage";

import Checkout from "./Pages/Checkout";
import OrderSummary from "./Pages/OrderSummary";
import AdminOrders from "./Pages/Admin/AdminOrders";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
             {/*Customer*/}

            {/*<Route
              path="/customer"
              element={
                <ProtectedRoute>
                <CustomerDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Products/>} />
              <Route path="/customer/profile" element={<Profile />} />
              <Route path="/customer/order-history" element={<OrderHistory />} />
            <Route path="/customer/order-details/:id" element={<OrderDetails />} />
            </Route>*/}
             {/*Customer*/}
            <Route
              path="/user"
              element={
                <ProtectedRoute role="user">
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/user/products" element={<Products/>} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/cart" element={<Cart />} />
              <Route path="/user/checkout" element={<Checkout />} />
              <Route path="/user/payment" element={<PaymentPage />} />

              
              <Route path="/user/order-history" element={<OrderHistory />} />
              <Route path="/user/order-summary/:id" element={<OrderSummary />} />
            <Route path="/user/order-details/:id" element={<OrderDetails />} />
              
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="/admin/schools" element={<School />} />
              <Route path="/admin/products" element={<AdminProduct />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
