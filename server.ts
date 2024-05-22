// server.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRoutes from './src/routes/studentRoute';
import cors from 'cors';
import path from 'path'

const app = express();


const uploadPath = path.join(__dirname, "uploads");

// Serve the uploaded images from the uploads/ directory
app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(uploadPath, filename));
});

dotenv.config();


mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(cors())
app.use('/api', studentRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});