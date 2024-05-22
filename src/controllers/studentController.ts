import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import StudentModel from "../models/studentModel";

interface CreateStudentBody {
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: Date;
}

export const getStudents: RequestHandler = async (req, res, next) => {
  try {
    const students = await StudentModel.find({}).exec();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

export const getStudent: RequestHandler = async (req, res, next) => {
  const studentId = req.params.studentId;

  try {
    if (!mongoose.isValidObjectId(studentId)) {
      throw createHttpError(400, "Invalid student id");
    }

    const student = await StudentModel.findById(studentId).exec();

    if (!student) {
      throw createHttpError(404, "Student not found");
    }

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const createStudent: RequestHandler<unknown, unknown, CreateStudentBody, unknown> = async (req, res, next) => {
  const { name, email, phone, enrollNumber, dateOfAdmission } = req.body;

  try {
    if (!name || !email || !phone || !enrollNumber || !dateOfAdmission) {
      throw createHttpError(400, "Please fill all the fields");
    }

    const newStudent = await StudentModel.create({
      name,
      avatar: req.file?.path,
      email,
      phone,
      enrollNumber,
      dateOfAdmission,
    });

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

export const updateStudent: RequestHandler<{ studentId: string }, unknown, CreateStudentBody, unknown> = async (req, res, next) => {
  const studentId = req.params.studentId;
  const { name, email, phone, enrollNumber, dateOfAdmission } = req.body;

  try {
    if (!mongoose.isValidObjectId(studentId)) {
      throw createHttpError(400, "Invalid student id");
    }

    const student = await StudentModel.findById(studentId).exec();

    if (!student) {
      throw createHttpError(404, "Student not found");
    }

    if (name) {
      student.name = name;
    }

    if (email) {
      student.email = email;
    }

    if (phone) {
      student.phone = phone;
    }

    if (enrollNumber) {
      student.enrollNumber = enrollNumber;
    }

    if (dateOfAdmission) {
      student.dateOfAdmission = dateOfAdmission;
    }

    if (req.file) {
      student.avatar = req.file.path;
    }

    const updatedStudent = await student.save();

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent: RequestHandler = async (req, res, next) => {
  const studentId = req.params.studentId;

  try {
    if (!mongoose.isValidObjectId(studentId)) {
      throw createHttpError(400, "Invalid student id");
    }

    const student = await StudentModel.findById(studentId).exec();

    if (!student) {
      throw createHttpError(404, "Student not found");
    }

    await StudentModel.findByIdAndDelete(studentId);

    res.sendStatus(204).json({
      success: true,
      message : "The student detail deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};