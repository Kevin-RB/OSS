import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full rounded-lg p-6">{children}</div>
      </main>

      {/* <Footer /> */}
      <footer className="text-center text-sm text-gray-500 py-4">
        &copy; 2025 Gahokef
      </footer>
    </div>
  );
};

export default Layout;
