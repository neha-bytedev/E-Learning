import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <nav className={`sticky top-0 z-50 ${isCourseListPage ? "bg-white" : "bg-indigo-50/90"} backdrop-blur-sm border-b border-indigo-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center cursor-pointer"
          >
            <img 
              src={assets.logo1} 
              alt="EduConnect Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              EduConnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 text-gray-700">
              {user && (
                <>
                  <button 
                    onClick={() => navigate('/educator')}
                    className="hover:text-purple-600 transition-colors font-medium"
                  >
                    {isEducator ? 'Educator Dashboard' : 'Become Educator'}
                  </button>
                  <Link 
                    to="/my-enrollments" 
                    className="hover:text-purple-600 transition-colors font-medium"
                  >
                    My Enrollments
                  </Link>
                </>
              )}
            </div>
            
            {user ? (
              <UserButton appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                  userButtonPopoverCard: "shadow-lg border border-indigo-100"
                }
              }} />
            ) : (
              <button
                onClick={() => openSignIn()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-1.5 rounded-full text-sm font-medium hover:shadow-md transition-all"
              >
                Create Account
              </button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
              <>
                <button 
                  onClick={() => navigate('/educator')}
                  className="text-xs text-gray-700 hover:text-purple-600"
                >
                  {isEducator ? 'Dashboard' : 'Educator'}
                </button>
                <Link 
                  to="/my-enrollments" 
                  className="text-xs text-gray-700 hover:text-purple-600"
                >
                  Enrollments
                </Link>
              </>
            )}
            {user ? (
              <UserButton appearance={{
                elements: {
                  userButtonAvatarBox: "h-7 w-7"
                }
              }} />
            ) : (
              <button 
                onClick={() => openSignIn()}
                className="text-gray-700 hover:text-purple-600"
              >
                <img src={assets.user_icon} alt="User icon" className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;