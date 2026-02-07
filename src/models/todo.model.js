const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "completed", "deleted"],
      default: "pending"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

// ⚠️ Make sure this is "Todo", NOT "User"
module.exports = mongoose.model("Todo", todoSchema);
