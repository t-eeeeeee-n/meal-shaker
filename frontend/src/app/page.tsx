import {NextPage} from "next";
import {search} from "@/app/actions";

const Home: NextPage = () => {

    return (
        <div className={"container mt-20 mx-auto px-4 py-8 w-1/3 bg-blue-50 rounded shadow"}>
            <form action={search}>
                <div className="mb-4 flex items-center justify-center">
                    <label className="block text-gray-700 text-sm font-bold w-1/4" htmlFor="area">Area</label>
                    <input id="area" name="area" type="text"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-6 flex items-center justify-center">
                    <label className="block text-gray-700 text-sm font-bold w-1/4" htmlFor="keyword">keyword</label>
                    <input id="keyword" name="keyword" type="text"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className={"flex items-center justify-center"}>
                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Meal Search
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Home;