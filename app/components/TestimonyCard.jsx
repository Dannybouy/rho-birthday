import { storage } from "../appwrite/config";
import { formatTimeAgo } from "../utils";

const TestimonyCard = ({ testimony }) => {
  const { image, name, experience, createdAt } = testimony;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID;

  const imageUrl = storage.getFilePreview(bucketId, image, 100, 100);

  return (
    <div className="bg-white rounded-3xl p-8 w-full min-h-[200px] max-w-[600px]">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <img
            src={imageUrl}
            alt={name}
            className="rounded-full size-8 object-cover"
          />

          <h3 className="text-xl font-neue-montreal text-[#171717]">{name}</h3>
        </div>
        <span className="text-gray-500 text-sm">
          {formatTimeAgo(createdAt)}
        </span>
      </div>
      <p className="text-base font-neue-montreal-regular text-[#171717]">
        {experience}
      </p>
    </div>
  );
};

export default TestimonyCard;
