// Tracking emails/alerts
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    issuanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issuance",
    },
    recipientEmail: String,
    subject: String,
    message: String,
    status: {
      type: String,
      enum: ["Queued", "Sent", "Failed"],
      default: "Queued",
    },
    errorMessage: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notification", notificationschema);
