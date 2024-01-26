import Package from "../../../db/models/Package";
import User from "../../../db/models/User";
import dbConnect from "../../../db/models/connect";

export default async function handler(request, response) {
  await dbConnect();

  // Write the POST API route in pages/api/places/index.js
  if (request.method === "GET") {
    const packages = await Package.find();
    return response.status(200).json(packages);
  }

  if (request.method === "POST") {
    try {
      const { serviceId, userId, ...requestBody } = request.body;

      const pack = await Package.create({ serviceId, userId, ...requestBody });

      await User.findByIdAndUpdate(
        userId,
        {
          $push: { notifications: pack._id },
        },
        { new: true }
      );

      // response.status(201).json({ status: "package successfully created" });
      response.status(201).json({
        status: `package with package id ${pack._id} successfully created`,
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
