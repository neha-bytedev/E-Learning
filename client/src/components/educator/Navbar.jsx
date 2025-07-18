import { assets } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { user } = useUser()

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with gradient text */}
          <Link to="/" className="flex items-center">
            <img 
              src={assets.logo1} 
              alt="EduConnect Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              EduConnect
            </span>
          </Link>

          {/* User section */}
          <div className="flex items-center gap-4">
            <p className="text-gray-700 font-medium">
              Hi! {user ? user.fullName : 'Developers'}
            </p>
            
            {user ? (
              <UserButton appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                  userButtonPopoverCard: "shadow-lg border border-indigo-100"
                }
              }} />
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <img 
                  src={assets.profile_img} 
                  alt="Profile" 
                  className="h-6 w-6 object-contain" 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar