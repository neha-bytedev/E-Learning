import { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import { assets } from "../../assets/assets"
import { Link } from "react-router-dom"

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext)
  const discountedPrice = course.coursePrice - (course.discount * course.coursePrice / 100)
  const rating = calculateRating(course)
  const reviewCount = Array.isArray(course.courseRatings) ? course.courseRatings.length : 0

  return (
    <Link 
      to={`/course/${course._id}`} 
      onClick={() => window.scrollTo(0,0)}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative overflow-hidden">
        <img 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
          src={course.courseThumbnail} 
          alt={course.courseTitle} 
        />
        {course.discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {course.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{course.courseTitle}</h3>
        <p className="text-indigo-600 text-sm font-medium mb-3">Tech2Skill</p>

        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            <span className="text-yellow-500 font-bold mr-1">{rating}</span>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-500 text-sm">({reviewCount})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {course.discount > 0 ? (
              <>
                <span className="text-gray-900 font-bold text-lg">${discountedPrice.toFixed(2)}</span>
                <span className="text-gray-400 text-sm line-through ml-2">${course.coursePrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-lg">${course.coursePrice.toFixed(2)}</span>
            )}
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Enroll Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard