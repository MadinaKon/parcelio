import mongoose from "mongoose";
import "./Service";
import "./Package";

const { Schema } = mongoose;

const notificationSchema = new Schema({
  // Other notification fields
  message: String,
  isRead: {
    type: Boolean,
    default: false,
  },
  // Field to keep track of unread count
  count: {
    type: Number,
    default: 1,
  },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
