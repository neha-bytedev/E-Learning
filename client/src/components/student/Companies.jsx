import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    
    <div className="py-16 bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with decorative element */}
        <div className="text-center mb-12 relative">
          <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-indigo-600 uppercase">
            Trusted by learners at
          </span>
          <h3 className="text-3xl font-bold text-gray-900">
            Leading Companies Worldwide
          </h3>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"></div>
        </div>

        {/* Colorful logos grid with hover effects */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center justify-center">
          {[
            { src: assets.microsoft_logo, alt: "Microsoft" },
            { src: assets.walmart_logo, alt: "Walmart" },
            { src: assets.accenture_logo, alt: "Accenture" },
            { src: assets.adobe_logo, alt: "Adobe" },
            { src: assets.paypal_logo, alt: "PayPal" }
          ].map((company, index) => (
            <div 
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:scale-105"
            >
              <img
                src={company.src}
                alt={company.alt}
                className="h-12 object-contain opacity-90 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Stats with gradient text */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join over <span className="font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">50,000+ learners</span> from top companies who have transformed their careers with our courses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Companies;