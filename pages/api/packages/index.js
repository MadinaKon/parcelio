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
  //   try {
  //     const data = request.body;

  //     console.log("DATA API PACKAGES ", data);
  //     // console.log("serviceId ", serviceId);
  //     await Package.create(data);

  //     response.status(201).json({ status: "package request created" });
  //   } catch (error) {
  //     console.log(error);
  //     response.status(400).json({ error: error.message });
  //   }
  // }

  if (request.method === "POST") {
    try {
      const data = request.body;

      console.log("DATA API PACKAGES ", data);
      await Package.create(data);

      // await User.findByIdAndUpdate(
      //   id,
      //   {
      //     $push: { notifications: data },
      //   },
      //   { new: true }
      // );

      response.status(201).json({ status: "package request created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
