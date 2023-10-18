import mongoose from "mongoose";
import "./Service";

const { Schema } = mongoose;

const directionEnum = ["intracity", "Central asia", "international"];

const senderSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  description: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  enum: directionEnum,
  //default: "international",
  weight: { type: String, required: true },
  services: { type: [Schema.Types.ObjectId], ref: "Service" },
});

const Sender = mongoose.models.Sender || mongoose.model("Sender", senderSchema);

export default Sender;
