import dbConnect from "../../../db/models/connect";
import User from "../../../db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const users = await User.find();
    return response.status(200).json(users);
  }

  if (request.method === "POST") {
    try {
      const data = request.body;
      await User.create(data);

      response.status(201).json({ status: "a new user is created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
