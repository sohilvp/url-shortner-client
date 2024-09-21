import { useDispatch } from "react-redux";
import SingleUrls from "../components/SingleUrls";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { getAllUrl } from "../redux/urlSlice";
import { axiosPrivate } from "../axios/axios";

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const allUrl = useSelector((state: RootState) => state.url.allUrl);

  useEffect(() => {
    const getallurl = async () => {
      const response = await axiosPrivate.get(
        `${import.meta.env.VITE_BACKEND_URL}/shortUrls/${user._id}`,
        { withCredentials: true }
      );

      dispatch(getAllUrl(response.data));
    };
    getallurl();
  }, []);

  return (
    <div className="w-full min-h-[calc(80vh-4rem)] ">
      <div className="text-3xl text-center mt-6">Dashboard</div>
      <div className="w-full md:px-24 md:mt-10 ">
        {allUrl.map((singleUrls, index) => (
          <SingleUrls key={singleUrls._id || index} singleUrls={singleUrls} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
