import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../../context/AppContext"
import CourseCard from "./CourseCard"

const CourseSection = () => {
  const { allCourses } = useContext(AppContext)
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Learn from the <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Best</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses deliver real results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {allCourses.slice(0,4).map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/course-list" 
            onClick={() => window.scrollTo(0,0)}
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all duration-300"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CourseSection