// import Sender from "../../../db/models/Package";
import Sender from "../../../db/models/Package";
import dbConnect from "../../../db/models/connect";
import User from "../../../db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  // Write the POST API route in pages/api/places/index.js
  if (request.method === "GET") {
    const users = await User.find();
    return response.status(200).json(users);
  }

  if (request.method === "POST") {
    try {
      const data = request.body;
      await User.create(data);

      response.status(201).json({ status: "user is created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
