import express from "express";
import { imageUploadFile } from "../controllers/CourseController";
import { courseValid } from "../validation";
import { course } from "../controllers";

const router = express.Router();

router.post('/add', imageUploadFile, courseValid.addCourse, course.addNewCourse  )
router.get('/list', course.getListCourse  )
router.delete('/delete', course.deleteCourse  )

export default router