import dbConnect from "../../../../db/models/connect";
import User from "../../../../db/models/User";
import mongoose from "mongoose";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Required for formidable to handle multipart/form-data
  },
};

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  // Validate ID
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: "Invalid or missing user id" });
  }

  if (request.method === "GET") {
    try {
      const user = await User.findById(id).populate("notifications");
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }
      return response.status(200).json(user);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === "PATCH") {
    try {
      // Ensure upload directory exists
      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Parse form data (including files)
      const form = formidable({
        uploadDir,
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024, // 5MB
      });

      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(request, (err, fields, files) => {
          if (err) return reject(err);
          resolve([fields, files]);
        });
      });

      console.log("FIELDS RECEIVED:", fields);
      console.log("FILES RECEIVED:", files);

      const updateData = { ...fields };

      // Convert any array fields to strings
      for (const key in updateData) {
        if (Array.isArray(updateData[key])) {
          updateData[key] = updateData[key][0];
        }
      }

      // Handle image upload
      if (files.image) {
        const file = Array.isArray(files.image) ? files.image[0] : files.image;
        const fileName = `${Date.now()}-${file.originalFilename}`;
        const newPath = path.join(uploadDir, fileName);

        console.log("Saving file from:", file.filepath, "to:", newPath);
        fs.renameSync(file.filepath, newPath);
        // Set the full URL path for the image
        updateData.image = `/uploads/${fileName}`;
        console.log("Image path set in updateData:", updateData.image);
      } else {
        console.log("No image file received in the request.");
      }

      // Clean up unwanted fields
      delete updateData.userId;
      delete updateData.id;

      console.log("Final updateData to be saved:", updateData);

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      ).populate("notifications");

      if (!updatedUser) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return response.status(404).json({ error: "User not found" });
      }

      return response
        .status(200)
        .json({ status: `User ${id} deleted successfully` });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }

  return response.status(405).json({ error: "Method not allowed" });
}
