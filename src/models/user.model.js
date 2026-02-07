const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// ✅ Safe export to prevent "Cannot overwrite model" error
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
