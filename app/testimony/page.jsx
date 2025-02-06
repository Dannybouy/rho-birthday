import Image from "next/image";
import Link from "next/link";
import React from "react";
import CircleText from "../components/circle-text";

const Testimony = () => {
  const spinningStyle = {
    animation: "spin 10s linear infinite",
  };
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-gradient-to-r from-[#2f060f] to-transparent bg-black text-white flex w-full h-[600px] relative">
        <h1 className="font-bold text-[80px] leading-[100px] italic uppercase pl-[70px] flex items-center font-merchant tracking-normal flex-grow">
          Fill the air with <br />
          your Testimonies
        </h1>
        <Image
          src="/Group_6.svg"
          alt="circle text"
          width={300}
          height={300}
          className="absolute top-[20%] left-[40%]"
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

          <form className="flex flex-col items-center justify-center text-black ">
            <div className="flex flex-col items-center justify-center space-y-2">
              <label
                htmlFor="name"
                className="text-2xl font-everett font-medium text-center"
              >
                Tell us your name
              </label>
              <input
                type="text"
                maxLength={25}
                placeholder="Max. limit is 25 characters"
                className="w-[448px] h-[55px] border border-[#dadada] rounded-lg px-5"
              />
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 mt-14">
              <label
                htmlFor="message"
                className="text-2xl font-everett font-medium text-center"
              >
                Share your experience here
              </label>
              <textarea
                maxLength={555}
                placeholder="Max. limit is 555 characters"
                className="w-[776px] h-[586px] bg-white border border-[#dadada] rounded-lg my-8 p-5 text-base"
              />
            </div>

            <button
              type="submit"
              className="bg-[#ffed8f] px-10 py-5 flex justify-center items-center mt-14 rounded-[20px] text-2xl font-bold disabled:bg-[#fff8d0] disabled:text-[#dedab4] font-neue-montreal"
            >
              Submit
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
