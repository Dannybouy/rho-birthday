import { storage } from "../appwrite/config";

const TestimonyCard = ({ testimony }) => {
  const { image, name, experience } = testimony;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

  const imageUrl = storage.getFilePreview(
    bucketId,
    image,
    100,
    100,
  );

  return (
    <div className="bg-white rounded-3xl p-8 w-full min-h-[200px]">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="rounded-full size-8 object-cover"
        />

        <h3 className="text-xl font-neue-montreal text-[#171717]">{name}</h3>
      </div>
      <p className="text-base font-neue-montreal-regular text-[#171717]">
        {experience}
      </p>
    </div>
  );
};

export default TestimonyCard;
