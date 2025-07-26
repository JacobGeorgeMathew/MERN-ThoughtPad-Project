import { Link } from "react-router";
import { PlusIcon, User, LogOut, Menu, X } from "lucide-react";
import { useUser } from "../Context/UserContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  console.log(user);
  
  const handleLogout = () => {
    logout();
    // You might want to call a logout API endpoint here
    window.location.href = '/signin';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl sm:text-3xl font-bold text-primary font-mono tracking-tight">
            ThoughtPad
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
            
            {/* User Info and Logout */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-base-content">
                  <User className="size-4" />
                  <span className="font-medium">{user.fullName}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn btn-ghost btn-sm"
                  title="Logout"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden btn btn-ghost btn-sm"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-base-content/10">
            <div className="flex flex-col gap-3">
              <Link 
                to={"/create"} 
                className="btn btn-primary w-full"
                onClick={closeMobileMenu}
              >
                <PlusIcon className="size-5" />
                <span>New Note</span>
              </Link>
              
              {/* Mobile User Info and Logout */}
              {user && (
                <>
                  <div className="flex items-center justify-center gap-2 text-base-content py-2">
                    <User className="size-4" />
                    <span className="font-medium">{user.fullName}</span>
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="btn btn-ghost w-full"
                  >
                    <LogOut className="size-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;