import dbConnect from "../../../../db/models/connect";
import User from "../../../../db/models/User";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  // Validate id
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: "Invalid or missing user id" });
  }

  if (request.method === "GET") {
    try {
      const user = await User.findById(id).populate("notifications");
      return response.status(200).json(user);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PATCH") {
    try {
      await User.findByIdAndUpdate(id, { $set: request.body }, { new: true });

      response.status(200).json({ status: `Update with id ${id} updated!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      user.notifications = user.notifications.filter(
        (notification) => notification._id.toString() !== id
      );

      return response.json(user);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
