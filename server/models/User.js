import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
    _id: {type: String, required: true },
    name: {type: String, required: true },
    email: {type: String, required: true },
    imageUrl: {type: String, required: true },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
   }, {timestamps: true,
       _id: false  // ✅ Prevent Mongoose from adding default _id ObjectId
    });

   const User = mongoose.model('User',userSchema);

   export default User
