import dbConnect from "../../../../db/models/connect";

import Service from "../../../../db/models/Service";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  // if (request.method === "GET") {
  //   const services = await Service.findById(id);
  //   return response.status(200).json({ services });
  // }

  if (request.method === "GET") {
    const services = await Service.findById(id);

    return response.status(200).json(services);
  }

  if (request.method === "PATCH") {
    await Service.findByIdAndUpdate(
      id,
      {
        $set: request.body,
      },
      { new: true }
    );
    response.status(200).json({ status: `Service with id ${id} updated!` });
  }

  // response.status(200).json({ place: place, comments: comments });
}
