import dbConnect from "../../../../../db/models/connect";
import User from "../../../../../db/models/User";
import Package from "../../../../../db/models/Package";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "POST") {
    try {
      // Extract fields for the Package from the request body
      const {
        length,
        width,
        height,
        totalWeight,
        packageType,
        description,
        serviceId,
        email,
        phoneNumber,
        enum: directionEnum,
      } = req.body;

      // Create the new Package (notification)
      const newPackage = await Package.create({
        length,
        width,
        height,
        totalWeight,
        packageType,
        description,
        serviceId,
        email,
        phoneNumber,
        enum: directionEnum,
      });

      // Add the new package's _id to the user's notifications array
      await User.findByIdAndUpdate(
        id,
        { $push: { notifications: newPackage._id } },
        { new: true }
      );

      return res
        .status(201)
        .json({ status: "Notification created", notification: newPackage });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
