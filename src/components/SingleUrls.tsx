import { IUrl } from "../redux/urlSlice";

const SingleUrls = ({ singleUrls }: { singleUrls: IUrl }) => {
  return (
    <div className="w-full bg-gray-300 p-2 flex justify-evenly items-center rounded-lg my-2">
      <h4 className="flex-[3] pl-5">
        {singleUrls.longUrl.length > 30
          ? singleUrls.longUrl.substring(0, 40) + "..."
          : singleUrls.longUrl}
      </h4>
      <h3 className="flex-[2]">{`${import.meta.env.VITE_BACKEND_URL}/${
        singleUrls.shortUrl
      }`}</h3>
      <p className="flex-[1]">
        {singleUrls.clicks}
        <span> Clicks</span>
      </p>
      <p className="flex-[1] ">
        <img
          src={singleUrls.qrCodeUrl}
          className="w-24 h-24 object-cover"
          alt=""
        />
      </p>
    </div>
  );
};

export default SingleUrls;
