import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Product from "./pages/Product";
import { ProtectedRoute } from "./components/protected-route";
import { roles } from "./utils/roles";
import { ProductDetail } from "./pages/product-detail";
import { ProductAdmin } from "./pages/product-admin";
import { ProductEdit } from "./components/product-edit";
import { ProductCreate } from "./components/product-create";
import { Cart } from "./pages/cart";
import { Checkout } from "./pages/checkout";
import { OrderAdminPannel } from "./components/order-management";
import { OrderUpdate } from "./components/order-update";
import { UserAdminPannel } from "./components/user-management";
import { AuthLayout } from "./components/layout/authLayout";
import { LayoutWrapper } from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to={"/login"} />} />

        {/* Auth routes - outside of main Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<p>Unauthorized access!</p>} />
        </Route>

        {/* Protected routes - with main Layout */}
        <Route element={<LayoutWrapper />}>
          <Route
            element={
              <ProtectedRoute allowedRoles={[roles.user, roles.admin]} />
            }
          >
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/checkout" element={<Checkout />} />
            <Route element={<ProtectedRoute allowedRoles={[roles.admin]} />}>
              <Route path="/product/admin" element={<ProductAdmin />} />
              <Route
                path="/product/admin/create-product"
                element={<ProductCreate />}
              />
              <Route path="/product/admin/update" element={<ProductEdit />} />
              <Route path="/order-management" element={<OrderAdminPannel />} />
              <Route path="/order-management/:id" element={<OrderUpdate />} />
              <Route path="/user-management" element={<UserAdminPannel />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[roles.user]} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
