import { Router } from "express";
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controllers/studentController";
import upload from "../middleware/uploadMiddleware";

const router = Router();

router.get("/students", getStudents);
router.get("/student/:studentId", getStudent);
router.post("/student", upload.single("avatar"), createStudent);
router.patch("/student/:studentId", upload.single("avatar"), updateStudent);
router.delete("/student/:studentId", deleteStudent);

export default router;