import Service from "../../../db/models/Service";
import dbConnect from "../../../db/models/connect";

export default async function handler(request, response) {
  await dbConnect();

  const { userId, notificationId } = request.query;

  if (request.method === "PUT") {
    if (userId) {
      //  const notification = await Notification.find({notificationId});
      const notification = await Notification.findById(notificationId);

      if (!notification) {
        return response.status(404).json({ error: "Notification not found" });
      }
      if (!notification.isRead) {
        // Mark the notification as read
        notification.isRead = true;

        // Decrease the count
        notification.count = Math.max(0, notification.count - 1);

        // Save the updated notification
        await notification.save();
      }

      response.json({ message: "Notification marked as read" });
    } else {
      const notifications = await Notification.find();
      return response.status(200).json(notifications);
    }
  }
}
