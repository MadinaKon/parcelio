import mongoose from "mongoose";
import "./Service";
import "./Package";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  postalCode: { type: String },
  country: { type: String },
  city: { type: String },
  phoneNumber: { type: String, required: true },
  serviceId: { type: [Schema.Types.ObjectId], ref: "Service" },
  // notifications: [{ type: Schema.Types.ObjectId, ref: "Package" }],
  notifications: [
    {
      // notificationsId: { type: [Schema.Types.ObjectId], ref: "Package" },
      read: { type: Boolean, default: false },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
