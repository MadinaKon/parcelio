import mongoose from "mongoose";
import "./Service";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  // userName: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  serviceId: { type: [Schema.Types.ObjectId], ref: "Service" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
