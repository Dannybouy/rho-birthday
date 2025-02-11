"use client";

import { ID } from "appwrite";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

    try {
      // 1. First upload the image to storage
      let imageID = null;
      if (
        image &&
        image.size > 0 &&
        image.type.startsWith("image/") &&
        image.size < 1024 * 1024 * 5
      ) {
        const response = await storage.createFile(bucketId, ID.unique(), image);
        imageID = response.$id;
      }
      // 2. Create the testimony document
      const payload = {
        name: formData.name,
        experience: formData.experience,
        image: imageID,
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
      <header className="bg-gradient-to-r from-[#2f060f] to-transparent bg-black text-white relative">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <a href="/" className="absolute top-1 left-4 md:top-4 md:left-8 z-10">
            <Image
              src="/logo3.png"
              alt="60th Anniversary Logo"
              width={800}
              height={800}
              className="size-24 md:size-32"
              priority
              quality={95}
            />
          </a>

          {/* Add navigation buttons */}
          <div className="absolute top-6 right-4 md:top-8 md:right-8 z-10 flex gap-4 ">
            <a href="/view-testimonies">
              <button className="px-4 py-2 bg-[#F6B32B] hover:bg-[#b4831f] text-black rounded-full transition-colors duration-300 font-medium border border-[#F6B32B]">
                View Testimonies
              </button>
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[400px] md:min-h-[800px]">
          {/* Text and Spinning Logo Section */}
          <div className="flex-1 p-4 mt-20 lg:mt-0 md:p-8 lg:p-16 flex flex-col justify-center relative">
            <h1 className="text-3xl md:text-4xl lg:text-[60px] 2xl:text-[70px] font-merchant leading-tight md:leading-[1.2] z-10 text-center lg:text-left max-w-[800px] text-balance">
              Fill the air with <br className="hidden md:block" />
              your Testimonies
            </h1>
            <Image
              src="/Group_6.svg"
              alt="circle text"
              width={200}
              height={200}
              className="absolute hidden lg:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]"
              quality={90}
              style={spinningStyle}
            />
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 h-[400px] md:h-[600px] lg:h-auto relative">
            <Image
              src="/testimony_img.png"
              alt="testimony"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              quality={90}
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-b from-[#ffe7e7] to-rgba(248, 239, 222, 0.5) py-20">
        {/* Decorative Images - Added -z-10 to put them behind */}
        <Image
          src="/lily.svg"
          alt="Left Lily"
          className="absolute top-0 left-0 w-[100px] md:w-[300px] z-auto"
          width={300}
          height={300}
        />
        <Image
          src="/lily-right.svg"
          alt="Right Lily"
          className="absolute top-0 right-0 w-[100px] md:w-[300px] z-auto "
          width={300}
          height={300}
        />

        <div className="container mx-auto px-4 max-w-6xl relative">
          <h3 className="font-neue-montreal text-2xl md:text-4xl lg:text-5xl mb-12 md:mb-20 text-black text-center max-w-[789px] mx-auto uppercase text-balance">
            Share an experience, testimony, manner of life or message snippet of
            how mummy has blessed you
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 md:space-y-14 text-black"
          >
            {/* Name Input - Changed label color to black */}
            <div className="flex flex-col items-center space-y-2">
              <label
                htmlFor="name"
                className="text-xl md:text-2xl font-everett font-medium text-center"
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
                className="w-full max-w-[448px] h-[55px] border border-[#dadada] rounded-lg px-5"
              />
            </div>

            {/* Image Upload - Changed label color to black */}
            <div className="flex flex-col items-center space-y-2">
              <label
                htmlFor="image"
                className="text-xl md:text-2xl font-everett font-medium text-center"
              >
                Upload an image
              </label>

              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                name="image"
                required
                className="w-full max-w-[448px] h-[55px] border border-[#dadada] rounded-lg px-5"
              />
              <p className="text-sm text-gray-500">Maximum file size is 5MB</p>
            </div>

            {/* Experience Textarea */}
            <div className="flex flex-col items-center space-y-2">
              <label
                htmlFor="experience"
                className="text-xl md:text-2xl font-everett font-medium text-center"
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
                className="w-full max-w-[776px] h-[250px] bg-white border border-[#dadada] rounded-lg p-5 text-base"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#ffed8f] px-8 md:px-10 py-4 md:py-5 rounded-[20px] text-xl md:text-2xl font-bold disabled:bg-[#fff8d0] disabled:text-[#dedab4] font-neue-montreal transition-colors hover:bg-[#ffe55c]"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

          {/* Thank You Section */}
          <div className="mt-20 text-center">
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mx-auto mb-12">
              <Image
                src="/testimony_img.png"
                alt="testimony"
                fill
                className="rounded-full object-cover object-top border-[10px] border-[#FEE5E5] mt"
              />
            </div>

            <h3 className="text-black text-3xl md:text-4xl font-bold text-center uppercase mt-12 font-merchant text-balance">
              Thank you for joining <br />
              in our celebration!
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed font-medium max-w-[521px] mx-auto text-center mt-8 font-neue-montreal text-balance text-black">
              Your download should start soon, don't forget to share your DP
              everywhere & also please take out time to pray for Rev Helen
              Oyegoke.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-black py-8 md:py-14 border-dashed">
        <p className="text-black text-xl md:text-2xl text-center font-neue-montreal">
          Built by{" "}
          <Link
            href="https://www.egfm.org/"
            className="text-black font-medium underline hover:text-gray-700 transition-colors"
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
