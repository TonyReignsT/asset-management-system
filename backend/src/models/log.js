// Tracking status changes and actions
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    issuanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issuance",
    },
    changedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    oldStatus: String,
    newStatus: String,
    action: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Log", logSchema);
