# Student Management System API

This repository contains the backend code for a simple Student Management System API built with Express.js, MongoDB, and Multer for file uploads.

## Features

- CRUD operations for managing student details
- File upload for student avatars
- Error handling using http-errors
- CORS support for cross-origin requests

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and configure the connection in the `.env` file.
4. Run the server using `npm start`.

## Endpoints

- `GET /api/students`: Get all students
- `GET /api/students/:studentId`: Get a specific student by ID
- `POST /api/students`: Create a new student
- `PUT /api/students/:studentId`: Update an existing student
- `DELETE /api/students/:studentId`: Delete a student

## File Uploads

- Images can be uploaded using `multipart/form-data` with the key `avatar` in the request body.

## Environment Variables

- `MONGO_URI`: MongoDB connection URI
- `PORT`: Server port

## Example Usage

```bash
# Start the server
npm start
