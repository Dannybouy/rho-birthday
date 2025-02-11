import Image from "next/image";
import Link from "next/link";
import CircleTextLogo from "../components/circletextlogo";
import LoadMoreTestimonies from "../components/loadMoreTestimonies";

const ViewTestimonies = () => {

  return (
    <main className="min-h-screen">
      <header className="flex flex-col items-center justify-center mt-44">
        <div className="absolute top-4 md:top-8 left-4 md:left-8 z-10">
          <a href="/">
            <Image
              src="/logo3.png"  
              alt="60th Anniversary Logo"
              width={300}
              height={300}
              className="size-24 md:size-32"
              priority
              quality={95}
            />
          </a>
        </div>
        <div className="px-4 text-center mx-auto">
          <p className="font-merchant text-4xl md:text-6xl lg:text-[5.5rem] mb-5 text-[#fff5e1] text-balance max-w-screen-xl">
            Read Testimonies about Mummy Helen
          </p>

          <p className="font-medium font-neue-montreal text-lg md:text-xl lg:text-3xl mb-8 leading-8 text-balance max-w-screen-xl mx-auto">
            Mummy has been a blessing to us in many ways, we believe only the
            Lord can work this! Tell us, how have you been blessed by mummy
          </p>
        </div>
      </header>
      <div className="relative px-4 md:px-8 lg:px-12 mb-10">
        <div className="fixed top-2/3 transform -translate-y-[50%]  -z-10">
          <CircleTextLogo />
        </div>
        <div className="flex flex-col items-center justify-center">
          <LoadMoreTestimonies />
        </div>
      </div>
    </main>
  );
};

export default ViewTestimonies;
