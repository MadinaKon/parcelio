import dbConnect from "../../../../../db/models/connect";
import User from "../../../../../db/models/User";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();
  const { id, notificationId } = request.query;

  if (request.method === "DELETE") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $pull: { notifications: { _id: notificationId } }, // Remove subdocument by _id
        },
        { new: true }
      );

      response.status(200).json({
        status: `notification with id ${notificationId} successfully for userId ${id} deleted.`,
        notificationCount: updatedUser.notifications.length,
        user: updatedUser,
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
