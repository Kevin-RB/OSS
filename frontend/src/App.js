import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Product from './pages/Product';
import { ProtectedRoute } from './components/protected-route';
import { roles } from './utils/roles';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute allowedRoles={[roles.user, roles.admin]} />}>
          <Route path="/product" element={<Product />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={[roles.user]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/unauthorized" element={<p>Un authorized access!</p>} />
      </Routes>
    </Router>
  );
}

export default App;
