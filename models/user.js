import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  googleId: String,
  profileImageUrl: String,
});

export default mongoose.model("user", userSchema);
