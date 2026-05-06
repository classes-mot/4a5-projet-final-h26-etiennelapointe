import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  numberId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "NumberItem",
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Sale = mongoose.model("Sale", saleSchema);