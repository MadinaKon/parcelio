import mongoose from "mongoose";
import "./Package";

const { Schema } = mongoose;

const serviceSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  flightDateTime: { type: String, required: true },
  availableKilos: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  senders: { type: [Schema.Types.ObjectId], ref: "Package" },
});

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
