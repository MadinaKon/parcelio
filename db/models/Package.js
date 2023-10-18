import mongoose from "mongoose";
import "./Service";
import "./User";

const { Schema } = mongoose;

const directionEnum = ["intracity", "Central asia", "international"];

const packageSchema = new Schema({
  enum: directionEnum,
  length: { type: String, required: true },
  width: { type: String, required: true },
  height: { type: String, required: true },
  totalWeight: { type: String, required: true },
  packageType: { type: String, required: true },
  description: { type: String, required: true },
  // recipientAddress: { type: String, required: true },
  users: { type: [Schema.Types.ObjectId], ref: "User" },
  services: { type: [Schema.Types.ObjectId], ref: "Service" },
});

const Package =
  mongoose.models.Package || mongoose.model("Package", packageSchema);

export default Package;
