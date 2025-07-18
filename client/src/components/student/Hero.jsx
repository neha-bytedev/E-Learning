import { assets } from "../../assets/assets"
import SearchBar from "./SearchBar"

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-40 pt-24 px-7 md:px-0 space-y-8 text-center bg-gradient-to-br from-indigo-50 via-purple-50 to-white  " >

      <div className="relative max-w-3xl mx-auto">
        <h1 className="text-[32px] leading-[38px] md:text-[48px] md:leading-[52px] font-bold text-gray-900 text-center">
          Empower your Future with courses <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">tailored for you</span>
        </h1>
        <img 
          src={assets.sketch} 
          alt="sketch"  
          className="md:block hidden absolute -bottom-4 right-24 w-60 transform rotate-[-5deg]" 
        />
      </div>

      <p className="md:block hidden text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
        Join our community of learners with world-class instructors, interactive content, and a supportive environment to help you reach your goals.
      </p>

      <p className="md:hidden text-gray-600 max-w-sm mx-auto leading-relaxed">
        Join our community of learners with world-class instructors and interactive content.
      </p>

      <div className="w-full max-w-2xl">
        <SearchBar/>
      </div>
      
      <div className="hidden md:flex gap-4 pt-4">
        <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">5,000+ Courses</span>
        <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">Expert Instructors</span>
        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">Interactive Learning</span>
      </div>
    </div>
  )
}

export default Hero