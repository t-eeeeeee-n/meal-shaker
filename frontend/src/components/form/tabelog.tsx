import {SearchTabelog} from "@/app/actions";

const Tabelog = () => {
    return (

        <form action={SearchTabelog}>
            <div
                className={"flex items-center justify-center w-1/2 mx-auto mb-5 text-2xl border-b-4 border-blue-500"}>
                <span>食べログ</span>
            </div>
            <div className="mb-4 flex items-center justify-center">
                <label className="block text-gray-700 text-sm font-bold w-1/4" htmlFor="area">エリア</label>
                <input id="area" name="area" type="text"
                       className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-6 flex items-center justify-center">
                <label className="block text-gray-700 text-sm font-bold w-1/4"
                       htmlFor="keyword">キーワード</label>
                <input id="keyword" name="keyword" type="text"
                       className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className={"flex items-center justify-center"}>
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Meal Search
                </button>
            </div>
        </form>
    )
}

export default Tabelog;