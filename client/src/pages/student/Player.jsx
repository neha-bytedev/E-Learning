/* eslint-disable no-constant-condition */
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { useParams } from "react-router-dom"
import { assets } from "../../assets/assets"
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player = () => {
  const {calculateChapterTime,enrolledCourses}=useContext(AppContext)
  const {courseId}= useParams()
  const [courseData,setCourseData]=useState(null)
  const [openSections, setOpenSections] = useState({});
  const [playerData,setPlayerData] = useState(null)

 const getCourseData = () => {
  const foundCourse = enrolledCourses.find(course => course._id === courseId);
  if (foundCourse) {
    setCourseData(foundCourse);
  }
};
 

   const toggleSection = (index) =>
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));

  useEffect(() => {
  if (enrolledCourses?.length && courseId) {
    getCourseData();
  }
}, [enrolledCourses, courseId]);
  return (
  <>
    <div className="p-4 sm:-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
      {/* left column */}
      <div className="text-gray-800">
        <h2 className="text-xl font-semibold">Course Structure</h2>

         <div className="pt-5">
                      { courseData && courseData.courseContent.map((chapter, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 bg-white mb-2 rounded"
                        >
                          <div
                            className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                            onClick={() => toggleSection(index)}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                className={`transform transition-transform ${
                                  openSections[index] ? "rotate-180" : ""
                                }`}
                                src={assets.down_arrow_icon}
                                alt="arrow icon"
                              />
                              <p className="font-medium md:text-base text-sm">
                                {chapter.chapterTitle}
                              </p>
                            </div>
                            <p className="text-sm md:default">
                              {Array.isArray(chapter.chapterContent)
                                ? chapter.chapterContent.length
                                : 0}{" "}
                              lectures - {calculateChapterTime(chapter)}
                            </p>
                          </div>
        
                          <div
                            className={`overflow-hidden transition-all duration-300  ${
                              openSections[index] ? "max-h-96" : "max-h-0"
                            } `}
                          >
                            <ul className="list-disc md:pl-10 pl-14 pr-4 py-2 text-gray-700 border-t border-gray-300">
                              {chapter.chapterContent.map((lecture, i) => (
                                <li key={i} className="flex items-start gap-2 py-1">
                                  <img
                                    src={false ? assets.blue_tick_icon : assets.play_icon}
                                    alt="play-icon"
                                    className="w-4 h-4 mt-1"
                                  />
        
                                  <div className="flex items-center justify-between w-full text-gray-800 text-sm md:text-base">
                                    <p className="w-2/3">{lecture.lectureTitle}</p>
        
                                    <div className="flex items-center gap-4  text-md">
                                      {lecture.lectureUrl && (
                                        <p
                                          onClick={() =>
                                            setPlayerData({
                                             ...lecture, chapter:index + 1, lecture: i + 1
                                            })
                                          }
                                          className="text-blue-500 cursor-pointer hover:underline"
                                        >
                                         Watch
                                        </p>
                                      )}
                                      <span className="text-gray-600">
                                        {humanizeDuration(
                                          lecture.lectureDuration * 60 * 1000,
                                          { units: ["h", "m"] }
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>

                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 py-3 mt-10">
                      <h1 className="text-xl font-bold">Rate this Course</h1>
                      <Rating initialRating={0}/>
                    </div>

                  </div>

     

      {/* right column */}
      <div className="md:mt-10">
        {
          playerData ? (
            <div>
              <YouTube
              videoId={playerData.lectureUrl.split('/').pop()}
              iframeClassName="w-full aspect-video"
            />
            <div className="flex justify-between items-center mt-1">
              <p>{playerData.chapter}.{playerData.lecture}{playerData.lectureTitle}</p>
              <button className="text-blue-600">{false ? 'Completed' : 'Mark Complete'}</button>
            </div>
            </div>
          )
          :
           <img src={courseData? courseData.coureThumbnail: ''} alt="" />

        }
       
      </div>
    </div>
    <Footer/>
  </>
  )
}

export default Player
