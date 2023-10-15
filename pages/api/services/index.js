
import Service from "../../../db/models/Service";
import dbConnect from "../../../db/models/connect";

export default async function handler(request, response) {
  await dbConnect();

  // Write the POST API route in pages/api/places/index.js
  if (request.method === "GET") {
    const services = await Service.find();
    return response.status(200).json(services);
  }

  if (request.method === "POST") {
    try {
      const serviceData = request.body;
      console.log("serviceData ", serviceData);
      await Service.create(serviceData);

      response.status(201).json({ status: "service created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
