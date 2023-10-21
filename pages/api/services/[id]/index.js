import dbConnect from "../../../../db/models/connect";

import Service from "../../../../db/models/Service";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const services = await Service.findById(id);

    return response.status(200).json(services);
  }

  if (request.method === "PATCH") {
    try {
      await Service.findByIdAndUpdate(
        id,
        { $set: request.body },
        { new: true }
      );
      response.status(200).json({ status: `Service with id ${id} updated!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Service.findByIdAndDelete(id);

      response
        .status(200)
        .json({ status: `service with id ${id} successfully deleted.` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
