const { Outlet } = require("react-router-dom");

// Simple layout for login/register pages
export const AuthLayout = () => {
  return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-1 flex justify-center items-center px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-md rounded-lg p-6">
            <Outlet />
          </div>
        </main>
        <footer className="text-center text-sm text-gray-500 py-4">
          &copy; 2025 Gahokef
        </footer>
      </div>
  );
};
