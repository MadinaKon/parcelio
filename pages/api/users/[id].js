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
}
