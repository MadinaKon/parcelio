// import Service from "../../../db/models/Service";
// import dbConnect from "../../../db/models/connect";
// import Sender from "../../../db/models/Package";
// import dbConnect from "../../../db/models/connect";

// export default async function handler(request, response) {
//   await dbConnect();

//   // Write the POST API route in pages/api/places/index.js
//   if (request.method === "GET") {
//     const senders = await Sender.find();
//     return response.status(200).json(senders);
//   }

//   if (request.method === "POST") {
//     try {
//       const senderData = request.body;
//       await Sender.create(senderData);

//       response.status(201).json({ status: "sender request created" });
//     } catch (error) {
//       console.log(error);
//       response.status(400).json({ error: error.message });
//     }
//   }
// }
import Package from "../../../db/models/Package";
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
      const data = request.body;
      await Package.create(data);

      response.status(201).json({ status: "sender request created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
