import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { roles } from '../utils/roles';
import { Button } from "../components/ui/button"
import { useToast } from '../context/toastContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogout = () => {
    logout();
    addToast({
      title: "Success",
      description: "Successfully logged out.",
      variant: "success",
      duration: 3000,
    });
    navigate('/login');
  };

  const rolesForAdminRoutes = [roles.admin];
  const isAdmin = user?.roles.some((role) => rolesForAdminRoutes.includes(role));

  return (
    <header className="w-full border-b bg-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {user ? (
          <>
            <Link to="/product" className="text-xl font-bold text-black">
              Gahokef
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="text-xl font-bold text-black">
              Gahokef
            </Link>
          </>
        )}

        <nav className="flex items-center space-x-4 text-sm">
          {user ? (
            <>
              {isAdmin && (
                <>
                  <Link to="/user-management" className="hover:underline">
                    Users
                  </Link>
                  <Link to="/order-management" className="hover:underline">
                    Orders
                  </Link>
                </>
              )}
              <Link to="/product" className="hover:underline">
                Products
              </Link>
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register">
                <Button variant="default">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
