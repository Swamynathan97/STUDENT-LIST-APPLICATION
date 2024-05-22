
import { InferSchemaType, model, Schema } from "mongoose";

const studentSchema = new Schema({
  name: 
  { 
    type: String,
    required: true 
  },
  avatar: 
  { 
    type: String, 
    required: true 
  },
  email: 
  { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: 
  { 
    type: String, 
    required: true 
  },
  enrollNumber: 
  { 
    type: String, 
    required: true, 
    unique: true 
  },
  dateOfAdmission: 
  { 
    type: Date, 
    required: true 
  }
});

type Student = InferSchemaType<typeof studentSchema>;

export default model<Student>("Student", studentSchema);