import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { roles } from '../utils/roles';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const rolesForAdminRoutes = [roles.admin];
  const isAdmin = user?.roles.some((role) => rolesForAdminRoutes.includes(role));

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Awsome store! 👽</Link>
      <div>
        {user ? (
          <>
            {/* Admin links */}
            {isAdmin && (
              <>
                <Link to="/user-management" className="mr-4">User management</Link>
                <Link to="/order-management" className="mr-4">Order management</Link>
              </>
            )}
            {/* Regular user links */}
            <Link to="/product" className="mr-4">Products</Link>
            <Link to="/cart" className="mr-4">Cart</Link>
            <Link to="/profile" className="mr-4">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
