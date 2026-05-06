import mongoose from "mongoose";

const numberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  isForSale: { type: Boolean, default: false },
  ownerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const NumberItem = mongoose.model("NumberItem", numberSchema);
