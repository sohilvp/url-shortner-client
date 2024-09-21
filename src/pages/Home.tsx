import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ShortUrl } from "../typescript/user.types";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { generateShortUrl } from "../redux/urlSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Home = () => {
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const { shortUrl, qrCodeUrl } = useSelector(
    (state: RootState) => state.url.singleUrl
  );
  const { _id } = useSelector((state: RootState) => state.user.user);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setError(null);
    try {
      const response: AxiosResponse<ShortUrl> = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createUrl`,
        {
          id: _id !== "" ? _id : "",
          longUrl: url,
        }
      );

      dispatch(generateShortUrl(response.data));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <div className="w-full min-h-[calc(70vh-4rem)]">
      <h1 className="text-3xl xs:text-5xl md:text-6xl m-auto w-[98%] xs:w-[90%] mt-20 font-bold text-center md:mt-[6rem] text-indigo-500 sm:w-[90%] md:w-[80%] lg:w-[60%] md:m-auto xl:mt-[8rem]">
        Simplify Your Links: Shorten, Share, and Track with Ease
      </h1>

      <form
        onSubmit={handleSubmit}
        className="relative flex w-[300px] xs:w-[400px] md:w-[500px] mt-[5rem] m-auto rounded border-l-2 border-t-2 border-b-2 border-indigo-500"
        data-twe-input-wrapper-init
        data-twe-input-group-ref
      >
        <input
          type="search"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent text-black px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          id="exampleFormControlInput"
          required
        />
        <button
          className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-indigo-900 px-5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          type="submit"
          id="button-addon1"
          data-twe-ripple-init
          data-twe-ripple-color="light"
        >
          <span className="[&>svg]:h-5 [&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {shortUrl && (
        <div className="w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] border-2 border-gray-800 m-auto mt-[5rem] p-2 rounded flex flex-col">
          <div className="w-100 flex flex-col align-center justify-center">
            <p className="text-center">
              {`${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`}{" "}
            </p>
            <Link
              to={`${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`}
              target="_blank"
              className="bg-gray-800 py-1 px-4 flex justify-center items-center text-white rounded w-[100px] mx-auto mt-[10px]"
            >
              Open
            </Link>
          </div>
          <div className="w-100 flex flex-col align-center justify-center">
            <img
              className="w-[200px] h-[200px] object-cover m-auto"
              src={qrCodeUrl}
              alt="Google Logo"
            />
            <button
              type="button"
              onClick={handleDownload}
              className="bg-gray-800 py-1 px-4 text-white rounded"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
