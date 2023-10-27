import dbConnect from "../../../../../db/models/connect";
import User from "../../../../../db/models/User";

export default async function handler(request, response) {
  await dbConnect();
  const { id, notificationId } = request.query;

  console.log("USER ID DELETE ", id);
  console.log("NOTIFOICATION ID DELETE ", notificationId);

  if (request.method === "DELETE") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      await User.findByIdAndUpdate(
        id,
        {
          $pull: { notifications: notificationId },
        },
        { new: true }
      );

      response.status(200).json({
        status: `notification with id ${notificationId} successfully for userId ${id} deleted.`,
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
