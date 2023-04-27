import express from "express";
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizedAdmin, isAuthenticated, authorizedSubscribers } from "../middlewares/auth.js";


const router = express.Router();

// Get All Courses without lectures
router.route("/courses")
    .get(getAllCourses);

// create new course - only admin // in 'cloudinary' website
router.route("/createcourse")
    .post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);

// Add Lecture,Delete Course,Get Course Details  // in 'cloudinary' website
router.route("/course/:id")
    .get(isAuthenticated,authorizedSubscribers, getCourseLectures)
    .post(isAuthenticated, authorizedAdmin, singleUpload, addLecture)
    .delete(isAuthenticated, authorizedAdmin, deleteCourse);
//Delete Lecture
router.route("/lecture")
    .delete(isAuthenticated, authorizedAdmin, deleteLecture);

export default router;