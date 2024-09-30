/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/config/config";

const uploadImageToCloudinary = async (image: any) => {
  const url = `https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/upload`; // Replace <your-cloud-name>
  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", `${config.clodinaryUploadPresets}`); // Replace <your-upload-preset>
  formData.append(
    "public_id",
    `meeting-room-${Date.now()}-${Math.floor(Math.random() * 100000)}`
  );
  try {
    // Send the image to Cloudinary
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url; // Return the secure URL from Cloudinary
  } catch (err: any) {
    throw Error(err);
  }
};

export default uploadImageToCloudinary;
