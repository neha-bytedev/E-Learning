import { assets } from "../../assets/assets"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 w-full mt-20">
      <div className="container mx-auto px-8 md:px-36 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center">
              <img src={assets.logo1} alt="logo" className="h-8" />
              <span className="ml-2 text-xl font-bold text-white">
                EduConnect
              </span>
            </div>
            <p className="mt-6 text-center md:text-left text-gray-400 leading-relaxed max-w-xs">
              Empowering learners with high-quality education and innovative learning solutions.
            </p>
            <div className="flex gap-4 mt-6">
              {[assets.facebook_icon, assets.twitter_icon,  assets.instagram_icon].map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="bg-gray-700 hover:bg-purple-600 p-2 rounded-full transition-all duration-300"
                >
                  <img src={social} alt="social icon" className="h-7 w-7" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Column */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-bold text-white text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-purple-500">
              Quick Links
            </h2>
            <ul className="space-y-3 text-gray-400">
              {['Home', 'Courses', 'About Us', 'Contact', 'Privacy Policy', 'Careers'].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-bold text-white text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-purple-500">
              Newsletter
            </h2>
            <p className="text-gray-400 mb-4 text-center md:text-left">
              Get the latest updates, courses and learning resources.
            </p> 
            <div className="w-full max-w-xs">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="border border-gray-700 bg-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none w-full h-12 rounded-lg px-4 text-gray-200 placeholder-gray-500 transition-all" 
                />
                <button className="absolute right-1 top-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-10 px-4 text-white rounded-lg transition-all font-medium text-sm">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-8 md:px-36">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <div>
              © {new Date().getFullYear()} EduConnect. All rights reserved.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer