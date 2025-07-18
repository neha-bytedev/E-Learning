import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { useParams } from "react-router-dom"
import { assets } from "../../assets/assets"
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { calculateChapterTime, enrolledCourses } = useContext(AppContext)
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null)
  const [activeLecture, setActiveLecture] = useState(null)

  const getCourseData = () => {
    const foundCourse = enrolledCourses.find(course => course._id === courseId);
    if (foundCourse) {
      setCourseData(foundCourse);
    }
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleLectureClick = (lecture, chapterIndex, lectureIndex) => {
    setPlayerData({
      ...lecture,
      chapter: chapterIndex + 1,
      lecture: lectureIndex + 1
    });
    setActiveLecture(`${chapterIndex}-${lectureIndex}`);
  };

  useEffect(() => {
    if (enrolledCourses?.length && courseId) {
      getCourseData();
    }
  }, [enrolledCourses, courseId]);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 min-h-screen">
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-3 gap-8 md:px-20 lg:px-36 max-w-7xl mx-auto">
        {/* Left column - Course content */}
        <div className="md:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Course Content
            </h2>

            <div className="space-y-3">
              {courseData && courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-purple-100 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className={`w-4 h-4 transform transition-transform duration-200 ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium text-gray-800">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm text-purple-600">
                      {Array.isArray(chapter.chapterContent)
                        ? chapter.chapterContent.length
                        : 0}{" "}
                      lectures • {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="pl-4 pr-4 py-2 text-gray-700 border-t border-purple-100">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li 
                          key={i} 
                          className={`py-2 px-2 rounded-md transition-colors ${
                            activeLecture === `${index}-${i}` 
                              ? 'bg-purple-50 border-l-4 border-purple-500' 
                              : 'hover:bg-purple-50/50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={activeLecture === `${index}-${i}` ? assets.blue_tick_icon : assets.play_icon}
                              alt="play-icon"
                              className="w-4 h-4 mt-1 flex-shrink-0"
                            />

                            <div className="flex items-center justify-between w-full">
                              <p className="text-sm md:text-base text-gray-800 w-2/3 line-clamp-2">
                                {lecture.lectureTitle}
                              </p>

                              <div className="flex items-center gap-3">
                                {lecture.lectureUrl && (
                                  <button
                                    onClick={() => handleLectureClick(lecture, index, i)}
                                    className="text-purple-600 hover:text-purple-800 text-sm font-medium px-2 py-1 rounded hover:bg-purple-100 transition-colors"
                                  >
                                    Watch
                                  </button>
                                )}
                                <span className="text-xs text-purple-500 whitespace-nowrap">
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60 * 1000,
                                    { units: ["h", "m"], round: true }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
              <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Rate this Course
              </h2>
              <Rating initialRating={0} />
              <button className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md text-sm font-medium">
                Submit Rating
              </button>
            </div>
          </div>
        </div>

        {/* Right column - Video player */}
        <div className="md:col-span-2">
          {playerData ? (
            <div className="space-y-4">
              <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-xl border-2 border-white">
                <YouTube
                  videoId={playerData.lectureUrl.split('/').pop()}
                  className="absolute top-0 left-0 w-full h-full"
                  iframeClassName="w-full h-full"
                />
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        {playerData.chapter}.{playerData.lecture}
                      </span> {playerData.lectureTitle}
                    </h3>
                    <p className="text-sm text-purple-500 mt-1">
                      Chapter {playerData.chapter} • Lecture {playerData.lecture}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md text-sm font-medium">
                    {false ? 'Completed ✓' : 'Mark Complete'}
                  </button>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  About this lecture
                </h4>
                <p className="text-gray-600 text-sm">
                  {playerData.lectureDescription || 'No description available for this lecture.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 text-center border-2 border-dashed border-purple-200">
              <img 
                src={courseData?.coureThumbnail || assets.course_placeholder} 
                alt="Course thumbnail" 
                className="w-full max-w-md rounded-lg shadow-lg mb-6 border-2 border-white"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {courseData?.courseName || 'Select a lecture'}
                </span>
              </h3>
              <p className="text-purple-600">
                {courseData ? 'Choose a lecture from the sidebar to begin' : 'Loading course content...'}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Player