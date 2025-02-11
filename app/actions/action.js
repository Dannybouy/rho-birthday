"use server";
import { ID, Query } from "appwrite";
import { Readable } from "stream";
import { storage } from "../appwrite/config";
import db from "../appwrite/databases";
const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

export async function createTestimony(formData) {
  try {
    console.log("formData:", formData);
    const name = formData.get("name");
    const experience = formData.get("experience");
    const imageFile = formData.get("image");

    console.log("name:", name);
    console.log("experience:", experience);
    console.log("imageFile:", imageFile);

    let imageID = null;

    if (imageFile && imageFile.size > 0) {
      // Convert the file into a Node Buffer
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Convert the buffer into a Node Readable stream.
      const stream = Readable.from(buffer);

      const response = await storage.createFile(
        bucketId,
        ID.unique(),
        stream,
        imageFile.name // Pass the file name; Appwrite uses this to determine the MIME type
      );
      imageID = response.$id;
    }
    const payload = {
      name,
      experience,
      image: imageID,
      createdAt: new Date().toISOString(),
    };
    await db.testimonies.create(payload);

    return { success: "Testimony created successfully" };
  } catch (error) {
    console.error("Error submitting testimony:", error);
    return { success: false, error: error.message };
  }
}

export async function getTestimonies() {
  const testimonies = await db.testimonies.list([Query.orderDesc("createdAt")]);
  console.log(testimonies);
  return testimonies;
}
