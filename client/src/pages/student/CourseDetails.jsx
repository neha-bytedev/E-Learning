/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Youtube from "react-youtube";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [isHoveringEnroll, setIsHoveringEnroll] = useState(false);

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const toggleSection = (index) =>
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  
  return courseData ? (
    <>
      {/* Full page purple gradient background */}
      <div className="fixed top-0 left-0 w-full h-full -z-50 bg-gradient-to-br from-purple-700 via-indigo-500 to-blue-900"></div>
      
      {/* Content container with subtle backdrop */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white  ">
        <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
          {/* Additional decorative gradient element */}
          <div className="absolute top-0 left-0 w-full h-[500px] -z-10 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10"></div>

          {/* left column */}
          <div className="max-w-xl z-10 text-gray-600">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20">
              <h1 className="md:text-3xl text-2xl font-bold text-gray-800">
                {courseData.courseTitle}
              </h1>
              <p
                className="pt-4 text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription.slice(0, 200),
                }}
              ></p>

              {/* review and ratings */}
              <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
                <p className="font-medium text-gray-700">{calculateRating(courseData)}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={
                        i < Math.floor(calculateRating(courseData))
                          ? assets.star
                          : assets.star_blank
                      }
                      alt="star"
                      className="w-4 h-4"
                    />
                  ))}
                </div>

                <p className="text-blue-600 hover:underline cursor-pointer">
                  (
                  {Array.isArray(courseData.courseRatings)
                    ? courseData.courseRatings.length
                    : 0}
                  {Array.isArray(courseData.courseRatings) &&
                  courseData.courseRatings.length > 1
                    ? " ratings"
                    : " rating"}
                  )
                </p>

                <p className="text-gray-600">
                  {Array.isArray(courseData.enrolledStudents)
                    ? courseData.enrolledStudents.length
                    : 0}
                  {Array.isArray(courseData.enrolledStudents) &&
                  courseData.enrolledStudents.length > 1
                    ? " students"
                    : " student"}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Created by{" "}
                <span className="text-blue-500 hover:underline cursor-pointer font-medium">Tech2Skill</span>
              </p>
            </div>

            <div className="pt-8 text-gray-900 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm mt-4 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Curriculum</h2>

              <div className="pt-2">
                {courseData.courseContent.map((chapter, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 bg-white mb-3 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-50 transition-colors"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          className={`transform transition-transform duration-200 ${
                            openSections[index] ? "rotate-180" : ""
                          }`}
                          src={assets.down_arrow_icon}
                          alt="arrow icon"
                        />
                        <p className="font-medium text-gray-800">
                          {chapter.chapterTitle}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {Array.isArray(chapter.chapterContent)
                          ? chapter.chapterContent.length
                          : 0}{" "}
                        lectures • {calculateChapterTime(chapter)}
                      </p>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSections[index] ? "max-h-96" : "max-h-0"
                      } `}
                    >
                      <ul className="list-none pl-0 pr-4 py-2 text-gray-600 border-t border-gray-200">
                        {chapter.chapterContent.map((lecture, i) => (
                          <li key={i} className="flex items-start gap-3 py-2 px-4 hover:bg-gray-50">
                            <div className="flex-shrink-0 mt-1">
                              <img
                                src={assets.play_icon}
                                alt="play-icon"
                                className="w-4 h-4"
                              />
                            </div>

                            <div className="flex items-center justify-between w-full text-gray-700">
                              <p className="text-sm">{lecture.lectureTitle}</p>

                              <div className="flex gap-3 items-center">
                                {lecture.isPreviewFree && (
                                  <button
                                    onClick={() =>
                                      setPlayerData({
                                        videoId: lecture.lectureUrl
                                          .split("/")
                                          .pop(),
                                      })
                                    }
                                    className="text-blue-500 hover:text-blue-600 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                                  >
                                    Preview
                                  </button>
                                )}
                                <p className="text-xs text-gray-500">
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60 * 1000,
                                    { units: ["h", "m"] }
                                  )}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-8 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm mt-4 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Course Description
              </h3>
              <div className="prose max-w-none">
                <p
                  className="pt-1 text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: courseData.courseDescription,
                  }}
                ></p>
              </div>
            </div>
          </div>

          {/* right column */}
          <div className="sticky top-24 course-card z-10 rounded-xl overflow-hidden bg-white/95 backdrop-blur-sm w-full max-w-md shadow-lg border border-white/20">
            {playerData ? (
              <div className="relative pt-[56.25%]">
                <Youtube
                  videoId={playerData.videoId}
                  opts={{
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                  iframeClassName="absolute top-0 left-0 w-full h-full"
                />
              </div>
            ) : (
              <img 
                src={courseData.courseThumbnail} 
                alt={courseData.courseTitle}
                className="w-full aspect-video object-cover"
              />
            )}

            <div className="p-6">
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg mb-4">
                <img
                  className="w-4"
                  src={assets.time_left_clock_icon}
                  alt="time left clock"
                />
                <p className="text-purple-700 text-sm font-medium">
                  <span className="font-bold">5 days</span> left at this price!
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <p className="text-gray-800 text-3xl font-bold">
                  {currency}{" "}
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(2)}
                </p>
                <p className="text-lg text-gray-500 line-through">
                  {currency}
                  {courseData.coursePrice}
                </p>
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-1 rounded">
                  {courseData.discount}% OFF
                </span>
              </div>

              <div className="flex items-center text-sm gap-4 pt-4 text-gray-500 border-b border-gray-200 pb-5">
                <div className="flex items-center gap-1">
                  <img src={assets.star} alt="rating" className="w-4 h-4" />
                  <p>{calculateRating(courseData)}</p>
                </div>

                <div className="h-4 w-px bg-gray-300"></div>

                <div className="flex items-center gap-1">
                  <img src={assets.time_clock_icon} alt="duration" className="w-4 h-4" />
                  <p>{calculateCourseDuration(courseData)}</p>
                </div>

                <div className="h-4 w-px bg-gray-300"></div>

                <div className="flex items-center gap-1">
                  <img src={assets.lesson_icon} alt="lessons" className="w-4 h-4" />
                  <p>{calculateNoOfLectures(courseData)} lessons</p>
                </div>
              </div>

              <button 
                className={`mt-6 w-full py-3 rounded-lg text-white font-bold transition-all duration-300 ${
                  isHoveringEnroll 
                    ? "bg-purple-700 shadow-lg" 
                    : "bg-gradient-to-r from-purple-600 to-blue-600 shadow-md"
                }`}
                onMouseEnter={() => setIsHoveringEnroll(true)}
                onMouseLeave={() => setIsHoveringEnroll(false)}
              >
                {isAlreadyEnrolled ? "Continue Learning" : "Enroll Now"}
              </button>

              <div className="pt-6">
                <p className="text-xl font-bold text-gray-800 mb-3">
                  This course includes:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Lifetime access with free updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Hands-on project guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Downloadable resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Quizzes & exercises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Certificate of Completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;