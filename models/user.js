import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: Date.now(),
  },
});

export default mongoose.model("user", userSchema);
