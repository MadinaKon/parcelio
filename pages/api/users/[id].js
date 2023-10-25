import dbConnect from "../../../db/models/connect";
import User from "../../../db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const { id } = request.query;

    const user = await User.findById(id).populate("notifications");
    // TODO check why this
    console.log("GET REQUEST USER: ", user);

    return response.status(200).json(user);
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
}
