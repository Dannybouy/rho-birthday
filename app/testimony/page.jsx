"use client";

import { ID } from "appwrite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { storage } from "../appwrite/config";
import db from "../appwrite/databases";

const Testimony = () => {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

    try {
      // 1. First upload the image to storage
      let imageUrl = null;
      let imageID = null;
      if (
        image.size > 0 &&
        image.type.startsWith("image/") &&
        image.size < 1024 * 1024 * 5
      ) {
        const response = await storage.createFile(bucketId, ID.unique(), image);
        imageID = response.$id;

        imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${imageID}/view?project=${projectId}`;
      }
      // 2. Create the testimony document
      const payload = {
        name: formData.name,
        experience: formData.experience,
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
      };

      await db.testimonies.create(payload);
      toast.success("Thank you for sharing your testimony!");
      // Reset form and show success message
      setFormData({ name: "", experience: "" });
      setImage(null);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      window.location.href = "/view-testimonies";
    } catch (err) {
      console.error("Error submitting testimony:", err);
      toast.error("Failed to submit testimony. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const spinningStyle = {
    animation: "spin 10s linear infinite",
  };
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-gradient-to-r from-[#2f060f] to-transparent bg-black text-white flex justify-between w-full h-[600px] relative">
        <h1 className="font-bold text-[70px] italic uppercase pl-[70px] flex items-center font-merchant leading-[80px] z-10">
          Fill the air with <br />
          your Testimonies
        </h1>
        <Image
          src="/Group_6.svg"
          alt="circle text"
          width={200}
          height={200}
          className="absolute top-[50%] left-[40%]"
          quality={90}
          style={spinningStyle}
        />
        <Image
          src="/bg_img1.jpg"
          alt="testimony"
          width={1000}
          height={1000}
          quality={90}
          className="min-w-[42%] max-w-[42%] min-h-full object-cover"
        />
      </header>

      <section className="relative bg-gradient-to-b from-[#ffe7e7] to-rgba(248, 239, 222, 0.5) min-h-[1000px]">
        <Image
          src="/lily.svg"
          alt="Left Lily"
          className="absolute top-0 left-0"
          width={300}
          height={300}
        />
        <Image
          src="/lily-right.svg"
          alt="Right Lily"
          className="absolute top-0 right-0"
          width={300}
          height={300}
        />

        <div className="flex flex-col items-center justify-center ">
          <h3 className="font-neue-montreal text-5xl mt-[120px] mb-20 text-black text-balance text-center max-w-[789px] uppercase">
            Share an experience, testimony, manner of life or message snippet of
            how mummy has blessed you
          </h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center text-black "
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <label
                htmlFor="name"
                className="text-2xl font-everett font-medium text-center"
              >
                Tell us your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                maxLength={25}
                placeholder="Max. limit is 25 characters"
                required
                className="w-[448px] h-[55px] border border-[#dadada] rounded-lg px-5"
              />
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 mt-14">
              <label
                htmlFor="image"
                className="text-2xl font-everett font-medium text-center"
              >
                Upload an image
              </label>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                name="image"
                size={1024 * 1024 * 5}
                required
                className="w-[448px] h-[55px] border border-[#dadada] rounded-lg px-5"
              />
              <p className="text-sm text-gray-500">Maximum file size is 5MB</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 mt-14">
              <label
                htmlFor="experience"
                className="text-2xl font-everett font-medium text-center"
              >
                Share your experience here
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                maxLength={555}
                required
                placeholder="Max. limit is 555 characters"
                className="w-[776px] h-[250px] bg-white border border-[#dadada] rounded-lg my-8 p-5 text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#ffed8f] px-10 py-5 flex justify-center items-center mt-14 rounded-[20px] text-2xl font-bold disabled:bg-[#fff8d0] disabled:text-[#dedab4] font-neue-montreal"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          <div className="flex flex-col items-center justify-center ">
            <Image
              src="/bg_img1.jpg"
              alt="testimony"
              width={1000}
              height={1000}
              className="relative h-[500px] w-[500px] rounded-full my-[60px] object-cover border-[10px] border-[#FEE5E5]"
            />

            <h3 className="text-black text-4xl font-bold text-center uppercase mt-[100px] font-merchant">
              Thank you for joining <br />
              in our celebration!
            </h3>
            <p className="text-2xl leading-[38px] font-medium max-w-[521px] text-center mt-[60px] font-neue-montreal text-balance text-black mb-[100px]">
              Your download should start soon, don't forget to share your DP
              everywhere & also please take out time to pray for Rev Helen
              Oyegoke.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-black py-14 border-dashed text-center">
        <p className="text-black text-2xl font-neue-montreal">
          Built by{" "}
          <Link
            href="https://www.egfm.org/"
            className="text-black font-medium  underline"
          >
            EGFM
          </Link>{" "}
          Publicity Team
        </p>
      </footer>
    </div>
  );
};

export default Testimony;
