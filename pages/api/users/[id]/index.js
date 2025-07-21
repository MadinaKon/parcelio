import dbConnect from "../../../../db/models/connect";
import User from "../../../../db/models/User";
import mongoose from "mongoose";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  // Validate id
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: "Invalid or missing user id" });
  }

  if (request.method === "GET") {
    try {
      const user = await User.findById(id).populate("notifications");
      return response.status(200).json(user);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "PATCH") {
    try {
      await User.findByIdAndUpdate(id, { $set: request.body }, { new: true });

         // Parse multipart form data
         const form = formidable({
          uploadDir: path.join(process.cwd(), "public/uploads"),
          keepExtensions: true,
          maxFileSize: 5 * 1024 * 1024, // 5MB limit
        });
  
        // Ensure upload directory exists
        if (!fs.existsSync(path.join(process.cwd(), "public/uploads"))) {
          fs.mkdirSync(path.join(process.cwd(), "public/uploads"), { recursive: true });
        }
  
        const [fields, files] = await new Promise((resolve, reject) => {
          form.parse(request, (err, fields, files) => {
            if (err) reject(err);
            resolve([fields, files]);
          });
        });

         // Prepare update data
      const updateData = { ...fields };

      // Handle image upload
      if (files.image) {
        const file = files.image;
        const fileName = `${Date.now()}-${file.originalFilename}`;
        const newPath = path.join(process.cwd(), "public/uploads", fileName);
        
        // Move file to uploads directory
        fs.renameSync(file.filepath, newPath);
        
        // Update image path in database
        updateData.image = `/uploads/${fileName}`;
      }

      // Remove userId and id from update data (they're not user fields)
      delete updateData.userId;
      delete updateData.id;

      await User.findByIdAndUpdate(id, { $set: updateData }, { new: true });

      response.status(200).json({ status: `Update with id ${id} updated!` });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      user.notifications = user.notifications.filter(
        (notification) => notification._id.toString() !== id
      );

      return response.json(user);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
