/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import {useAuth, useUser} from "@clerk/clerk-react"
import humanizeDuration from 'humanize-duration'
import axios from 'axios'
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext()



export const AppContextProvider =(props)=>{
 const backendUrl = import.meta.env.VITE_BACKEND_URL
 const currency = import.meta.env.VITE_CURRENCY
 const navigate =useNavigate()
 const {getToken} = useAuth()
 const {user} = useUser()
 const [allCourses,setAllCourses] = useState([])
 const [isEducator,setIsEducator] = useState(true)
 const [enrolledCourses,setEnrolledCourses] = useState([])
 const [userData, setUserData] = useState(null)

  // fetch all course
 
  const fetchAllCourses = async()=>{
    try {
      const {data}= await axios.get (backendUrl + '/api/course/all')
      if (data.success) {
        setAllCourses(data.courses)
      } else {
        toast.error(data.messsage)
      }
    } catch (error) {
      toast.error(error.messsage)
    }
  }

  // Fetch User Data
  const fetchUserData = async ()=>{
    try {
      const token = await getToken()
      const {data}= await axios.get(backendUrl + '/api/user/data',{headers:{Authorization: `Bearer ${token}`}})
      if (data.success) {
        setUserData(data.user)
      } else {
        toast.error(data.messsage)
      }
    } catch (error) {
      toast.error(error.messsage)
    }
  }

 // function to Calculate average Rating of course
 const calculateRating = (course) => {
  if (!course || !Array.isArray(course.courseRatings) || course.courseRatings.length === 0) {
    return 0;
  }

  let totalRating = 0;
  course.courseRatings.forEach((rating) => {
    totalRating += rating.rating;
  });

  return totalRating / course.courseRatings.length;
};
// function to Calculate Course Chapter Time 
const calculateChapterTime = (chapter) =>{
  let time =0;
  chapter.chapterContent.map ( (lecture)=> time+= lecture.lectureDuration)
  return humanizeDuration(time * 60 *1000, {units:["h" ,"m"]})
}
// function to Calculate Course Duration
const calculateCourseDuration = (course)=>{
  let time = 0;
  course.courseContent.map( (chapter)=> chapter.chapterContent.map(
    (lecture)=> time+=lecture.lectureDuration
  ))
  return humanizeDuration(time * 60 *1000, {units:["h" ,"m"]})
}
// function calculate to No. of Lectures in the Course
const calculateNoOfLectures = (course) =>{
  let totalLectures= 0;
  course.courseContent.forEach( (chapter)=>{
    if(Array.isArray(chapter.chapterContent)){
      totalLectures += chapter.chapterContent.length;
    }

    })
    return totalLectures;
  }
  // Fetch User Enrolled Courses
  const fetchUserEnrolledCourses =async ()=>{
    setEnrolledCourses(dummyCourses)
  }

    useEffect( ()=>{
   fetchAllCourses()
   fetchUserEnrolledCourses()

  },[])
   const logToken =async ()=>{
    console.log(await getToken())
   }
   useEffect(()=>{
    if(user){
      logToken()
  
    }
   },[user])
   
   const value ={
    currency, allCourses, navigate, calculateRating,isEducator,setIsEducator,calculateChapterTime,calculateCourseDuration,calculateNoOfLectures,enrolledCourses,fetchUserEnrolledCourses
  
   }
  return(
    <AppContext.Provider value = {value}>
      {props.children}
    </AppContext.Provider>
  )
}