import {NextPage} from "next";
import {GetGenres, GetLargeServiceArea} from "@/app/actions";
import Client from "@/app/client";

const Home: NextPage = async () => {

    const largeServiceAreas = await GetLargeServiceArea();
    const genres = await GetGenres();

    return (
        <div className={"md:container md:mt-20 mt-0 mx-auto px-4 py-8 md:w-1/2 w-full bg-amber-50 rounded shadow"}>
            <div>
                <Client largeServiceAreas={largeServiceAreas} genres={genres}/>
            </div>
        </div>
    )
}
export default Home;