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

  // if (request.method === "POST") {
  //   // console.log("WHICH ID ", id);
  //   try {
  //     const { request, serviceId, userId } = request.body;
  //     await Package.create({ request, serviceId });
  //     console.log("REQUEST ", request);
  //     console.log("SERVICE ID ", serviceId);
  //     console.log("USER ID ", userId);

  //     await User.findByIdAndUpdate(
  //       id,
  //       {
  //         $push: { notifications: data.serviceId },
  //       },
  //       { new: true }
  //     );

  //     response.status(201).json({ status: "package successfully created" });
  //   } catch (error) {
  //     console.log(error);
  //     response.status(400).json({ error: error.message });
  //   }
  // }

  if (request.method === "POST") {
    // console.log("WHICH ID ", id);
    try {
      const { serviceId, userId, ...requestBody } = request.body;
      await Package.create({ requestBody, serviceId });
      console.log("REQUEST ", requestBody);
      console.log("SERVICE ID ", serviceId);
      console.log("USER ID ", userId);

      // await User.findByIdAndUpdate(
      //   id,
      //   {
      //     $push: { notifications: data.serviceId },
      //   },
      //   { new: true }
      // );

      await User.findByIdAndUpdate(
        userId,
        {
          $push: { notifications: serviceId },
        },
        { new: true }
      );

      response.status(201).json({ status: "package successfully created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
