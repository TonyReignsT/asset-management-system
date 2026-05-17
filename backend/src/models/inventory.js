// Soring all items and stock levels
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    equipmentName: {
      type: String,
      required: true,
    },
    model: String,
    serialNumber: String,
    tagNumber: String,
    totalQuantity: {
      type: Number,
      default: 0,
    },
    availableQuantity: {
      type: Number,
      default: 0,
    },
    issuedQuantity: {
      type: Number,
      default: 0,
    },
    condition: {
      type: String,
      enum: ["New", "Good", "Fair", "Poor", "Condemned"],
      default: "Good",
    },
    location: String,
    notes: String,
    isActive: {
      type: Boolean,
      default: true,
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Inventory", inventorySchema);
