import Client from "@/app/client";
import axios from "axios";

const Home = async () => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5173';
  const response = await axios.get(`${baseURL}/api/tabelogSearch?area=横浜&keyword=たこ焼き`);
  const data = response.data;
  return (
    <Client data={data} />
  );
}
export default Home;