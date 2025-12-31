import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false, // hide password by default
    },

    picture: {
      type: String, // Google avatar
    },

    googleID: {
      type: String, // For Google logins
    },

    google: {
      type: Boolean,
      default: false, // True if created using Google OAuth
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Only hash when password is modified or new
  if (!this.isModified("password") || !this.password) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
