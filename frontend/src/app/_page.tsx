import Client from "@/app/client";
import axios from "axios";
import {NextPage} from "next";

const Home: NextPage = async () => {
  const baseURL = process.env.FRONTEND_PUBLIC_API_BASE_URL;
  const response = await axios.get(`${baseURL}/tabelog/search?area=赤坂&keyword=イタリアン`);
  const data = response.data;
  return (
      <Client data={data} />
  );
}

export default Home;