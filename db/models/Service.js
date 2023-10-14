import mongoose from "mongoose";

const { Schema } = mongoose;

const serviceSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
