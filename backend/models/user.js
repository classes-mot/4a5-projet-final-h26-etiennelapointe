import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: "Ø" },
  color: { type: String, default: "gray" },
  password: { type: String, required: true },
  value: { type: Number, default: 0 },
  money: { type: Number, default: 10 },
  numberList: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "NumberItem",
    },
  ],
});

export const User = mongoose.model("User", userSchema);
